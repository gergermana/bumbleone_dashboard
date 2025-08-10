import axios from 'axios';

const apiBaseUrl  = process.env.NEXT_PUBLIC_MOBILE_API_KEY || process.env.NEXT_PUBLIC_API_KEY;

export const api = axios.create({
    baseURL: `${apiBaseUrl}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});