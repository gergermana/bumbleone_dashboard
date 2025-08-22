import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_KEY;

export const api = axios.create({
    baseURL: `${apiBaseUrl}`,
    withCredentials: true,
});