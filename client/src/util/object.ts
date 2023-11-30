export function removeUndefinedFields(obj: any): void {
    for (const key in obj) {
        if (obj[key] === undefined) {
            delete obj[key];
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            removeUndefinedFields(obj[key]);
        }
    }
}
