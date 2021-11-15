import axios from "axios";

const url = "http://localhost:8000/posts";

export interface Post {
  creator: string;
  title: string;
  message: string;
  tags: string[];
  selectedFile: string;
}

export interface PostRespose extends Post {
  _id: string;
  __v: number | string;
  createdAt: string;
  linkCount: number;
}

export const fetchPosts = () => axios.get<PostRespose[]>(url);
export const createPost = (newPost: Post) => axios.post<PostRespose>(url, newPost);
export const updatePost = (id: string, updatedPost: Post) =>
  axios.patch<PostRespose>(`${url}/${id}`, updatedPost);
export const deletePost = (id: string) => axios.delete<PostRespose>(`${url}/${id}`);
