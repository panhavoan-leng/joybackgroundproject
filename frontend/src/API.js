import axios from "axios";
require("dotenv").config();

export const LOGIN_USER_KEY = "HIVE_TECHWEAR_LOGIN_USER_KEY";
const {
  REACT_APP_ENVIRONMENT,
  REACT_APP_API_BASE_URL_PROD,
  REACT_APP_API_BASE_URL_DEV,
} = process.env;
let baseURL;

if (REACT_APP_ENVIRONMENT === "PRODUCTION") {
  baseURL = REACT_APP_API_BASE_URL_PROD;
} else {
  baseURL = REACT_APP_API_BASE_URL_DEV;
}

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default class API {
  getPosts = async () => {
    const posts = await api
      .get("/posts/")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return posts;
  };
  addPost = async (name, body, image) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("body", body);
    formData.append("image", image);
    const savedPost = await api
      .post("/posts/add/", formData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return savedPost;
  };
  deletePost = async (id) => {
    const response = await api
      .delete("/posts/delete/" + id + "/")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return response;
  };
}
