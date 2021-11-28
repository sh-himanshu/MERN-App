import axios from "axios";

const url = "http://localhost:8000/posts";

export interface Post {
  creator: string;
  title: string;
  message: string;
  tags: string[];
  selectedFile: string;
  likeCount: number;
}

export interface PostRespose extends Post {
  _id: string;
  __v: number | string;
  createdAt: string;
}

// https://www.typescriptlang.org/docs/handbook/2/narrowing.html
function isPostRespose(data: PostRespose | Post): data is PostRespose {
  return (data as PostRespose)._id !== undefined;
}

const toPost = (data: PostRespose | Post): Post => {
  if (isPostRespose(data)) {
    const { _id, __v, createdAt, ...post } = data;
    return post;
  }
  return data;
};

export const fetchPosts = () => axios.get<PostRespose[]>(url);
export const createPost = (newPost: Post) => axios.post<PostRespose>(url, newPost);
export const updatePost = (_id: string, post: Post | PostRespose) =>
  axios.patch<PostRespose>(`${url}/${_id}`, toPost(post));
export const deletePost = (id: string) => axios.delete<PostRespose>(`${url}/${id}`);
