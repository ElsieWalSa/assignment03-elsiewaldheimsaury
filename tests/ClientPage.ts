import { Page, Locator, expect } from "@playwright/test";
import { generateClientData } from "./testdata";
export class ClientPage{
    getClientCount() {
      throw new Error("Method not implemented.");
    }
    getItemCount(): number | PromiseLike<number> {
      throw new Error("Method not implemented.");
    }

    readonly page: Page;
    readonly CreateClientButton: Locator;
    readonly clientForm: Locator;
    readonly nameTextfield: Locator;
    readonly emailTextfield: Locator;
    readonly telephoneTextfield: Locator;
    readonly saveButton: Locator;
    readonly clientItems: Locator;

    constructor(page:Page) {
        this.page = page;
        this.nameTextfield = page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox');
        this.emailTextfield = page.locator('input[type="email"]');
        this.telephoneTextfield = page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox');
        this.saveButton = page.getByText('Save');
 
    }

    async createClient() {
        const clientData = generateClientData();
        console.log(clientData);
        
        // Click on create client -button
          await this.page.getByRole("link", { name: "Create Client" }).click();
          await this.page.waitForSelector("text=New Client");
       
          //   add clientdata
        await this.nameTextfield.fill(clientData.clientname);
        await this.emailTextfield.fill(clientData.clientemail);
        await this.telephoneTextfield.fill(clientData.clientphonenumber); 
        await this.saveButton.click();
        await expect(this.page.getByRole("heading", { name: "Clients" })).toBeVisible();
  
}

};