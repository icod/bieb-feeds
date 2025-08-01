import { biebFeed } from "./bieb-feed.js";

const feed = await biebFeed({
    url: 'https://www.onlinebibliotheek.nl/e-books/nieuw-in-de-collectie.html'
});

console.log(feed);