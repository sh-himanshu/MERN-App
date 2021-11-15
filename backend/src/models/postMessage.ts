import { Schema, model } from "mongoose";

interface Post {
  creator: string;
  title: string;
  message: string;
  tags: string[];
  selectedFile: string;
  linkCount: {
    type: number;
    default?: number;
  };
  createdAt: {
    type: Date;
    default?: Date;
  };
}

const postSchema = new Schema<Post>({
  creator: String,
  title: String,
  message: String,
  tags: [String],
  selectedFile: String,
  linkCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = model<Post>("PostMessage", postSchema);

export default PostMessage;
