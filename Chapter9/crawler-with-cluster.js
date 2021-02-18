const https = require('https');
const xmlParser = require('xml2js').parseString;
const puppeteer = require('puppeteer');
const fs = require('fs');
const { Cluster } = require('puppeteer-cluster');

(async function() {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_PAGE,
        maxConcurrency: 2,
        retryLimit: 1,
        monitor: true,
        puppeteerOptions: {
            headless: false,
            slowMo: 500,
        }
    });

    cluster.on('taskerror', (err, data, willRetry) => {
        if (willRetry) {
          console.warn(`Encountered an error while crawling ${data}. ${err.message}\nThis job will be retried`);
        } else {
          console.error(`Failed to crawl ${data}: ${err.message}`);
        }
    });
    
    const sitemapxml = await getSitemap();
    const categories = await getCategories(sitemapxml);
    const prices = [];

    async function getBooks({ page, data}) {
        const userAgent = await page.browser().userAgent();
        await page.setUserAgent(userAgent + ' UITestingWithPuppeteerDemoBot');
        await page.goto(data);
        await page.waitForSelector('a.card-body');
        const newBooks = await page.evaluate(() => {
            const links = document.querySelectorAll('a.card-body');
            return Array.from(links).map(l => l.getAttribute('href')).slice(0, 10);
        });

        for(const book of newBooks) {
            cluster.queue(book, getPrice);
        }
    }
    
    async function getPrice({page, data}) {
        const userAgent = await page.browser().userAgent();
        await page.setUserAgent(userAgent + ' UITestingWithPuppeteerDemoBot');
        await page.goto(data);
        await page.waitForSelector('.price-list__item .price-list__price');
        prices.push(await page.evaluate(()=> {
            const prices = document.querySelectorAll('.price-list__item .price-list__price');
            if(document.querySelectorAll('.price-list__name')[1].innerText.trim() == 'Print + eBook') {
                return {
                    book: document.querySelector('.product-info__title').innerText,
                    print: prices[1].innerText,
                    ebook: prices[2].innerText,
                }
            }
        }));
    }

    for(const categoryURL of categories) {
        cluster.queue(categoryURL, getBooks);
    }

    await cluster.idle();
    await cluster.close();
    fs.writeFile('./prices.json', prices);
})();

function getCategories(sitemapxml) {
    let resolve;
    const promise = new Promise(r => resolve = r);
    xmlParser(sitemapxml, function(err, result) {
        const output = result.urlset.url
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