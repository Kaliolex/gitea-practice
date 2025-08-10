import { test, expect, Locator } from '@playwright/test';
import SettingsPage from '../pom/SettingsPage';
import { beforeEach } from 'node:test';
import { users } from '../test-data/testUsers';
import SigninPage from '../pom/SigninPage';

//Update name
//delete account
//update full name

test.describe('Settings tests', () =>{
    let settingsPage: SettingsPage;
    let signInPage: SigninPage;
    test.beforeEach(async ({page}) => {
        signInPage = new SigninPage(page);
        
        await signInPage.openPage();
        await signInPage.signInWithCredentials(users.testUser2.userName, users.testUser2.password);
        settingsPage = new SettingsPage(page);
        await settingsPage.pageOpen();
    });

    

    test('Update user full name', async ({page}) =>{
        await settingsPage.fillProfileSectionFields(users.testUser3.userName, '');
        await settingsPage.clickUpdateProfileButton();
        await settingsPage.confirmationMessageShown();
        await settingsPage.fillProfileSectionFields(users.testUser2.userName, '');
        await settingsPage.clickUpdateProfileButton();

    });

    test('Update user name', async ({page}) =>{
        await settingsPage.fillProfileSectionFields(users.testUser2.userName, 'Test user');
        await settingsPage.clickUpdateProfileButton();
        await settingsPage.confirmationMessageShown();
    });

    test('Delete account', async ({page}) =>{
        await settingsPage.accountSectionOpen();
        await settingsPage.fillPasswordField(users.testUser2.password);
        await settingsPage.clickConfirmDeletionButton();
        await settingsPage.confirmDeletionClick();
        await expect(page).toHaveURL('/');
    });







});