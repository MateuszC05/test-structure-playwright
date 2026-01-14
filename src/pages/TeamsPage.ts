import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class TeamsPage extends BasePage {
    // Definiuje Xpathy używane tylko w obrębie tej klasy/widoku
    private readonly selectors = {
        // Zakładka 'Zespoły'
        tab: 'xpath=//a[contains(text(), "Zespoły") or contains(text(), "Teams")]',
        // Lista zespołów
        teamsList: 'xpath=//ul[contains(@class, "teams-list")]',
        // Przycisk dodawania zespołu
        addTeamButton: 'xpath=//button[contains(@class, "add-team")]'
    };

    constructor(page: Page) {
        super(page);
    }

    async isTeamsListVisible() {
        return await this.page.locator(this.selectors.teamsList).isVisible();
    }
}
