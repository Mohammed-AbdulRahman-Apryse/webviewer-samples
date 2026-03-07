import { test, expect } from '@playwright/test';

test('Components existence validation in DOM', async ({ page }) => {
  // Go to the app page (adjust the URL if needed)
  await page.goto('/client/index.html');

  // Locate the askWebSDKPanelToggle button in ModularHeader
  let component = page.locator('#viewer apryse-webviewer #app .App nav .ModularHeader .ModularHeaderItems .ToggleElementButton button[data-element="askWebSDKPanelToggle"]');
  await expect(component).toHaveCount(1);
  await expect(component).toBeVisible();

  // Wait for 5 seconds to ensure the app is fully
  // loaded before checking for the askWebSDKPanel
  await page.waitForTimeout(5000);

  // Locate the askWebSDKPanel panel in ModularPanel
  component = page.locator('#viewer apryse-webviewer #app .App .content div.ModularPanel[data-element="askWebSDKPanel"]');
  await expect(component).toHaveCount(1);
  await expect(component).toBeVisible();

  // Locate the askWebSDKButton button in the TextPopup
  await page.evaluate((pageNumber) => {
    const core = WebViewer.getInstance().Core;
    const UI = WebViewer.getInstance().UI;
    const documentViewer = core.documentViewer;
    const textSelectTool = documentViewer.getTool(core.Tools.ToolNames.TEXT_SELECT);
    documentViewer.setCurrentPage(pageNumber);
    UI.setToolMode(core.Tools.ToolNames.TEXT_SELECT);
    textSelectTool.select({ pageNumber: pageNumber, x: 56.69320848, y: 32.4018533200001 }, { pageNumber: pageNumber, x: 105.11567196000001, y: 40.06439572000011 });
    setTimeout(() => {
      UI.openElements(['textPopup']);
    }, 1000);
  }, 2);

  component = page.locator('#viewer apryse-webviewer #app .App .Popup.TextPopup .container button[data-element="askWebSDKButton"]');
  await expect(component).toHaveCount(1);
  await expect(component).toBeVisible();
});

test('Chatbot interactions', async ({ page }) => {
  await page.goto('/client/index.html');

  // Ask question via input field
  await page.fill('#askWebSDKQuestionInput', 'What social responsibility initiatives did Rosneft undertake in 2011?');

  // Hit Enter to send the question
  await page.press('#askWebSDKQuestionInput', 'Enter');

  // Wait for 1 second before finishing
  // the test to capture the AI response
  await page.waitForTimeout(1000);

  // Select some text on the document programmatically
  // Note: The coordinates used in the select function
  // are based on the PDF document used in this sample.
  await page.evaluate((pageNumber) => {
    const core = WebViewer.getInstance().Core;
    const documentViewer = core.documentViewer;
    const textSelectTool = documentViewer.getTool(core.Tools.ToolNames.TEXT_SELECT);
    documentViewer.setCurrentPage(pageNumber);
    textSelectTool.select({ pageNumber: pageNumber, x: 179.72459999999998, y: 536.4002 }, { pageNumber: pageNumber, x: 141.165, y: 415.9352 });
  }, 6);

  // Ask to summarize the selected text via input field
  await page.fill('#askWebSDKQuestionInput', 'Summarize the selected text');

  // // Hit Enter to send the question
  await page.press('#askWebSDKQuestionInput', 'Enter');

  // Sample text selection content to be shown in the chatbot UI
  const selection = 'The Tuapse license area extends over 12,000 square km in Russian territorial waters of the Black Sea. Its geology is similar to that of the West-Kuban Trough, which is located on the other side of the Caucasus ridge and is one of the oldest oil production regions in Russia. The Tuapse Block has been fully covered by 2D seismic work and the most prospective areas have also been studied using 3D seismic. Data obtained to date reveal 20 promising structures with 8.9 bln barrels of recoverable oil resources.';

  // Ensure chatbot is initialized
  await page.waitForFunction(() => chatbot && typeof chatbot.bubble === 'function');

  // Call bubble in browser context
  // to show the selected text in 
  // the chatbot UI as a human message
  await page.evaluate((content) => {
    chatbot.bubble(content, 'human');
  }, selection);

  // Wait for 1 second before finishing
  // the test to capture the AI response
  await page.waitForTimeout(1000);

  // Click the toggle button to hide the chatbot panel
  const toggleBtn = page.locator('#viewer apryse-webviewer #app .App nav .ModularHeader .ModularHeaderItems .ToggleElementButton button[data-element="askWebSDKPanelToggle"]');
  await toggleBtn.click();

  // Wait for 1 second between interactions
  // to ensure the UI has updated
  await page.waitForTimeout(1000);

  // Click the toggle button again to show the chatbot panel
  await toggleBtn.click();
});