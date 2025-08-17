import { test, expect, Locator } from '@playwright/test';
import RegisterPage from '../pom/RegisterPage';
import { beforeEach } from 'node:test';
import { users } from '../test-data/testUsers';

test.describe('Register tests', () => {

    let registerPage: RegisterPage;
    test.beforeEach(async ({page})=>{
        registerPage = new RegisterPage(page);
        await registerPage.pageOpen();
    });

    test('Successful registration', async ({page}) => {
        await registerPage.registerUser(users.testUser2.userName, users.testUser2.email, users.testUser2.password, users.testUser2.password);
        await expect(page.locator("//div[@class='ui positive message flash-message flash-success']")).toBeVisible();
    });

    test('Registration with empty user name', async ({page}) => {
        await registerPage.registerUser('', users.testUser2.email, users.testUser2.password, users.testUser2.password);
        await registerPage.verifyErrorMessageForFieldIsShown('username');
    });

    test('Registration with empty user email', async ({page}) => {
        await registerPage.registerUser(users.testUser2.userName, '', users.testUser2.password, users.testUser2.password);
        await registerPage.verifyErrorMessageForFieldIsShown('email');
    });

    test('Registration with empty user password', async ({page}) => {
        await registerPage.registerUser(users.testUser2.userName, users.testUser2.email, '', '');
        await registerPage.verifyErrorMessageForFieldIsShown('password');
    });

    test('Registration with not matched passwords', async ({page}) => {
        await registerPage.registerUser(users.testUser2.userName, users.testUser2.email, users.testUser2.password, '123456');
        await registerPage.verifyErrorNotificationIsShown()
        await expect(registerPage.errorNotification).toHaveText('The passwords do not match.')
    });
    
    test('Registration with already registered email', async ({page}) => {
        await registerPage.registerUser('Test123', users.testUser2.email, users.testUser2.password, users.testUser2.password);
        await registerPage.verifyErrorNotificationIsShown()
        await expect(registerPage.errorNotification).toHaveText('The email address is already used.')
    });

    test('Proceeding to Sing in page via link', async ({page}) => {
        await registerPage.clickSignInLink()
        await expect(page).toHaveURL('/user/login')
    });

});