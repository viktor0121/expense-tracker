import { Client, Databases, ID, Permission, Query, Role } from "appwrite";
import env from "@/lib/env";
import auth from "@/lib/appwrite/auth";
import { IIncome } from "@/lib/types";

interface CreateExpenseParams {}

interface GetExpensesParams {
  queries?: string[];
}

interface CreateIncomeParams {
  title: string;
  amount: number;
  date: Date;
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

  async createIncome({ title, amount, date }: CreateIncomeParams) {
    try {
      const user = await auth.getCurrentUser();
      if (!user) throw new Error("No user is authenticated to create income");

      return this.databases.createDocument(
        env.awDatabaseId,
        env.awIncomeCollectionId,
        ID.unique(),
        {
          title,
          amount,
          date,
        },
        [
          Permission.delete(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.read(Role.user(user.$id)),
        ],
      );
    } catch (error: any) {
      console.error("Appwrite :: createIncome() :: ", error);
      throw error;
    }
  }

  async getIncomes(queries?: string[]): Promise<IIncome[]> {
    try {
      const data = await this.databases.listDocuments(
        env.awDatabaseId,
        env.awIncomeCollectionId,
        [Query.orderDesc("$createdAt")].concat(queries && queries.length > 0 ? queries : []),
      );
      return data.documents as IIncome[];
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
