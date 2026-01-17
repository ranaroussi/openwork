import type { Page } from '@playwright/test';
import { TEST_TIMEOUTS } from '../config';

export class SettingsPage {
  constructor(private page: Page) {}

  get title() {
    return this.page.getByTestId('settings-title');
  }

  get debugModeToggle() {
    return this.page.getByTestId('settings-debug-toggle');
  }

  get modelSection() {
    return this.page.getByTestId('settings-model-section');
  }

  get modelSelect() {
    return this.page.getByTestId('settings-model-select');
  }

  get providerSection() {
    return this.page.getByTestId('settings-provider-section');
  }

  get apiKeyInput() {
    return this.page.getByTestId('settings-api-key-input');
  }

  get addApiKeyButton() {
    return this.page.getByTestId('settings-add-api-key-button');
  }

  get removeApiKeyButton() {
    return this.page.getByTestId('settings-remove-api-key-button');
  }

  get backButton() {
    return this.page.getByTestId('settings-back-button');
  }

  get sidebarSettingsButton() {
    return this.page.getByTestId('sidebar-settings-button');
  }

  async navigateToSettings() {
    // Click the settings button in sidebar to navigate
    await this.sidebarSettingsButton.click();
    // Wait for settings dialog to be visible
    await this.modelSelect.waitFor({ state: 'visible', timeout: TEST_TIMEOUTS.NAVIGATION });
  }

  async toggleDebugMode() {
    await this.debugModeToggle.click();
  }

  async selectModel(modelName: string) {
    await this.modelSelect.click();
    await this.page.getByText(modelName).click();
  }

  async addApiKey(provider: string, key: string) {
    await this.apiKeyInput.fill(key);
    await this.addApiKeyButton.click();
  }

  /**
   * Get a provider button by its name
   */
  getProviderButton(providerName: string) {
    return this.page.getByRole('button', { name: providerName, exact: true });
  }

  /**
   * Select a provider by clicking its button
   */
  async selectProvider(providerName: string) {
    const button = this.getProviderButton(providerName);
    await button.click();
  }

  /**
   * Check if a provider button is visible
   */
  async isProviderVisible(providerName: string) {
    const button = this.getProviderButton(providerName);
    return button.isVisible();
  }
}
