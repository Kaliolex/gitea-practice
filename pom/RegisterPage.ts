import { Page, Locator, expect } from "@playwright/test";
import BasePage from "./BasePage";

export default class RegisterPage extends BasePage {
    private readonly userNameField: Locator = this.page.locator("//input[@id='user_name']");
    private readonly emailField: Locator = this.page.locator("//input[@id='email']");
    private readonly passwordField: Locator = this.page.locator("//input[@id='password']");
    private readonly confirmPasswordField: Locator = this.page.locator("//input[@id='retype']");
    private readonly registerButton: Locator = this.page.locator("//button[normalize-space()='Register Account']");
    private readonly signInLink: Locator = this.page.locator("//a[normalize-space()='Sign in now!']"); 
    readonly errorNotification: Locator = this.page.locator("//p[normalize-space()]");

    async pageOpen() {
        await this.page.goto("/user/sign_up")
    }

    async registerUser(userName: string, email: string, password: string, confirmPassword: string) {
        await this.userNameField.fill(userName);
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.confirmPasswordField.fill(confirmPassword);
        await this.registerButton.click()
    }

    async clickSignInLink() {
        await this.signInLink.click()
    }

    async verifyErrorMessageForFieldIsShown(fieldName: string) {
    let elementToCheck: Locator;
    switch (fieldName) {
        case "username":
            elementToCheck = this.userNameField;
            break;
        case "email":
            elementToCheck = this.emailField;
            break;
        case "password":
            elementToCheck = this.passwordField;
            break;
        case "confirmPassword":
            elementToCheck = this.confirmPasswordField;
            break;
        default:
            throw new Error(`Unsupported field name: ${fieldName}`);
        }
    await expect(elementToCheck).toHaveJSProperty('validationMessage', 'Заполните это поле.');
    }

    async verifyErrorNotificationIsShown() {
        await expect(this.errorNotification).toBeVisible();
    }
}
