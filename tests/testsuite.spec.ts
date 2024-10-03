import { test, expect, request } from '@playwright/test';
import { generateClientData } from "./testdata";
import { ClientPage } from './ClientPage';
import { CounterPage } from './CounterPage';
import { config } from "dotenv";
import { faker } from "@faker-js/faker";
import { LoginPage } from './login-page';
import { DashboardPage } from './dashboard-page';
import { generateUserData, generateRoomData, generateBillData, generateReservationData, generateDates} from './testdata'; 
import { APIHelper } from './apiHelpers';


test.describe('Frontend tests', () => {
 
  });
    test("Test case 01, log in and log out", async ({ page }) => {
      const loginPage = new LoginPage(page);
      const dashboardPage = new DashboardPage(page);
    
      await page.goto('http://localhost:3000/login');
      await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
      await dashboardPage.performLogout();
      await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
      
});
test("Test case 02, count clients", async ({ page }) => {
  const clientPage = new ClientPage(page);
  const clientData = generateClientData();
  const counterPage = new CounterPage(page);
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

      await page.goto('http://localhost:3000/login');
      await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page.getByRole("heading", { name: "Tester Hotel Overview" })).toBeVisible();

  // click on clients view
      await page.locator("#app > div > div > div:nth-child(2) > a").click();

      await counterPage.countClients();
 
});


test.describe('Backend tests', () => {
  test.beforeEach(async () => {

    const LOGIN_URL = `http://localhost:3000/login`;
    console.log(LOGIN_URL);
  
    // Hämta inloggningsuppgifter från miljövariabler
    const loginCredentials = {
      'username': `${process.env.TEST_USERNAME}`, 
      'password': `${process.env.TEST_PASSWORD}`
    };
    console.log('för att få',loginCredentials);
  
    // Skicka inloggningsbegäran
    const context = await request.newContext();
    const response = await context.post(LOGIN_URL, {    
      data: loginCredentials,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseBody = await response.text(); // Läs svaret som text
    // console.log(responseBody); // Logga svaret för felsökning
  
    if (!response.ok()) {
      console.error(`Login request failed with status: ${response.status()}`);
      return; // Avsluta om begäran misslyckades
    }

    const json = await response.json();
      // console.log(json);
    const xUserAuth = {
      'x-user-auth': `{ "username": "tester01","token": "${json.token}"}`
    };
    
  });


  test('Test case 01 - Get all roomposts - v2', async ({ request }) => {
    const clientsResponse = await request.get(`http://localhost:3000/api/rooms`, {
      headers: xUserAuth
    });
    const apiHelper = new APIHelper();
    const rooms = await apiHelper.getAllRoomPosts(request);
    expect(clientsResponse.ok()).toBeTruthy();

    // To see the data 
    const roomData = await clientsResponse.json(); // Hämta JSON-data
    console.log(roomData);
  
  });
  })


