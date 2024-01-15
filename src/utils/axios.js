import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

const upload = axios.create({
  baseURL: process.env.REACT_APP_UPLOAD_API
});

export { api, upload }