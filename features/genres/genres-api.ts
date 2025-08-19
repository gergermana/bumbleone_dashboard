import { api } from "@/lib/api";

export async function getGenres(page: number = 1, limit: number = 10, search: string = "", sorting: string = "LATEST") {
    const res = await api.get("/genres", {
        params: { page, limit, search, sorting },
    });
    return res.data;
} 