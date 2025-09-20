"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_KEY;

export async function serverFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const access_token = (await cookies()).get('access_token')?.value;
    let res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`, 
            ...(options.headers || {}),
        },
    });

    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return res.json(); 
}