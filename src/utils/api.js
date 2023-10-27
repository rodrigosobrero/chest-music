import axios from 'axios';

export default axios.create({
  baseURL: 'https://chest-api-stg.cexar.io/web/v1/'
});