const Post=require("../models/post_model")
const User=require("../models/user_model")

// method for create post
const createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const post = await Post.create({
      title,
      content,
      image: req.file ? req.file.filename : "",
      author: req.user.id,
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// method for get list of all posts with auther name and email
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "user_name email");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// method for get post by id with auther name and email
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "user_name email");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// method for update post
const updatePost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ message: "Post not found" });

    // check if post owner can only update their posts 
    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: "You can update only your post" });

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: title || post.title,
          content: content || post.content,
          image: req.file ? req.file.filename : post.image,
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // check if post owner can only update their posts 
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can delete only your post" });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports ={createPost,getAllPosts,getPostById,updatePost,deletePost};
