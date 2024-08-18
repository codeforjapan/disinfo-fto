export function formatDate(timestamp: number) {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
}