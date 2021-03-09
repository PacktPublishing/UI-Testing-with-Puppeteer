# UI Testing with Puppeteer

<a href="https://www.packtpub.com/product/ui-testing-with-puppeteer/9781800206786?utm_source=github&utm_medium=repository&utm_campaign=9781800206786"><img src="https://static.packt-cdn.com/products/9781800206786/cover/smaller" alt="UI Testing with Puppeteer" height="256px" align="right"></a>

This is the code repository for [UI Testing with Puppeteer](https://www.packtpub.com/product/ui-testing-with-puppeteer/9781800206786?utm_source=github&utm_medium=repository&utm_campaign=9781800206786), published by Packt.

**Implement end-to-end testing and browser automation using JavaScript and Node.js**

## What is this book about?
Puppeteer is an open source web automation library created by Google to perform tasks such as end-to-end testing, performance monitoring, and task automation with ease. Using real-world use cases, this book will take you on a pragmatic journey, helping you to learn Puppeteer and implement best practices to take your automation code to the next level!


This book covers the following exciting features: 
* Understand browser automation fundamentals
* Explore end-to-end testing with Puppeteer and its best practices
* Apply CSS Selectors and XPath expressions to web automation
* Discover how you can leverage the power of web automation as a developer
* Emulate different use cases of Puppeteer such as network speed tests and geolocation

If you feel this book is for you, get your [copy](https://www.amazon.com/dp/180020678X) today!

<a href="https://www.packtpub.com/?utm_source=github&utm_medium=banner&utm_campaign=GitHubBanner"><img src="https://raw.githubusercontent.com/PacktPublishing/GitHub/master/GitHub.png" 
alt="https://www.packtpub.com/" border="5" /></a>


## Instructions and Navigations
All of the code is organized into folders. For example, Chapter02.

The code will look like the following:
```
class Cart {
constructor() {
this._cart = [];
}
total() {
return this._cart.reduce((acc, v) => acc + v.price, 0);
};
addToCart(item) {
this._cart.push(item);
};
}
module.exports = Cart;
```

**Following is what you need for this book:**

The book is for testing professionals, QA engineers, and test automation enthusiasts who want to perform end-to-end testing using Google's developer tools. Web developers who want to learn how to use Puppeteer for generating content, scraping websites, and evaluating website performance will find this book useful. Although knowledge of Node.js isn’t necessary, basic JavaScript knowledge will assist with understanding the concepts covered.

### Install steps

All chapters have its own NodeJS application. Make sure to run npm install before running each chapter.

From Chapter3. There is a website under the vuejs-firebase-shopping-cart directory. Make sure to run npm install under that directory. You will also need to run that website, running npm run server before running the tests.

With the following software and hardware list you can run all code files present in the book (Chapter 1-10).

### Software and Hardware List

| Chapter  | Software required                   | OS required                        |
| -------- | ------------------------------------| -----------------------------------|
| 1-10     | Node.js (10.18.1+)                 | Windows, Mac OS X, and Linux (Any) |
| 1-10     | Visual Studio Code                  | Windows, Mac OS X, and Linux (Any) |


We also provide a PDF file that has color images of the screenshots/diagrams used in this book. [Click here to download it](https://static.packt-cdn.com/downloads/9781800206786_ColorImages.pdf).


### Related products <Other books you may enjoy>
* End-to-End Web Testing with Cypress [[Packt]](https://www.packtpub.com/product/end-to-end-web-testing-with-cypress/9781839213854?utm_source=github&utm_medium=repository&utm_campaign=9781839213854) [[Amazon]](https://www.amazon.com/dp/183921385X)

* Modern Web Testing with TestCafe [[Packt]](https://www.packtpub.com/product/modern-web-testing-with-testcafe/9781800200951?utm_source=github&utm_medium=repository&utm_campaign=9781800200951) [[Amazon]](https://www.amazon.com/dp/1800200951)

## Get to Know the Author
**Dario Kondratiuk**
has been a web developer since 2001. He won the Microsoft MVP (Most Valuable Professional) award in 2020 for his contributions to the developer community. Dario has been working with Puppeteer since the beta versions, back in 2017. He is the author of Puppeteer-Sharp, a Puppeteer port to .NET, and Playwright-Sharp, a Playwright port to .NET. He writes about web automation on his blog, https://www.hardkoded.com, and he's active on Stack Overflow.






