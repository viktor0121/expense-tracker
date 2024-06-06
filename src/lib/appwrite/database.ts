import { Client, Databases, ID, Permission, Query, Role } from "appwrite";
import env from "@/lib/env";
import auth from "@/lib/appwrite/auth";
import { IExpense, IExpenseCategory, IIncome, IOverallStats } from "@/lib/types";
import { EExpenseType } from "@/lib/enums";

type CreateUpdateExpenseParams =
  | {
      actionType: "add";
      id?: undefined;
      title: string;
      amount: number;
      date: Date;
      type: string;
      category: string;
    }
  | {
      actionType: "update";
      id: string;
      title?: string;
      amount?: number;
      date?: Date;
      type?: string;
      category?: string;
    };

type CreateUpdateIncomeParams =
  | {
      actionType: "add";
      id?: undefined;
      title: string;
      amount: number;
      date: Date;
    }
  | {
      actionType: "update";
      id: string;
      title?: string;
      amount?: number;
      date?: Date;
    };

interface CreateExpenseCategoryParams {
  title: string;
}

interface DeleteParams {
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

  async addUpdateExpense({
    actionType,
    id,
    title,
    amount,
    category,
    type,
    date,
  }: CreateUpdateExpenseParams): Promise<IExpense> {
    try {
      if (actionType === "update") {
        const data = {
          ...(title ? { title } : {}),
          ...(amount ? { amount } : {}),
          ...(date ? { date } : {}),
          ...(category ? { category } : {}),
          ...(type ? { type } : {}),
        };

        return this.databases.updateDocument(
          env.awDatabaseId,
          env.awExpenseCollectionId,
          id as string,
          data,
        );
      } else {
        const data = { title, amount, date, category, type };
        const permissions = await this._getRUDPermissions();

        return this.databases.createDocument(
          env.awDatabaseId,
          env.awExpenseCollectionId,
          ID.unique(),
          data,
          permissions,
        );
      }
    } catch (error: any) {
      console.error("Appwrite :: createExpense() :: ", error);
      throw error;
    }
  }

  async addUpdateIncome({
    actionType,
    id,
    title,
    amount,
    date,
  }: CreateUpdateIncomeParams): Promise<IIncome> {
    try {
      if (actionType === "update") {
        const data = {
          ...(title ? { title } : {}),
          ...(amount ? { amount } : {}),
          ...(date ? { date } : {}),
        };

        return this.databases.updateDocument(
          env.awDatabaseId,
          env.awIncomeCollectionId,
          id as string,
          data,
        );
      } else {
        const data = { title, amount, date };
        const permissions = await this._getRUDPermissions();

        return this.databases.createDocument(
          env.awDatabaseId,
          env.awIncomeCollectionId,
          ID.unique(),
          data,
          permissions,
        );
      }
    } catch (error: any) {
      console.error("Appwrite :: createIncome() :: ", error);
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

  async deleteExpense({ id }: DeleteParams): Promise<{}> {
    try {
      return await this.databases.deleteDocument(env.awDatabaseId, env.awExpenseCollectionId, id);
    } catch (error: any) {
      console.error("Appwrite :: deleteExpense() :: ", error);
      throw error;
    }
  }

  async deleteIncome({ id }: DeleteParams): Promise<{}> {
    try {
      return await this.databases.deleteDocument(env.awDatabaseId, env.awIncomeCollectionId, id);
    } catch (error: any) {
      console.error("Appwrite :: deleteIncome() :: ", error);
      throw error;
    }
  }

  async deleteExpenseCategory({ id }: DeleteParams): Promise<{}> {
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

  async getStatistics(): Promise<IOverallStats> {
    try {
      const expenses = await this.getExpenses([
        Query.select(["type", "amount"]),
        Query.limit(5000),
      ]);
      const incomes = await this.getIncomes([Query.select(["amount"]), Query.limit(5000)]);

      const totalNeeds = expenses
        .filter((expense) => expense.type === EExpenseType.Need)
        .reduce((acc, expense) => acc + expense.amount, 0);
      const totalWants = expenses
        .filter((expense) => expense.type === EExpenseType.Want)
        .reduce((acc, expense) => acc + expense.amount, 0);
      const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
      const totalSavings = totalIncome - totalNeeds - totalWants;

      return { totalSavings, totalIncome, totalNeeds, totalWants };
    } catch (error: any) {
      console.error("Appwrite :: getStatistics() :: ", error);
      throw error;
    }
  }
}

const database = new DatabaseServices();
export default database;
