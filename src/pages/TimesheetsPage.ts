import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class TimesheetsPage extends BasePage {
    // Definiuje Xpathy używane tylko w obrębie tej klasy/widoku
    private readonly selectors = {
        // Zakładka 'Karty czasu pracy'
        tab: 'xpath=//a[contains(text(), "Karty czasu pracy") or contains(text(), "Timesheets")]',
        // Tabela z timesheetami
        timesheetTable: 'xpath=//table[contains(@class, "timesheet-table")]',
        // Przycisk eksportu
        exportButton: 'xpath=//button[contains(@class, "export-btn")]'
    };

    constructor(page: Page) {
        super(page);
    }

    async isTimesheetTableVisible() {
        return await this.page.locator(this.selectors.timesheetTable).isVisible();
    }
}
