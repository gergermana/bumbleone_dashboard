export const ENTRY_TYPES = {
    TV: "TV",
    MOVIE: "MOVIE",
    OVA: "OVA",
    SPECIAL: "SPECIAL",
    SEQUEL: "SEQUEL",
} as const;
export const ENTRY_STATUS = {
    UPCOMING: "UPCOMING",
    ONGOING: "ONGOING",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
    HIATUS: "HIATUS",
} as const;

export const ENTRY_TYPES_LABELS = {
    TV: "TV",
    MOVIE: "Movie",
    OVA: "Ova",
    SPECIAL: "Special",
    SEQUEL: "Sequel",
} as const;
export const ENTRY_STATUS_LABELS = {
    UPCOMING: "Upcoming",
    ONGOING: "Ongoing",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
    HIATUS: "Hiatus",
} as const;

export const DEFAULT_ENTRY_PARAMS = {
    page: "1",
    limit: "20", 
    search: "",
    sorting: "LATEST",
    animeType: "ALL",
    animeStatus: "ALL",
} as const;

export const ENTRY_TYPES_COLOR = {
    TV: "text-indigo-500",
    MOVIE: "text-red-500",
    OVA: "text-purple-500",
    SPECIAL: "text-yellow-500",
    SEQUEL: "text-green-500",
} as const;

export const ENTRY_STATUS_COLOR = {
    UPCOMING: "bg-blue-500",
    ONGOING: "bg-green-500",
    COMPLETED: "bg-muted-foreground",
    CANCELLED: "bg-red-500",
    HIATUS: "bg-yellow-500",
} as const;