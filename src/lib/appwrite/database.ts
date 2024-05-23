import { Client, Databases } from "appwrite";
import env from "@/lib/env";

interface CreateExpenseParams {}

interface GetExpensesParams {
  queries?: string[];
}

interface CreateIncomeParams {}

interface GetIncomesParams {
  queries?: string[];
}

interface CreateExpenseCategoryParams {}

interface GetExpenseCategoriesParams {
  queries?: string[];
}

export class DatabaseServices {
  client = new Client();
  databases;

  constructor() {
    this.client.setEndpoint(env.awProjectUrl).setProject(env.awProjectId);
    this.databases = new Databases(this.client);
  }

  async createExpense({}: CreateExpenseParams) {
    try {
    } catch (error: any) {
      console.error("Appwrite :: createExpense() :: ", error);
      throw error;
    }
  }

  async getExpenses({ queries }: GetExpensesParams) {
    try {
    } catch (error: any) {
      console.error("Appwrite :: getExpenses() :: ", error);
      throw error;
    }
  }

  async createIncome({}: CreateIncomeParams) {
    try {
    } catch (error: any) {
      console.error("Appwrite :: createIncome() :: ", error);
      throw error;
    }
  }

  async getIncomes({ queries }: GetIncomesParams) {
    try {
    } catch (error: any) {
      console.error("Appwrite :: getIncomes() :: ", error);
      throw error;
    }
  }

  async createExpenseCategory({}: CreateExpenseCategoryParams) {
    try {
    } catch (error: any) {
      console.error("Appwrite :: createExpenseCategory() :: ", error);
      throw error;
    }
  }

  async getExpenseCategories({ queries }: GetExpenseCategoriesParams) {
    try {
    } catch (error: any) {
      console.error("Appwrite :: getExpenseCategories() :: ", error);
      throw error;
    }
  }
}
export default new DatabaseServices();
