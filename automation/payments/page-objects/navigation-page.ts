import { expect, Locator, Page } from '@playwright/test';
import { promisify } from 'util';
import baseURL from '../playwright.config';

const sleep = promisify(setTimeout);

export default class NavigationPage {
  private readonly page: Page;
  readonly loginButton: Locator;
  readonly alreadyHaveAcc: Locator;
  readonly modalLoginLink: Locator;
  readonly modalSignupLink: Locator;

  private static baseURL = baseURL;
  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByTestId('login-btn');
    this.modalSignupLink = page.getByRole('link', { name: 'Sign up' });
  }

  async navigateToAuthPageFromUserIcon(page: Page, signup: Boolean): Promise<void> {
    if (signup) {
      await this.modalSignupLink.waitFor({ state: 'visible' });
      await this.modalSignupLink.click();
      await page.waitForLoadState('domcontentloaded');
      expect(await this.alreadyHaveAcc.waitFor({ state: 'visible' }));
    } else {
      await this.modalLoginLink.waitFor({ state: 'visible' });
      await this.modalLoginLink.click();
      await page.waitForLoadState('domcontentloaded');
      expect(await this.loginButton.waitFor({ state: 'visible' }));
    }
  }

  async navigateToUrl(destination: string): Promise<string> {
    const url = `./${destination}`;
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
    return this.page.url();
  }
}
