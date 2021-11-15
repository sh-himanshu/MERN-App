import { Request, Response } from "express";

import PostMessage from "../models/postMessage";
import mongoose from "mongoose";
import { parseError } from "../utils";

export const getPosts = async (_: Request, res: Response) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).send(parseError(error));
  }
};

export const createPost = async (req: Request, res: Response) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: parseError(error) });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new Error(`Id: ${_id} is invalid !`);
    }

    const deleted = await PostMessage.findByIdAndDelete(_id);
    deleted
      ? res.status(200).json(deleted)
      : res.status(404).json({ error: `Id: '${_id}' doesn't exist in Database !` });
  } catch (error) {
    res.status(400).json({ error: parseError(error) });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      throw new Error(`Id: '${_id}'' is Invalid !`);
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    updatedPost
      ? res.status(200).json(updatedPost)
      : res.status(404).json({ error: `Id: '${_id}' doesn't exist in Database !` });
  } catch (error) {
    res.status(400).json({ error: parseError(error) });
  }
};
