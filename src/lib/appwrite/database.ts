import { Client, Databases } from "appwrite";
import env from "@/lib/env";

interface CreateExpenseParams {}

interface GetExpensesParams {}

interface CreateIncomeParams {}

interface GetIncomesParams {}

export class DatabaseServices {
  client = new Client();
  databases;

  constructor() {
    this.client.setEndpoint(env.awProjectUrl).setProject(env.awProjectId);
    this.databases = new Databases(this.client);
  }

  async createExpense({}: CreateExpenseParams) {}

  async getExpenses({}: GetExpensesParams) {}

  async createIncome({}: CreateIncomeParams) {}

  async getIncomes({}: GetIncomesParams) {}
}
export default new DatabaseServices();
