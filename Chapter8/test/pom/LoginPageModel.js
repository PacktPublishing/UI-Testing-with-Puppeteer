module.exports = class LoginPageModel {
    constructor(page, config) {
        this.page = page;
        this.config = config;
    }

    async go() {
        await this.page.goto(this.config.baseURL + 'login');
    }

    async title() {
        return await this.page.title();
    }

    async logState() {
        await this.page.waitForSelector('#navbarTop .nav-link');
        return await this.page.evaluate(() => document.querySelector('#navbarTop .nav-link').innerText);
    }

    async login(user, password) {
        const emailInput = await this.page.$('#email');
        await emailInput.type(user, { delay: 100});
        const passwordInput = await (await this.page.evaluateHandle(() => document.querySelector('#password'))).asElement();
        await passwordInput.type(password, { delay: 100});
        const loginBtn = await this.page.$('#login-form [type=submit]');
        await loginBtn.click();
    }
}