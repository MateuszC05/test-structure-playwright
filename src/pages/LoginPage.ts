import { BasePage } from './BasePage';
import { Page, Locator } from '@playwright/test';

export class LoginPage extends BasePage {
    // Definiuje Xpathy używane tylko w obrębie tej klasy/widoku
    private readonly selectors = {
        usernameInput: 'xpath=//input[@id="username"]',
        passwordInput: 'xpath=//input[@id="password"]',
        loginButton: 'xpath=//button[@id="login-submit"]',
        errorMessage: 'xpath=//div[@class="error-message"]'
    };

    constructor(page: Page) {
        super(page);
    }

    async enterUsername(username: string) {
        await this.page.locator(this.selectors.usernameInput).fill(username);
    }

    async enterPassword(password: string) {
        await this.page.locator(this.selectors.passwordInput).fill(password);
    }

    async clickLogin() {
        await this.page.locator(this.selectors.loginButton).click();
    }

    async login(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    async getErrorMessage() {
        return await this.page.locator(this.selectors.errorMessage).textContent();
    }
}
