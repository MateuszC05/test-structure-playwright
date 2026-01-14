import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class MyWorkPage extends BasePage {
    // Definiuje Xpathy używane tylko w obrębie tej klasy/widoku
    private readonly selectors = {
        // Zakładka 'Moja Praca'
        tab: 'xpath=//a[contains(text(), "Moja praca") or contains(text(), "My Work")]',
        // Kalendarz lub widok tygodniowy
        weeklyView: 'xpath=//div[contains(@class, "weekly-view")]',
        // Przycisk dodawania logu czasu
        logWorkButton: 'xpath=//button[contains(@class, "log-work")]'
    };

    constructor(page: Page) {
        super(page);
    }

    async verifyWeeklyViewVisible() {
        return await this.page.locator(this.selectors.weeklyView).isVisible();
    }
}
