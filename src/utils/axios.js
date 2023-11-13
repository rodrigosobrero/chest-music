import axios from 'axios';

const api = axios.create({
  baseURL: 'https://chest-api-stg.cexar.io/web/v1/',
});

const upload = axios.create({
  baseURL: 'https://upload.chestmusic.com/'
});

export { api, upload }