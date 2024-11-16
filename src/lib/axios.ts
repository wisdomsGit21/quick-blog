import axios from "axios";
import {
  PostsResponse,
  CategoriesResponse,
  Post,
  Category,
} from "../types/api";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const api = {
  getPosts: () => axiosInstance.get<PostsResponse>("/posts"),
  getLatestPosts: (limit: number) =>
    axiosInstance.get<PostsResponse>(`/posts?limit=${limit}`),
  getPost: (id: number) => axiosInstance.get<Post>(`/posts/${id}`),
  getCategories: () => axiosInstance.get<CategoriesResponse>("/categories"),
  getCategory: (id: number) => axiosInstance.get<Category>(`/categories/${id}`),
};

export default axiosInstance;
