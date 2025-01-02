import express from "express"
import { getPosts, createPost, updatePost, deletePost, upvotePost, addComment, getComments, deleteComment } from "../controllers/post.js"
const router = express.Router()

router.get("/", (req, res) => {
  res.send("Hello world!!!!!!");
})
router.get('/posts', getPosts)
router.post('/posts', createPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);
router.post('/posts/:id/upvote', upvotePost);
router.post('/posts/:id/comments', addComment);
router.get('/posts/:id/comments', getComments);
router.delete('/posts/:postId/comments/:commentId', deleteComment);
export default router;