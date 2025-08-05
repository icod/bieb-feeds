import { Feed } from "feed";

export default function(books, options) {
    const feed = new Feed({
        title: options.title,
        id: options.url,
        link: options.url,
        copyright: 'Koninklijke Bibliotheek',
        language: 'nl-NL',
        generator: 'https://github.com/icod/bieb-feeds'
    });

    books.forEach(book => {
        const item = {
            title: book.title,
            author: book.authors,
            link: book.url,
            guid: book.url,
            image: book.image,
            content: book.description,
            date: new Date(),
        };

        feed.addItem(item);
    });

    return feed;
}