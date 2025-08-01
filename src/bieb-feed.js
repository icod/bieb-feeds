import { parse } from "node-html-parser";

export const biebFeed = async function (options) {
    const pageContent = await (await fetch(options.url)).text();

    const root = parse(pageContent); 

    const bookLinks = root.querySelectorAll('.biebcomponent li a');

    bookLinks.forEach((booklink) => {
        console.log(booklink.getAttribute('href'));
    });

    return 'hoi';

}