import { test, expect, Locator } from '@playwright/test';
import SigninPage from '../pom/SigninPage';
import { users } from '../test-data/testUsers';

test.describe(('Sign in tests'), () => {
    let signInPage: SigninPage;
    test.beforeEach( async ({page})=>{
        signInPage = new SigninPage(page);
        await signInPage.openPage();
    })

    test('Success sign in with user name', async ({page}) => {
       await signInPage.signInWithCredentials(users.testUser1.userName, users.testUser1.password)
       await expect (page.locator("//span[@class='text truncated-item-container']//span[@class='truncated-item-name']")).toHaveText(users.testUser1.userName)
         
    })

    test('Success sign in with email', async ({page}) => {
       await signInPage.signInWithCredentials(users.testUser1.email, users.testUser1.password)
       await expect (page.locator("//span[@class='text truncated-item-container']//span[@class='truncated-item-name']")).toHaveText(users.testUser1.userName)
         
    })

    test('Sign in with empty email', async ({page}) => {
       await signInPage.signInWithCredentials("", users.testUser1.password)
       await signInPage.verifyErrorMessageForFieldIsShown("userName")   
    })

    test('Sign in with empty password', async ({page}) => {
       await signInPage.signInWithCredentials(users.testUser1.email, "")
       await signInPage.verifyErrorMessageForFieldIsShown("password")   
    })

    test('Redirection to forgot password page', async ({page}) => {
       await signInPage.clickForgotPasswordLink()
       await expect(page).toHaveURL("/user/forgot_password")  
    })

    test('Redirection to register page', async ({page}) => {
       await signInPage.clickRegisterNowLink()
       await expect(page).toHaveURL("/user/sign_up")  
    })

});