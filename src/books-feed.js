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
        const description = formatDescription(book.description);
        const altText = `Omslag van '${book.title}'`;

        const content = `<img src="${book.image}" alt="${altText}" title="${altText}">\n${description}`;
        
        const item = {
            title: book.title,
            author: splitToAuthors(book.authors),
            link: book.url,
            guid: book.url,
            content: content,
            date: new Date(),
        };

        feed.addItem(item);
    });

    return feed;
}

const splitToAuthors = (authorsString) => {
    return authorsString?.split(/[|,;]+/).map(a => a.trim()).map(author => {
        return {name: author}
    });
}

const formatDescription = (description) => {
    return description.replaceAll(/Bron: .*$/gi, b => `\n<small>${b}</small>`).split('\n').map(line => `<p>${line}</p>`).join('');
}