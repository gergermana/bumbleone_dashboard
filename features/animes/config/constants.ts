export const ANIME_TYPES = {
    TV: "TV",
    MOVIE: "MOVIE",
    OVA: "OVA",
    SPECIAL: "SPECIAL",
    SEQUEL: "SEQUEL",
} as const;
export const ANIME_STATUS = {
    UPCOMING: "UPCOMING",
    ONGOING: "ONGOING",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
    HIATUS: "HIATUS",
} as const;

export const ANIME_TYPES_LABELS = {
    TV: "TV",
    MOVIE: "Movie",
    OVA: "Ova",
    SPECIAL: "Special",
    SEQUEL: "Sequel",
} as const;
export const ANIME_STATUS_LABELS = {
    UPCOMING: "Upcoming",
    ONGOING: "Ongoing",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
    HIATUS: "Hiatus",
} as const;

export const DEFAULT_ANIME_PARAMS = {
    page: "1",
    limit: "20", 
    search: "",
    sorting: "LATEST",
    animeType: "ALL",
    animeStatus: "ALL",
} as const;

// export const animeTypeLabel = {
//     MOVIE: "Movie",
//     TV: "TV",
//     OVA: "Ova",
//     SPECIAL: "Special",
//     SEQUEL: "Sequel",
// } as const;

// export const animeStatusLabel = {
//     UPCOMING: "Upcoming",
//     ONGOING: "Ongoing",
//     COMPLETED: "Completed",
//     CANCELLED: "Cancelled",
//     HIATUS: "Hiatus",
// } as const;