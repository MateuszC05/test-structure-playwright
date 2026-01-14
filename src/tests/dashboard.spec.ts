import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Testy Pulpitu (Dashboard)', () => {
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        dashboardPage = new DashboardPage(page);
        // Zakładając, że jesteśmy już zalogowani lub nawigujemy do pulpitu
        // W testach E2E zazwyczaj logujesz się przez API lub UI przed tym krokiem
    });

    test('Widoczność nagłówka Pulpitu', async ({ page }) => {
        // To jest tylko szablon
        // await dashboardPage.navigate('/dashboard');
        // const isVisible = await dashboardPage.isHeaderVisible();
        // expect(isVisible).toBeTruthy();
    });
});
