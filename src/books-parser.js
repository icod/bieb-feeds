import { parse } from "node-html-parser";

export default async function(url, selector) {
    const root = await parseUrl(url); 

    const bookLinks = root.querySelectorAll(selector);

    const books = [];

    for await (const bookLink of bookLinks) {
        const url = bookLink.getAttribute('href');
        const book = await getBookInfoFromPage(url);
        books.push(book);
    };

    return books;
}

const parseUrl = async function(url) {
    const pageContent = await (await fetch(url)).text();
    const root = parse(pageContent);
    return root;
}

const getBookInfoFromPage = async function(url) {
    const root = await parseUrl(url);
    
    return {
        url: url,
        title: root.querySelector('span.title')?.textContent?.trim(),
        authors: root.querySelector('span.creator')?.textContent?.trim(),
        description: root.querySelector('meta[name="description"]')?.getAttribute('content')?.replaceAll('   ', '\n'),
        image: root.querySelector('.imgwrapper img')?.getAttribute('src')
    }
}