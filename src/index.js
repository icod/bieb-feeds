import biebFeed from "./bieb-feed.js";
import fs from "node:fs";

const feeds = [{
    title: 'Uitgelicht',
    url: 'https://www.onlinebibliotheek.nl/e-books/nieuw-in-de-collectie.html', 
    selector: '.biebcomponent li a',
    filename: 'uitgelicht',
},
{
    title: 'Alle nieuwe e-books',
    url: 'https://www.onlinebibliotheek.nl/e-books/nieuw-in-de-collectie.html', 
    selector: '.gridoverview .grid-list li a',
    filename: 'nieuw',
}];

for await (const config of feeds) {
    const startTime = new Date();
    const feed = await biebFeed(config);

    const path = './public/feeds';
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, {recursive: true});
    }
    const fileName = `${path}/${config.filename}.xml`;
    writeToFile(fileName, feed);

    // @ts-ignore
    const duration = (new Date() - startTime) / 1000;
    console.log(`Generated feed '${config.title}' in ${duration}s`);
}

console.log('DONE');

function writeToFile(filename, content) {
    fs.writeFileSync(filename, content, { flag: 'w+' });
}