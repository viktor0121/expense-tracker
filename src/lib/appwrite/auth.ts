import { Account, Client, ID, Models } from "appwrite";
import env from "../env";

interface CreateAccountParams {
  name: string;
  email: string;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(env.awProjectUrl).setProject(env.awProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ name, email, password }: CreateAccountParams): Promise<Models.Session> {
    try {
      const newAccount = await this.account.create(ID.unique(), email, password, name);
      if (!newAccount) throw new Error("Failed to create account");

      const session = this.signInWithEmail({ email, password });
      if (!session) throw new Error("Failed to login to account");

      return session;
    } catch (error: any) {
      console.error("Appwrite :: createAccount() :: ", error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<Models.User<Models.Preferences> | null> {
    try {
      return await this.account.get();
    } catch (error: any) {
      console.log("Appwrite :: getCurrentUser() :: ", error);
      return null;
    }
  }

  async signInWithEmail({ email, password }: LoginParams): Promise<Models.Session> {
    try {
      const session = await this.account.createEmailPasswordSession(email, password);
      if (!session) throw new Error("Failed to login to account");
      return session;
    } catch (error: any) {
      console.error("Appwrite :: signInWithEmail() :: ", error);
      throw error;
    }
  }

  async signOut(): Promise<{}> {
    try {
      return await this.account.deleteSessions();
    } catch (error: any) {
      console.error("Appwrite :: logout() :: ", error);
      throw error;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser();
      return Boolean(data);
    } catch (error: any) {
      return false;
    }
  }
}

export default new AuthService();
