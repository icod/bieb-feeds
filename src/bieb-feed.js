import booksParser from "./books-parser.js";

export default async function (options) {
    const books = await booksParser(options.url, options.selector);
}
