import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LoginData } from '../data/LoginData';

test.describe('Testy Logowania', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('Pomyślne Logowanie', async ({ page }) => {
        // Ponieważ nie mamy prawdziwych danych uwierzytelniających ani prawdziwej instancji aplikacji skonfigurowanej w tym środowisku,
        // jest to test szablonowy.
        await loginPage.login(LoginData.VALID_USERNAME, LoginData.VALID_PASSWORD);

        // Asercje powinny znaleźć się tutaj, np.:
        // await expect(page).toHaveURL(/.*dashboard/);
    });

    test('Nieudane Logowanie', async ({ page }) => {
        await loginPage.login(LoginData.INVALID_USERNAME, LoginData.INVALID_PASSWORD);

        // await expect(loginPage.getErrorMessage()).resolves.toContain('Invalid credentials');
    });
});
