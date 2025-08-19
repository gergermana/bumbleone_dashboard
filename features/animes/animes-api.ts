import { api } from "@/lib/api";

export async function getAnimes(page: number = 1, limit: number = 10, search: string = "", sorting: string = "LATEST", animeType: string = "ALL", animeStatus: string = "ALL") {
    const res = await api.get("/animes", {
        params: { page, limit, search, sorting, animeType, animeStatus },
    });
    return res.data;
} 

export async function getAllGenres() {
    const res = await api.get("/genres/all");
    return res.data;
}

export async function getAllStudios() {
    const res = await api.get("/studios/all");
    return res.data;
}