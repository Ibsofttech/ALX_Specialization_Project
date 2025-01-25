require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path');
const saltRounds = 10;

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static("public"));
app.set("views", path.join(__dirname, "contents"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Database Connection
const connectionString = 'mongodb://localhost:27017/userDB';
mongoose.connect(connectionString)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Models
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = new mongoose.model("User", userSchema);

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

// Middleware to verify JWT token
const auth = (req, res, next) => {
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send("Unauthorized");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).send("Unauthorized");
    }
};

// Routes
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get('/create-post', auth, (req, res) => {
    res.render('create-post');
});

app.post("/register", (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            console.error("Error hashing password:", err);
            return res.redirect("/register");
        }

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });

        newUser.save()
            .then(() => {
                res.redirect("/login");
            })
            .catch(err => {
                console.error("Error during registration:", err);
                res.redirect("/register");
            });
    });
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then((foundUser) => {
            if (!foundUser) {
                return res.send("User not found.");
            }

            bcrypt.compare(password, foundUser.password, (err, result) => {
                if (err || !result) {
                    return res.send("Incorrect password.");
                }

                // Generate JWT token using JWT_SECRET from .env
                const token = jwt.sign({ id: foundUser._id, email: foundUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

                // Set the token in a cookie
                res.cookie('token', token, { httpOnly: true });

                res.redirect("/blog");
            });
        })
        .catch((err) => {
            console.error("Error finding user:", err);
            res.send("An error occurred during login.");
        });
});

app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

app.get('/blog', auth, (req, res) => {
    Post.find()
        .populate('author', 'username')
        .then((posts) => {
            res.render('blog', { posts, user: req.user }); 
        })
        .catch((err) => {
            console.error("Error fetching posts:", err);
            res.status(500).json({ message: "Error fetching posts", error: err });
        });
});

// Route to handle search
app.get('/search', auth, (req, res) => {
    const query = req.query.query;

    Post.find({ title: { $regex: query, $options: 'i' } })
        .populate('author', 'username')
        .then((posts) => {
            res.render('blog', { posts, user: req.user });
        })
        .catch((err) => {
            console.error("Error searching posts:", err);
            res.status(500).json({ message: "Error searching posts", error: err });
        });
});

app.post('/create-post', auth, (req, res) => {
    const { title, content } = req.body;
    const author = req.user.id; // req.user is set by the auth middleware

    const newPost = new Post({ title, content, author });

    newPost.save()
        .then(() => {
            res.redirect('/blog');
        })
        .catch((err) => {
            console.error("Error creating post:", err);
            res.status(500).json({ message: "Error creating post", error: err });
        });
});

// Route for full post page
app.get('/posts/:id', (req, res) => {
    const postId = req.params.id;

    Post.findById(postId)
        .populate('author', 'username')
        .then((post) => {
            if (!post) {
                return res.status(404).send("Post not found");
            }
            res.render('post', { post });
        })
        .catch((err) => {
            console.error("Error fetching post:", err);
            res.status(500).json({ message: "Error fetching post", error: err });
        });
});

// Route to delete a post
app.post('/posts/:id/delete', auth, (req, res) => {
    const postId = req.params.id;

    Post.findById(postId)
        .then((post) => {
            if (!post) {
                return res.status(404).send("Post not found");
            }

            if (post.author.toString() !== req.user.id) {
                return res.status(403).send("You are not authorized to delete this post");
            }

            // Delete the post
            Post.findByIdAndDelete(postId)
                .then(() => {
                    res.redirect('/blog');
                })
                .catch((err) => {
                    console.error("Error deleting post:", err);
                    res.status(500).json({ message: "Error deleting post", error: err });
                });
        })
        .catch((err) => {
            console.error("Error finding post:", err);
            res.status(500).json({ message: "Error finding post", error: err });
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});