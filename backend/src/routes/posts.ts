import { createPost, deletePost, getPosts, updatePost } from "../controllers/posts";

import express from "express";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.patch("/:id", updatePost);

export default router;
