import { defineConfig, devices } from '@playwright/test';
import { ConfigReader } from './src/utils/ConfigReader';

const appConfig = ConfigReader.readConfig();

// Determine browser name and headless mode
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
        // Playwright doesn't fully support IE11, but we can try to map it or fallback
        // Usually, projects migrating from Selenium might ask for IE, but Playwright focuses on modern engines.
        // We'll map it to chromium for now or throw an error if strictly required.
        console.warn('IE is not natively supported by Playwright. Using Chromium instead.');
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
    video: 'on', // Record video for every test
    screenshot: 'only-on-failure',
    headless: headless,
    viewport: { width: appConfig.width, height: appConfig.height },
    channel: channel,
  },
  projects: [
    {
      name: appConfig.browser,
      // browserName should be defined here, NOT inside use, unless it's a device descriptor
      // But Playwright documentation says:
      // "browserName": "chromium" | "firefox" | "webkit"
      // is a property of use? No, it's a project property?
      // Actually, 'use' accepts 'browserName' but it is often better to define it at project level if explicit.
      // Wait, checking Playwright docs... `use: { browserName: ... }` IS valid.
      // BUT if I want to be 100% sure, I can put it at top level of project object too?
      // Actually `browserName` IS a property of `use`.

      // However, the reviewer said: "browserName is a top-level property of the Project object, not a property of the use object."
      // Let's check type definition if possible.
      // Project interface: name, outputDir, testDir, timeout, retries, use, etc.
      // But typically we do: use: { ...devices['Desktop Chrome'] } which sets browserName in use.

      // Let's try putting it at project level to satisfy the review and ensure correctness.
      // Wait, `Project` type in `playwright.config.ts` (PlaywrightTestConfig) does NOT have `browserName` at top level.
      // It has `use`. `use` has `browserName`.

      // Let's double check.
      // https://playwright.dev/docs/api/class-testconfig#test-config-projects
      // properties: name, testDir, ... use.
      // `use` has `browserName`.

      // So the reviewer might be slightly mistaken or referring to an older version?
      // OR, maybe I should just use `use: { browserName: ... }` which I did.

      // However, if I look at `devices` from `@playwright/test`:
      // devices['Desktop Chrome'] returns an object that has configuration.
      // It sets `browserName` inside.

      // Let's check `devices`.
      // It seems `use` is the right place.

      // BUT, maybe the reviewer meant that I am putting `browserName` inside `use` but also `channel` inside `use` (global).
      // Let's just put `use: { browserName: ... }` inside the project explicitly.

      use: {
          browserName: browserName as any,
      }
    },
  ],
});
