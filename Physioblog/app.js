require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const auth = require("./middleware/auth");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.set("views", path.join(__dirname, "contents"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose
  .connect("mongodb://localhost:27017/userDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.get("/", (req, res) => res.render("home"));
app.use("/", authRoutes);
app.use("/", postRoutes);
app.use('/posts', postRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
