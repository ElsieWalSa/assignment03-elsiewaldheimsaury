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
    test("Test case 01, log in", async ({ page }) => {
      const loginPage = new LoginPage(page);
      const dashboardPage = new DashboardPage(page);
    
      await page.goto('http://localhost:3000/login');
      await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
      
});
test("Test case 02, count clients", async ({ page }) => {
  const clientPage = new ClientPage(page);
  const clientData = generateClientData();
  const counterPage = new CounterPage(page);

  await page.goto('http://localhost:3000/login');
  await expect(
    page.getByRole("heading", { name: "Tester Hotel Overview" }),
  ).toBeVisible();

  // click on clients view
  await page.locator("#app > div > div > div:nth-child(2) > a").click();

  await counterPage.countClients();
 
});


// test.describe('Backend tests', () => {
//   test('has title', async ({ page }) => {
//     await page.goto('http://localhost:3000');
  
//   });
  // })


