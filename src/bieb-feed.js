import booksParser from "./books-parser.js";
import booksFeed from "./books-feed.js";

export default async function (options) {
    const books = await booksParser(options.url, options.selector);
    const feed = booksFeed(books, options);
    const atom = feed.atom1();
    return atom;
}
