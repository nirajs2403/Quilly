import { defineConfig, devices } from '@playwright/test';
import { config } from 'dotenv';
import path from 'path';

export default defineConfig({

  testDir: './tests',
  timeout: 200 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 8 : 2,
  outputDir: './test-results/',
  reporter: [
    ['html', { outputFolder: '../../test-report', open: 'on-failure' }]
  ],
  use: {
    actionTimeout: 0,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    baseURL: process.env.URL,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      snapshotDir: '../../automation/payments/tests/visual-testing/baseSnapshots/',
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      grep: /@saf/,
    },

    {
      name: 'MobileChrome',
      use: { ...devices['Pixel 5'] },
      snapshotDir: '../../automation/payments/tests/visual-testing/baseSnapshots/',
      grep: /@mob/,
    }
  ],

});
