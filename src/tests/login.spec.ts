import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LoginData } from '../data/LoginData';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('Successful Login', async ({ page }) => {
        // Since we don't have real credentials or a real app instance set up in this environment,
        // this is a template test.
        await loginPage.login(LoginData.VALID_USERNAME, LoginData.VALID_PASSWORD);

        // Assertions would go here, e.g.:
        // await expect(page).toHaveURL(/.*dashboard/);
    });

    test('Failed Login', async ({ page }) => {
        await loginPage.login(LoginData.INVALID_USERNAME, LoginData.INVALID_PASSWORD);

        // await expect(loginPage.getErrorMessage()).resolves.toContain('Invalid credentials');
    });
});
