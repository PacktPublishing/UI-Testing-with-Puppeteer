const https = require('https');
const xmlParser = require('xml2js').parseString;
const puppeteer = require('puppeteer');
const fs = require('fs');

(async function() {
    var sitemapxml = await getSitemap();
    var categories = await getCategories(sitemapxml);
    let books = [];
    const page = await getPuppeteerPage();

    for(const categoryURL of categories) {
        var newBooks = await getBooks(categoryURL, page); 
        if(newBooks) {
            books.push(...newBooks);
        }
    }

    var prices = [];
    for(const bookURL of books) {
        const price = await getPrice(bookURL, page);
        if(price) {
            prices.push(price);
        }
    }

    fs.writeFile('./prices.json', JSON.stringify(prices), function(err, result) {
        if(err) console.log('error', err);
    });
    page.browser().close();
})();

async function getPrice(bookURL, page) {
    try {
        await page.goto(bookURL);
        await page.waitForSelector('.price-list__item .price-list__price');
        return await page.evaluate(()=> {
            const prices = document.querySelectorAll('.price-list__item .price-list__price');
            if (document.querySelectorAll('.price-list__name').length > 2 && document.querySelectorAll('.price-list__name')[2].innerText.trim() === 'eBook') {
                return {
                    book: document.querySelector('.product-info__title').innerText,
                    print: prices[1].innerText,
                    ebook: prices[2].innerText,
                }
            }
        });
    }
    catch {
        console.log(`Unable to get price from ${bookURL}`);
    }
}

async function getBooks(categoryURL, page) {
    try {
        await page.goto(categoryURL);
        await page.waitForSelector('a.card-body');
        return await page.evaluate(() => {
            const links = document.querySelectorAll('a.card-body');
            return Array.from(links).map(l => l.getAttribute('href')).slice(0, 10);
        });
    }
    catch {
        console.log(`Unable to get books from ${categoryURL}`);
    }
}

async function getPuppeteerPage() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 500
    });
    const userAgent = await browser.userAgent();
    const page = await browser.newPage();
    await page.setUserAgent(userAgent + ' UITestingWithPuppeteerDemoBot');
    return page;
}

function getCategories(sitemapxml) {
    let resolve;
    const promise = new Promise(r => resolve = r);
    xmlParser(sitemapxml, function(err, result) {
        let output = result.urlset.url
            .filter(url => url.loc[0].match(/\//g).length === 3)
            .slice(0, 10)
            .map(url => url.loc[0]);
        resolve(output);
    });

    return promise;
}

function getSitemap() {
    let resolve;
    const promise = new Promise(r => resolve = r);
    https.get('https://www.packtpub.com/sitemap.xml', function (res) {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => resolve(body));
    });

    return promise;
}