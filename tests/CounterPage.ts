import { Page } from "@playwright/test";
import { generateClientData } from "./testdata";
export class CounterPage {
    readonly page: Page;
  
    constructor(page: Page) {
      this.page = page;
    }
    async countClients(): Promise<number> {
      const items = this.page.locator('[class="card client"]');
      const count = await items.count(); 
      console.log("Found clients:", count);  
      return count;
  }

}

  