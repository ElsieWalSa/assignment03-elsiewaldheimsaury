import { test, expect, APIRequestContext, request } from '@playwright/test';
import { generateClientData } from "./testdata";
import { ClientPage } from './ClientPage';
import { CounterPage } from './CounterPage';
import { config } from "dotenv";
import { faker } from "@faker-js/faker";
import { LoginPage } from './login-page';
import { DashboardPage } from './dashboard-page';
import { generateUserData, generateRoomData, generateBillData, generateReservationData, generateDates} from './testdata'; 
import { APIHelper } from './apiHelpers';

import dotenv from 'dotenv';
dotenv.config();

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

  let apiHelper: APIHelper;
  let xUserAuth: { 'x-user-auth': string };

  test.beforeEach(async () => {
    apiHelper = new APIHelper(); // Initiera APIHelper här

    const LOGIN_URL = 'http://localhost:3000/api/login';
    console.log(LOGIN_URL);

    // Get login
    const loginCredentials = {
      'username': `${process.env.TEST_USERNAME}`,
      'password': `${process.env.TEST_PASSWORD}`
    };
    const context = await request.newContext();  
    const response = await context.post(LOGIN_URL, {
      data: loginCredentials,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok()) {
      console.error(`Login request failed with status: ${response.status()}`);
      return; 
    }
    const json = await response.json();
    xUserAuth = {
      'x-user-auth': `{ "username": "tester01", "token": "${json.token}" }`
    };
  });

  test('Test case 01 - Get all roomposts - v2', async ({ request }) => {
    
    const roomResponse = await request.get('http://localhost:3000/api/rooms', {
      headers: xUserAuth
    });
    
    expect(roomResponse.ok()).toBeTruthy();
    
    const roomData = await roomResponse.json();
    console.log(roomData);

    const getPosts = await apiHelper.getAllRoomPosts(request);
    expect(getPosts.ok()).toBeTruthy(); 
  });

  test('Test case 02 - Get all clients', async ({ request }) => {
    const clientsResponse = await request.get('http://localhost:3000/api/clients', {
      headers: xUserAuth
    }); 
    expect(clientsResponse.ok()).toBeTruthy();
    const clientData = await clientsResponse.json();
    console.log(clientData);
    const getClients = await apiHelper.getAllClients(request);
    expect(getClients.ok()).toBeTruthy(); 
  });
});