import { Page, Locator, expect } from "@playwright/test";
import BasePage from "./BasePage";

export default class SettingsPage extends BasePage {
    private readonly updateProfileButton: Locator = this.page.locator("//button[normalize-space()='Update Profile']");
    private readonly confirmDeletionButton: Locator = this.page.locator("//button[normalize-space()='Confirm Deletion']")
    private readonly passwordField: Locator = this.page.locator("//input[@id='password-confirmation']");
    private readonly userNameField: Locator = this.page.locator("//input[@id='username']");
    private readonly fullNameField: Locator = this.page.locator("//input[@id='full_name']");
    private readonly confirmationMessage: Locator = this.page.locator("(//div[@class='ui positive message flash-message flash-success'])[1]")
    private readonly accountSectionButton: Locator = this.page.locator("//a[normalize-space()='Account']");
    private readonly confirmDeleteYesButton: Locator = this.page.locator("//div[@id='delete-account']//button[@class='ui primary ok button'][normalize-space()='Yes']");

    async pageOpen() {
        await this.page.goto("/user/settings");
    }

    async clickUpdateProfileButton() {
        await this.updateProfileButton.click();
    }

    async clickConfirmDeletionButton() {
        await this.confirmDeletionButton.click()
    }

    async fillProfileSectionFields(username: string, fullName: string) {
        await this.userNameField.fill(username);
        await this.fullNameField.fill(fullName);
    }

    async fillPasswordField(password: string) {
        await this.passwordField.fill(password);
    }

    async confirmationMessageShown() {
        await expect(this.confirmationMessage).toBeVisible();
    }

    async accountSectionOpen(){
        await this.accountSectionButton.click();
    }

    async confirmDeletionClick() {
        await this.confirmDeleteYesButton.click();
    }
}