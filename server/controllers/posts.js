import Post from "../models/posts.js";

export const getPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
    console.log("Hata getPost hatası");
  }
};
export const createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};
