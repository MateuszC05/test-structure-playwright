import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class SettingsPage extends BasePage {
    // Definiuje Xpathy używane tylko w obrębie tej klasy/widoku
    private readonly selectors = {
        // Zakładka 'Ustawienia'
        tab: 'xpath=//a[contains(text(), "Ustawienia") or contains(text(), "Settings")]',
        // Panel ustawień ogólnych
        generalSettingsPanel: 'xpath=//div[contains(@class, "general-settings")]',
        // Przycisk zapisywania ustawień
        saveButton: 'xpath=//button[contains(@class, "save-settings")]'
    };

    constructor(page: Page) {
        super(page);
    }

    async isSettingsPanelVisible() {
        return await this.page.locator(this.selectors.generalSettingsPanel).isVisible();
    }
}
