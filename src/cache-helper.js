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