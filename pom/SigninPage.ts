import { Page, Locator, expect } from "@playwright/test";
import BasePage from "./BasePage";

export default class SigninPage extends BasePage {
    private readonly userNameField : Locator = this.page.locator("//input[@id='user_name']");
    private readonly passwordField : Locator = this.page.locator("//input[@id='password']");
    private readonly signinButton : Locator = this.page.locator("//button[normalize-space()='Sign In']");
    private readonly forgotPasswordLink : Locator = this.page.locator("//a[normalize-space()='Forgot password?']");
    private readonly registerNowLink : Locator = this.page.locator("//a[normalize-space()='Register now.']");
    private readonly wrongCredentialsMessage : Locator = this.page.locator('//div[contains(@class, "flash-error")]//p');


    async openPage() {
        await this.page.goto('/user/login');
    }

    async enterUserName(userName:string) {
        await this.userNameField.fill(userName);
    }

    async enterPassword(password:string) {
        await this.passwordField.fill(password);
    }

    async clickSigninButton() {
        await this.signinButton.click();
    }

    async signInWithCredentials(username: string, password:string){
        await this.enterUserName(username);
        await this.enterPassword(password);
        await this.clickSigninButton();
    }

    async clickForgotPasswordLink() {
        await this.forgotPasswordLink.click();
    }

    async clickRegisterNowLink() {
        await this.registerNowLink.click();
    }

    async verifyErrorMessageForFieldIsShown(fieldName: string) {
        let elementToCheck: Locator;
        if (fieldName === 'userName') {
            elementToCheck = this.userNameField;
        } else {
            elementToCheck = this.passwordField;
        }

        await expect(elementToCheck).toHaveJSProperty('validationMessage', 'Please fill out this field.');
    }

    async verifyWrongCredentialsMessageIsShown() {
        await expect(this.wrongCredentialsMessage).toBeVisible();
    } 
    
}


