import booksParser from "../src/books-parser.js";

describe('booksParser (Uitgelicht)', () => {

    let books;

    beforeAll(async () => {
        const config = {
            title: 'Uitgelicht',
            url: 'https://www.onlinebibliotheek.nl/e-books/nieuw-in-de-collectie.html', 
            selector: '.biebcomponent li a'
        }
        books = await booksParser(config.url, config.selector);
    });

    it('should be able to retrieve books', () => {
        expect(books.length).toBeGreaterThan(0);
    });

    it('should return books with title', () => {
        books.forEach((book) => {
            expect(book.title).toBeTruthy();
        });
    });
    
    it('should return books with authors', () => {
        books.forEach((book) => {
            expect(book.authors).toBeTruthy();
        });
    });

    it('should return books with description', () => {
        books.forEach((book) => {
            expect(book.description).toBeTruthy();
        });
    });

    it('should return books with image url', () => {
        books.forEach((book) => {
            expect(book.image).toBeTruthy();
        });
    });

    it('should return books with url', () => {
        books.forEach((book) => {
            expect(book.url).toBeTruthy();
        });
    });

})