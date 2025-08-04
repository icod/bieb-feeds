import { parse } from "node-html-parser";

export default async function (options) {
    const root = await parseUrl(options.url); 

    const bookLinks = root.querySelectorAll(options.selector);

    const books = [];
 
    for await (const booklink of bookLinks) {
        const url = booklink.getAttribute('href');
        console.log(`Getting info for ${url} ...`);
        const book = await getBookInfoFromPage(url);
        books.push(book);
    };

    return books;
}

const getBookInfoFromPage = async function(url) {
    const root = await parseUrl(url);
    
    return {
        url: url,
        title: root.querySelector('span.title')?.textContent?.trim(),
        authors: root.querySelector('span.creator')?.textContent?.trim(),
        description: root.querySelector('meta[name="description"]')?.getAttribute('content'),
        image: root.querySelector('.imgwrapper img')?.getAttribute('src')
    }
}

const parseUrl = async function(url) {
    const pageContent = await (await fetch(url)).text();
    const root = parse(pageContent);
    return root;
}