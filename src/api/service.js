import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api",
});

const errorHandler = (err) => {
  throw err;
};

const getItems = () => {
  return api
    .get("/items")
    .then((res) => res.data)
    .catch(errorHandler);
};

const uploadImage = (file) => {
  return api
    .post("/upload", file)
    .then((res) => res.data)
    .catch(errorHandler);
};

const createItem = (newItem) => {
  return api
    .post("/items", newItem)
    .then((res) => res.data)
    .catch(errorHandler);
};

export default {
  getItems,
  uploadImage,
  createItem
};
