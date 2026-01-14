import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class PluginManagementPage extends BasePage {
    // Definiuje Xpathy używane tylko w obrębie tej klasy/widoku
    private readonly selectors = {
        // Zakładka 'Zarządzanie wtyczką'
        tab: 'xpath=//a[contains(text(), "Zarządzanie wtyczką") or contains(text(), "Plugin Management") or contains(text(), "Manage App")]',
        // Informacje o licencji
        licenseInfo: 'xpath=//div[contains(@class, "license-info")]',
        // Logi systemowe lub status
        statusIndicator: 'xpath=//div[contains(@class, "status-indicator")]'
    };

    constructor(page: Page) {
        super(page);
    }

    async isLicenseInfoVisible() {
        return await this.page.locator(this.selectors.licenseInfo).isVisible();
    }
}
