import fs from "node:fs";
import path from "node:path";
import { hash, writeToFile } from "./cache-helper.js";

export default class BooksCache {

    constructor(file) {
        const cacheFile = path.resolve(file);
        this.cacheFile = cacheFile;
        const cacheFromDisk = fs.readFileSync(cacheFile, 'utf-8');
        const json = JSON.parse(cacheFromDisk);
        this.cache = json.values;
    }

    /**
     * Finds a book by its URL, if it is present in the cache.
     * 
     * @param {string} url The URL of the book, its identifier.
     * @returns The book object, if present in the cache.
     */
    find = (url) => {
        const key = hash(url);
        return this.cache[key];
    }

    put = (book) => {
        const key = hash(book.url);
        this.cache[key] = book;
        return this.cache[key];
    }

    writeOut = () => {
        writeToFile(this.cacheFile, this.cache);
    }
}