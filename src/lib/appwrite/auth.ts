import { Account, Client, ID } from "appwrite";
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

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser();
      return Boolean(data);
    } catch (error: any) {
      return false;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error: any) {
      console.log("Appwrite :: getCurrentUser() :: ", error);
      throw error;
    }
    // TODO: return null may be needed
  }
}

export default new AuthService();
