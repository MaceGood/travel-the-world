import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

const user = localStorage.getItem("user");
API.interceptors.request.use(
  function (req) {
    // Do something before request is sent
    if (user) {
      req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
    }
    return req;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const createPost = (newPost) => API.post("/posts", newPost);
export const getPosts = () => API.get("/posts");
export const deletePost = (post) =>
  API.delete(`/posts/${post}`);
export const updatePost = (id, post) => API.patch(`/posts/${id}`, post);
export const login = (userData) => API.post("/auth/login", userData);
export const signup = (userData) => API.post("/auth/signup", userData);
