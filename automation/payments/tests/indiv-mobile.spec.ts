import type { BrowserContext, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { promisify } from 'util';
import NavigationPage from '../page-objects/navigation-page';
import CommonPage from '../page-objects/common-function-page';
import AuthPage from '../page-objects/auth-page';
import MobileNavigationPage from '../page-objects/mobile-page';

const sleep = promisify(setTimeout);

test.describe.serial('@P0 Mobile Purchase Flow @bsm', () => {
  let context: BrowserContext;
  let page: Page;
  let navigationPage: NavigationPage;
  let commonPage: CommonPage;
  let authPage: AuthPage;
  let mobileNavigationPage: MobileNavigationPage;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    navigationPage = new NavigationPage(page);
    commonPage = new CommonPage(page);
    authPage = new AuthPage(page);
    mobileNavigationPage = new MobileNavigationPage(page);

    await page.goto('https://quillbot.com/');
    await commonPage.closeOneTap(page);
  });

  test('@P0 TC-134 Mobile Individual stripe purchase for mob user', async ({ request }) => {
    await mobileNavigationPage.navigateToMobileAuthModal(page);
    await navigationPage.navigateToAuthPageFromUserIcon(page, true);
  });

  test.afterAll(async () => {
      await context.close();
  });
});
