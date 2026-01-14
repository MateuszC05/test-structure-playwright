import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

// Klasa odpowiadająca widokowi 'Przedsięwzięcia'
export class EngagementsPage extends BasePage {
    // Definiuje Xpathy używane tylko w obrębie tej klasy/widoku
    private readonly selectors = {
        // Zakładka 'Przedsięwzięcia'
        tab: 'xpath=//a[contains(text(), "Przedsięwzięcia") or contains(text(), "Engagements")]',
        // Lista przedsięwzięć
        engagementsList: 'xpath=//div[contains(@class, "engagements-list")]',
        // Przycisk dodawania przedsięwzięcia
        createEngagementButton: 'xpath=//button[contains(@class, "create-engagement")]'
    };

    constructor(page: Page) {
        super(page);
    }

    async isEngagementsListVisible() {
        return await this.page.locator(this.selectors.engagementsList).isVisible();
    }
}
