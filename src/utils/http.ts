import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://picsum.photos/v2',
});
