export function toQueryString(params: Record<string, any>) {
    const query = new URLSearchParams();
    for (const key in params) {
        if (params[key] !== undefined && params[key] !== null) {
            query.append(key, String(params[key]));
        }
    }
    return query.toString();
}