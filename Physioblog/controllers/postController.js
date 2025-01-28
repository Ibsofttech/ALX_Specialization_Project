const Post = require("../models/Post");

exports.getPosts = (req, res) => {
  Post.find()
    .populate("author", "username")
    .then((posts) => res.render("blog", { posts, user: req.user }))
    .catch((err) => {
      console.error("Error fetching posts:", err);
      res.status(500).json({ message: "Error fetching posts", error: err });
    });
};

exports.createPostPage = (req, res) => {
  res.render("create-post");
};

exports.createPost = (req, res) => {
  const { title, content } = req.body;
  const author = req.user.id;

  const newPost = new Post({ title, content, author });

  newPost
    .save()
    .then(() => res.redirect("/blog"))
    .catch((err) => {
      console.error("Error creating post:", err);
      res.status(500).json({ message: "Error creating post", error: err });
    });
};

exports.getPostById = (req, res) => {
  const postId = req.params.id;

  Post.findById(postId)
    .populate("author", "username")
    .then((post) => {
      if (!post) {
        return res.status(404).send("Post not found");
      }
      res.render("post", { post });
    })
    .catch((err) => {
      console.error("Error fetching post:", err);
      res.status(500).json({ message: "Error fetching post", error: err });
    });
};

exports.deletePost = (req, res) => {
  const postId = req.params.id;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        return res.status(404).send("Post not found");
      }

      if (post.author.toString() !== req.user.id) {
        return res.status(403).send("You are not authorized to delete this post");
      }

      Post.findByIdAndDelete(postId)
        .then(() => res.redirect("/blog"))
        .catch((err) => {
          console.error("Error deleting post:", err);
          res.status(500).json({ message: "Error deleting post", error: err });
        });
    })
    .catch((err) => {
      console.error("Error finding post:", err);
      res.status(500).json({ message: "Error finding post", error: err });
    });
};


exports.searchPosts = (req, res) => {
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
};
