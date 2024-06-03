import { Client, Databases, ID, Permission, Query, Role } from "appwrite";
import env from "@/lib/env";
import auth from "@/lib/appwrite/auth";
import { IExpense, IExpenseCategory, IIncome } from "@/lib/types";

interface CreateExpenseParams {
  title: string;
  amount: number;
  date: Date;
  type: string;
  category: string;
}

interface CreateIncomeParams {
  title: string;
  amount: number;
  date: Date;
}

interface CreateExpenseCategoryParams {
  title: string;
}

interface DeleteExpenseCategoryParams {
  id: string;
}

export class DatabaseServices {
  client = new Client();
  databases;

  constructor() {
    this.client.setEndpoint(env.awProjectUrl).setProject(env.awProjectId);
    this.databases = new Databases(this.client);
  }

  async _getRUDPermissions() {
    const user = await auth.getCurrentUser();
    if (!user) throw new Error("No user is authenticated to create income");

    return [
      Permission.delete(Role.user(user.$id)),
      Permission.update(Role.user(user.$id)),
      Permission.read(Role.user(user.$id)),
    ];
  }

  async createExpense({
    title,
    amount,
    category,
    type,
    date,
  }: CreateExpenseParams): Promise<IExpense> {
    try {
      const data = { title, amount, date, category, type };
      const permissions = await this._getRUDPermissions();

      return this.databases.createDocument(
        env.awDatabaseId,
        env.awExpenseCollectionId,
        ID.unique(),
        data,
        permissions,
      );
    } catch (error: any) {
      console.error("Appwrite :: createExpense() :: ", error);
      throw error;
    }
  }

  async getExpenses(queries?: string[]): Promise<IExpense[]> {
    try {
      const data = await this.databases.listDocuments(
        env.awDatabaseId,
        env.awExpenseCollectionId,
        [Query.orderDesc("date")].concat(queries && queries.length > 0 ? queries : []),
      );
      return data.documents as IExpense[];
    } catch (error: any) {
      console.error("Appwrite :: getExpenses() :: ", error);
      throw error;
    }
  }

  async createIncome({ title, amount, date }: CreateIncomeParams): Promise<IIncome> {
    try {
      const data = { title, amount, date };
      const permissions = await this._getRUDPermissions();

      return this.databases.createDocument(
        env.awDatabaseId,
        env.awIncomeCollectionId,
        ID.unique(),
        data,
        permissions,
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
        [Query.orderDesc("date")].concat(queries && queries.length > 0 ? queries : []),
      );
      return data.documents as IIncome[];
    } catch (error: any) {
      console.error("Appwrite :: getIncomes() :: ", error);
      throw error;
    }
  }

  async createExpenseCategory({ title }: CreateExpenseCategoryParams): Promise<IExpenseCategory> {
    try {
      const data = { title };
      const permissions = await this._getRUDPermissions();

      return this.databases.createDocument(
        env.awDatabaseId,
        env.awExpenseCategoryCollectionId,
        ID.unique(),
        data,
        permissions,
      );
    } catch (error: any) {
      console.error("Appwrite :: createExpenseCategory() :: ", error);
      throw error;
    }
  }

  async deleteExpenseCategory({ id }: DeleteExpenseCategoryParams): Promise<{}> {
    try {
      return await this.databases.deleteDocument(
        env.awDatabaseId,
        env.awExpenseCategoryCollectionId,
        id,
      );
    } catch (error: any) {
      console.log("Appwrite :: deleteExpenseCategory() :: ", error);
      throw error;
    }
  }

  async getExpenseCategories(queries?: string[]) {
    try {
      const data = await this.databases.listDocuments(
        env.awDatabaseId,
        env.awExpenseCategoryCollectionId,
        [Query.orderDesc("$createdAt")].concat(queries && queries.length > 0 ? queries : []),
      );
      return data.documents as IExpenseCategory[];
    } catch (error: any) {
      console.error("Appwrite :: getExpenseCategories() :: ", error);
      throw error;
    }
  }
}

const database = new DatabaseServices();
export default database;
