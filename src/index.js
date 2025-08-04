import biebFeed from "./bieb-feed.js";

const feeds = [{
    title: 'Uitgelicht',
    url: 'https://www.onlinebibliotheek.nl/e-books/nieuw-in-de-collectie.html', 
    selector: '.biebcomponent li a'
},
{
    title: 'Alle nieuwe e-books',
    url: 'https://www.onlinebibliotheek.nl/e-books/nieuw-in-de-collectie.html', 
    selector: '.gridoverview .grid-list li a'
}];

for await (const config of feeds) {
    const startTime = new Date();
    const feed = await biebFeed(config);
    // @ts-ignore
    const duration = (new Date() - startTime) / 1000;
    console.log(`Generated feed '${config.title}' in ${duration}s`);
}

console.log('DONE');

