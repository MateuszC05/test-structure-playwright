import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class DashboardPage extends BasePage {
    // Defines XPaths used only within this class/view
    private readonly selectors = {
        header: 'xpath=//h1[contains(text(), "Dashboard")]',
        timeTrackingWidget: 'xpath=//div[@id="time-tracking-widget"]'
    };

    constructor(page: Page) {
        super(page);
    }

    async isHeaderVisible() {
        return await this.page.locator(this.selectors.header).isVisible();
    }
}
