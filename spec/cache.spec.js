import BooksCache from "../src/cache.js";
import { writeToFile } from "../src/cache-helper.js";
import fs from "node:fs";

describe('cache', () => {

    const testCache = './spec/test-cache.json';

    beforeEach(() => {
        writeToFile(testCache, {});
    });

    afterAll(() => {
        fs.rmSync(testCache);
    });

    it('should return nothing, if book cannot be found by url', () => {
        const cache = new BooksCache(testCache)

        const book = {
            url: 'test',
            // other values omitted, because irrelevant for the test
        }
        cache.put(book);
        expect(cache.find('test2')).toBeUndefined();
    });

    it('should return a cached value', () => {

        const cache = new BooksCache(testCache)

        const book = {
            url: 'new-url',
            // other values omitted, because irrelevant for the test
        }

        expect(cache.find(book.url)).toBeUndefined();
        cache.put(book);
        expect(cache.find(book.url)).toEqual(book);
    });

    it('should read a cache from disk', () => {
       
        const book = {
            url: 'test',
            // other values omitted, because irrelevant for the test
        }
        const values = {'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3': book};

        writeToFile(testCache, values);
        
        const cache = new BooksCache(testCache);

        const result = cache.find(book.url);

        expect(result).toBeDefined();

    });

    it('should write a cache to disk', () => {
       
        const book = {
            url: 'write-to-file',
            // other values omitted, because irrelevant for the test
        }
        
        const cache = new BooksCache(testCache);
        cache.put(book);
        cache.writeOut();


        const cache2 = new BooksCache(testCache);
        const result = cache2.find(book.url);
        expect(result).toBeDefined();

    });


});