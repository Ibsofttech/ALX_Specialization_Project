const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const saltRounds = 10;

exports.registerUser = (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.redirect("/register");
    }

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    newUser
      .save()
      .then(() => res.redirect("/login"))
      .catch((err) => {
        console.error("Error during registration:", err);
        res.redirect("/register");
      });
  });
};

exports.loginUser = (req, res) => {
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

        const token = jwt.sign(
          { id: foundUser._id, email: foundUser.email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.cookie("token", token, { httpOnly: true });
        res.redirect("/blog");
      });
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.send("An error occurred during login.");
    });
};

exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};
