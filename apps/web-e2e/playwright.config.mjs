import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
import { fileURLToPath } from 'url';
import { workspaceRoot } from '@nx/devkit';

const __filename = fileURLToPath(import.meta.url);

const baseURL = process.env['BASE_URL'] || 'http://localhost:7200';

export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npx nx serve web',
    url: 'http://localhost:7200',
    reuseExistingServer: !process.env.CI,
    cwd: workspaceRoot,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
