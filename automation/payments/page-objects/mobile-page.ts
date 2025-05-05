import { expect, Locator, Page } from '@playwright/test';
import baseURL from '../playwright.config';

export default class MobileNavigationPage {
  private readonly page: Page;
  readonly mobileMenuHeaderButton: Locator;
  readonly mobileSidebarLoginButton: Locator;
  readonly mobileModalLoginButton: Locator;
  readonly mobileModalSignupButton: Locator;
  readonly logoutMeOutModalButton: Locator;
  readonly subscriptionText: Locator;
  readonly freeText: Locator;
  readonly verifyEmailButton: Locator;
  readonly emailSentText: Locator;
  readonly nameEditButton: Locator;

  private static baseURL = baseURL;
  constructor(page: Page) {
    this.page = page;
    this.mobileMenuHeaderButton = page.getByTestId('mobile-header-menu-button');
    this.mobileSidebarLoginButton = page.getByTestId('mobile-sidebar-login-button');
    this.mobileModalLoginButton = page.getByRole('link', { name: 'log in' });
    this.mobileModalSignupButton = page.getByRole('link', { name: 'Sign up' });
    this.subscriptionText = page.getByText('Subscription', { exact: true });
    this.freeText = page.getByText('Free', { exact: true });
    this.verifyEmailButton = page.getByRole('button', { name: 'Verify Email' });
    this.emailSentText = page.getByText('Email sent');
    this.nameEditButton = page.getByTestId('name_edit_icon');
  }

  async navigateToMobileAuthModal(page: Page): Promise<void> {
    await this.mobileMenuHeaderButton.waitFor({ state: 'visible' });
    await this.mobileMenuHeaderButton.click();
    await this.mobileSidebarLoginButton.waitFor({ state: 'visible' });
    await this.mobileSidebarLoginButton.click();
    expect(await this.mobileModalLoginButton.waitFor({ state: 'visible' }));
  }

  async navigateToUpgradePageFromheader(page: Page): Promise<void> {
    // Navigate from header
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Premium', exact: true }).click();
    const page1 = await page1Promise;
    await page1.waitForLoadState('domcontentloaded');
    await page1.getByTestId('premium-goto-upgrade-on-header').click();
    expect(await page1.getByRole('heading', { name: 'Select your plan' }).waitFor({ state: 'visible' }));
  }

  async navigateToUpgradePageFromHamburger(page: Page): Promise<void> {
    // Navigate from header
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('banner').getByRole('button').nth(1).click();
    await page.getByRole('link', { name: 'QuillBot Premium' }).click();
    const page1 = await page1Promise;
    await page1.waitForLoadState('domcontentloaded');
    await page1.getByTestId('premium-goto-upgrade-on-header').click();
    expect(await page1.getByRole('heading', { name: 'Select your plan' }).waitFor({ state: 'visible' }));
  }

  async continuePopUp() {
    const continueButton = await this.page.getByRole('button', { name: 'Continue' });
    if (await continueButton.isVisible()) {
      await continueButton.scrollIntoViewIfNeeded();
      await continueButton.click();
    }
  }
}
