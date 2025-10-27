import axios from 'axios';

export const axiosGutendexAPI = axios.create({
  baseURL: 'https://gutendex.com',
});
