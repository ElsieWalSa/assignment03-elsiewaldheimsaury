import { test, expect } from '@playwright/test';
import { generateClientData } from "./testdata";
import { ClientPage } from './ClientPage';
import { CounterPage } from './CounterPage';
import { config } from "dotenv";
import { faker } from "@faker-js/faker";
import { LoginPage } from './login-page';
import { DashboardPage } from './dashboard-page';
import { generateUserData, generateRoomData, generateBillData, generateReservationData, generateDates} from './testdata'; 

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
  test('Test case 02 - Get all roomposts - v2', async ({ request }) => {
    const clientsResponse = await request.get(`${process.env.BASE_URL}/api/rooms`, {
      headers: xUserAuth
    });
    const getPosts = await apiHelper.getAllRoomPosts(request);
    expect(clientsResponse.ok()).toBeTruthy();

    // To see the data 
    const roomData = await clientsResponse.json(); // Hämta JSON-data
    console.log(roomData);
  
  });
  })


