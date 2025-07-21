export type Paginated<T> = {
    data: T[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export function getOffset(page: number, limit: number) {
    return (page - 1) * limit;
}

export function getTotalPages(total: number, limit: number) {
    return Math.ceil(total / limit);
}