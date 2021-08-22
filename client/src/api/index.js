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
export const deletePost = (post) => API.delete(`/posts/${post}`);
export const updatePost = (id, post) => API.patch(`/posts/${id}`, post);
export const likePost = (id) => API.patch(`/posts/${id}/like`);
export const reportPost = (id, reason) =>
  API.post(`/posts/${id}/report`, reason);

export const login = (userData) => API.post("/auth/login", userData);
export const signup = (userData) => API.post("/auth/signup", userData);
export const reset = (email) => API.post("/auth/reset", email);
export const changepw = (userId, token, pw) =>
  API.post(`/auth/reset/${userId}/${token}`, pw);

export const changeEmail = (id, email) =>
  API.patch(`/settings/change-email/${id}`, email);
export const changeName = (id, name) =>
  API.patch(`/settings/change-name/${id}`, name);
export const changePassword = (id, password) =>
  API.patch(`/settings/change-password/${id}`, password);
