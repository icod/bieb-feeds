import { Feed } from "feed";

export default function(books, options) {
    const feed = new Feed({
        title: options.title,
        id: options.url,
        link: options.url,
        feed: `https://bieb-feeds.statichost.eu/feeds/${options.filename}.atom`,
        copyright: 'Koninklijke Bibliotheek',
        language: 'nl-NL',
        generator: 'https://github.com/icod/bieb-feeds'
    });

    books.forEach(book => {

        const content = `<img src="${book.image}" alt="Omslag van ${book.title}">\n<p>${book.description}</p>`;
        
        const item = {
            title: book.title,
            author: splitToAuthors(book.authors),
            link: book.url,
            guid: book.url,
            image: book.image,
            content: content,
            date: new Date(),
        };

        feed.addItem(item);
    });

    return feed;
}

const splitToAuthors = function (authorsString) {
    return authorsString?.split(/[|,;]+/).map(a => a.trim()).map(author => {
        return {name: author}
    });
}