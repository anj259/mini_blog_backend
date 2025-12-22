const express = require('express');
const router = express.Router();
const authenticatejwtToken = require("../middleware/authMiddleware");;
const uploadpostimage = require("../utils/image_uploads");
const {createPost,getAllPosts,getPostById,updatePost,deletePost}= require("../controllers/post_controller");

router.get('/',getAllPosts);               // route for get list of all post
router.get('/:id',getPostById);            // route for get a post by id

router.post('/',authenticatejwtToken,uploadpostimage,createPost);            // route for create a post
router.put('/:id',authenticatejwtToken,uploadpostimage,updatePost);          // route for update a post
router.delete('/:id',authenticatejwtToken,deletePost);                       // route for delete a post


module.exports = router;
