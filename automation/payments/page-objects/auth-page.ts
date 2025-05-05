import { expect, Locator, Page } from '@playwright/test';
import { promisify } from 'util';
import baseURL from '../playwright.config';

const sleep = promisify(setTimeout);

export let emailBox: string;
export default class AuthPage {
  private readonly page: Page;
  readonly signupEmailField: Locator;
  readonly signupPasswordField: Locator;
  readonly signupNameField: Locator;
  readonly signupButton: Locator;

  private static baseURL = baseURL;
  constructor(page: Page) {
    this.page = page;
    this.signupEmailField = page.getByTestId('email-input-field-signup-form').getByLabel('Email *');
    this.signupPasswordField = page.getByTestId('password-input-field-signup-form').getByLabel('Password *');
    this.signupNameField = page.getByTestId('name-input-field-signup-form').getByLabel('Name *');
    this.signupButton = page.getByTestId('sign-up-btn');
  }

  async simpleUserSignUp(page: Page): Promise<string> {
    const currentTimestamp = Date.now().toString().slice(-7);
    emailBox = `qb${currentTimestamp}@testqb.com`;
    await this.signupEmailField.click();
    await this.signupEmailField.fill(emailBox);
    await this.signupPasswordField.click();
    await this.signupPasswordField.fill('123456');
    await this.signupNameField.click();
    await this.signupNameField.fill('Team PwAuto');
    await this.signupButton.click();
    await sleep(6000);
    return emailBox;
  }

  async validateUserSignup(page: Page, pageType: string): Promise<void> {
    await this.page.waitForTimeout(1000);
    switch (pageType) {
      case 'signup':
        expect(await page.getByRole('button', { name: 'Skip' }).waitFor({ state: 'visible' }));
        break;
      case 'upgrade':
        expect(await page.getByTestId('upgrade-select-plan-1').waitFor({ state: 'visible' }));
        break;
      case 'team':
        expect(await page.getByRole('button', { name: 'Continue' }).waitFor({ state: 'visible' }));
        break;
    }
    await this.page.waitForTimeout(1000);
  }
}
