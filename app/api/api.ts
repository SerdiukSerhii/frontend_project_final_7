import axios from 'axios';

const localApiUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL;
const renderApiUrl = process.env.NEXT_PUBLIC_RENDER_API_URL;

const baseURL =
  process.env.NODE_ENV === 'production'
    ? renderApiUrl
    : localApiUrl;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});