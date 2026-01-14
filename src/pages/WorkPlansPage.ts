import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class WorkPlansPage extends BasePage {
    // Definiuje Xpathy używane tylko w obrębie tej klasy/widoku
    private readonly selectors = {
        // Zakładka 'Plany pracy'
        tab: 'xpath=//a[contains(text(), "Plany pracy") or contains(text(), "Work Plans")]',
        // Widok Gantta lub osi czasu
        timelineView: 'xpath=//div[contains(@class, "timeline-view")]',
        // Przycisk tworzenia planu
        createPlanButton: 'xpath=//button[contains(@class, "create-plan")]'
    };

    constructor(page: Page) {
        super(page);
    }

    async isTimelineVisible() {
        return await this.page.locator(this.selectors.timelineView).isVisible();
    }
}
