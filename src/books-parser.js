import { parse } from "node-html-parser";
import BooksCache from "./cache.js";

export default async function(url, selector) {
    const root = await parseUrl(url); 

    const bookLinks = root.querySelectorAll(selector);

    const books = [];

    const cache = new BooksCache('./cache/books.json');

    cache.cleanUp();

    for await (const bookLink of bookLinks) {
        const url = bookLink.getAttribute('href');

        if (url) {
            let book = cache.find(url);
            if (!book) {
                book = await getBookInfoFromPage(url);
                book.dateSeen = new Date();
                cache.put(book);
            }
            books.push(book);
        } else {
            console.error('No URL found for book');
        }

    };

    cache.writeOut();

    return books;
}

const parseUrl = async function(url) {
    const pageContent = await (await fetch(url)).text();
    const root = parse(pageContent, {
        comment: false,
        blockTextElements: {
            script: false,
            noscript: false,
            style: false,
        }
    });
    return root;
}

const getBookInfoFromPage = async function(url) {
    const root = await parseUrl(url);
    
    return {
        url: url,
        title: root.querySelector('span.title')?.textContent?.trim(),
        subtitle: root.querySelector('.subtitle')?.textContent?.trim(),
        authors: root.querySelector('span.creator')?.textContent?.trim(),
        description: root.querySelector('meta[name="description"]')?.getAttribute('content')?.replaceAll('   ', '\n'),
        image: root.querySelector('.imgwrapper img')?.getAttribute('src')
    }
}