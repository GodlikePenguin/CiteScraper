const https = require('https');
const cheerio = require('cheerio');

if (!process.argv[2]) {
    console.log("No URL given, exiting")
    return 1;
}

console.log(process.argv[2]);

https.get(process.argv[2], (res) => {
    let body = '';
    res.on('data', (d) => {
        body += d;
    });

    res.on('end', () => {
       let $ = cheerio.load(body);
       let names = $('.gs_a a').toArray();
       names.forEach((name) => {
           if (name.name === 'a') {
               name.children.forEach((child) => {
                  console.log(child.data);
               });
           }
       })
    });


});