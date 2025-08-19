import { api } from "@/lib/api";

export async function login(params: any) {
    try {
        const res = await api.post("/auth/login", params);
        return res.data; 
    } catch (err: any) {
        if (err.response) {
            // server responded with a status other than 2xx
            const status = err.response.status;
            const message = err.response.data?.message || "Something went wrong";

            if (status === 401) {
                throw new Error("Invalid username or password");
            } else {
                throw new Error(message);
            }
        } else if (err.request) {
            // no response from server
            throw new Error("No response from server. Please try again.");
        } else {
            // something wrong in setting up the request
            throw new Error("Request error: " + err.message);
        }
    }
}