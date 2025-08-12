import fs from 'node:fs';
import { createHash } from "node:crypto";

export function writeToFile(path, values = {}) {
    const json = { values: values };
    try {
        const cacheValues = JSON.stringify(json, null, 2);
        fs.writeFileSync(path, cacheValues);
    } catch (err) {
        console.error(err);
    }
    
}

export function hash(data) {
    if (data === undefined) {
        return undefined;
    }
    return createHash('sha1').update(data).digest('hex');
}

export function differenceInDays(date1, date2) {
    const diff = Math.abs(date1 - date2);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days;
}
