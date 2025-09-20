import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_KEY;

export const clientApi = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
});