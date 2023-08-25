import axios from 'axios';

const request = axios.create({ baseURL: process.env.WEB_APP_URL });

export default request;
