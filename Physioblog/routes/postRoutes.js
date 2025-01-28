const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");

router.get("/blog", auth, postController.getPosts);
router.get("/create-post", auth, postController.createPostPage);
router.post("/create-post", auth, postController.createPost);
router.get("/posts/:id", postController.getPostById);
router.post("/posts/:id/delete", auth, postController.deletePost);
router.get('/search', auth, postController.searchPosts);

module.exports = router;
