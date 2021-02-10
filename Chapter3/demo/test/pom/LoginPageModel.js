module.exports = class LoginPageModel {
    constructor(page, config) {
        this.page = page;
        this.config = config;
    }

    async go() {
        return await this.page.goto(this.config.baseURL + 'login');
    }

    async title() {
        return await this.page.title();
    }

    async logState() {
        await this.page.waitForSelector('#navbarTop .nav-link');
        return await this.page.evaluate(() => document.querySelector('#navbarTop .nav-link').innerText);
    }

    async login(user, password) {
        await this.page.type("#email", user);
        await this.page.type("#password", password);
        await this.page.click('#login-form .btn-success');
    }
}