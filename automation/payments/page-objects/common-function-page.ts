import { BrowserContext, expect, Locator, Page } from '@playwright/test';
import { promisify } from 'util';
import baseURL from '../playwright.config';

const sleep = promisify(setTimeout);

export default class CommonPage {
  private readonly page: Page;
  readonly oneTapModalText: Locator;
  readonly oneTapCloseButton: Locator;

  private static baseURL = baseURL;
  constructor(page: Page) {
    this.page = page;
    this.oneTapModalText = page
      .locator('iframe[title="Sign in with Google Dialogue"]')
      .contentFrame()
      .getByText('Sign in with Google');
    this.oneTapCloseButton = page
      .locator('iframe[title="Sign in with Google Dialogue"]')
      .contentFrame()
      .getByLabel('Close');
  }

  async launchApplication(page: Page, abIDV2: number, worksheetId?: string) {
    if (worksheetId) {
      const url1 = `./?abIDV2=${abIDV2}&worksheetId=${worksheetId}`;
      await this.page.goto(url1);
      await page.waitForTimeout(1000);
      // console.log('The worksheetID url is:' + page.url());
      await page.waitForLoadState('domcontentloaded');
    } else {
      const url = `./?abIDV2=${abIDV2}`;
      await this.page.goto(url);
      await page.waitForTimeout(1000);
      console.log('The abIDV2 url is:' + page.url());
      await page.waitForLoadState('domcontentloaded');
    }
  }

  async closeOneTap(page: Page) {
    await page.waitForTimeout(1500);
    if (await this.oneTapModalText.isVisible()) {
      await this.oneTapCloseButton.click();
    }
  }
}
