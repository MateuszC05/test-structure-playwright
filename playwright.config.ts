import { defineConfig, devices } from '@playwright/test';
import { ConfigReader } from './src/utils/ConfigReader';

const appConfig = ConfigReader.readConfig();

// Określ nazwę przeglądarki i tryb headless
let browserName = 'chromium';
let headless = true;
let channel = undefined;

switch (appConfig.browser) {
    case 'CHROME':
        browserName = 'chromium';
        channel = 'chrome';
        headless = false;
        break;
    case 'CHROME_HEADLESS':
        browserName = 'chromium';
        channel = 'chrome';
        headless = true;
        break;
    case 'FIREFOX':
        browserName = 'firefox';
        headless = false;
        break;
    case 'FIREFOX_HEADLESS':
        browserName = 'firefox';
        headless = true;
        break;
    case 'EDGE':
        browserName = 'chromium';
        channel = 'msedge';
        headless = false;
        break;
    case 'IE':
        // Playwright nie obsługuje w pełni IE11, ale możemy spróbować zmapować go lub użyć fallbacku.
        // Zazwyczaj projekty migrujące z Selenium mogą prosić o IE, ale Playwright skupia się na nowoczesnych silnikach.
        // Zmapujemy to na chromium na razie lub wyrzucimy błąd, jeśli jest to ściśle wymagane.
        console.warn('IE nie jest natywnie obsługiwane przez Playwright. Użyto Chromium zamiast niego.');
        browserName = 'chromium';
        headless = false;
        break;
}

export default defineConfig({
  testDir: './src/tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
      ['html'],
      ['list']
  ],
  use: {
    baseURL: appConfig.appLink,
    trace: 'on-first-retry',
    video: 'on', // Nagrywaj wideo dla każdego testu
    screenshot: 'only-on-failure',
    headless: headless,
    viewport: { width: appConfig.width, height: appConfig.height },
    channel: channel,
  },
  projects: [
    {
      name: appConfig.browser,
      use: {
          browserName: browserName as any,
      }
    },
  ],
});
