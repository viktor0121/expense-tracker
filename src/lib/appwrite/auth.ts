import { Account, Client, ID, Models } from "appwrite";
import { IUser } from "@/lib/types";
import { ETheme } from "@/lib/enums";
import env from "../env";

interface CreateAccountParams {
  name: string;
  email: string;
  password: string;
}

interface UpdateNameParams {
  name: string;
}

interface UpdateEmailParams {
  email: string;
  password: string;
}

interface UpdatePhoneParams {
  phone: string;
  password: string;
}

interface UpdateThemePrefParams {
  theme: ETheme;
}

interface UpdateProfilePhotoPrefParams {
  photoFileId: string;
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

  async getCurrentUser(): Promise<IUser | null> {
    try {
      return await this.account.get();
    } catch (error: any) {
      // Random guest wil not be able to access account scope
      if (error.type !== "general_unauthorized_scope")
        console.log("Appwrite :: getCurrentUser() :: ", error);
      return null;
    }
  }

  async updateName({ name }: UpdateNameParams): Promise<IUser> {
    try {
      return await this.account.updateName(name);
    } catch (error: any) {
      console.error("Appwrite :: updateName() :: ", error);
      throw error;
    }
  }

  async updateEmail({ email, password }: UpdateEmailParams): Promise<IUser> {
    try {
      return await this.account.updateEmail(email, password);
    } catch (error: any) {
      console.error("Appwrite :: updateEmail() :: ", error);
      throw error;
    }
  }

  async updatePhone({ phone, password }: UpdatePhoneParams): Promise<IUser> {
    try {
      if (phone.charAt(0) !== "+") phone = `+${phone}`;
      return await this.account.updatePhone(phone, password);
    } catch (error: any) {
      console.error("Appwrite :: updatePhone() :: ", error);
      throw error;
    }
  }

  async updateThemePref({ theme }: UpdateThemePrefParams): Promise<IUser> {
    try {
      const preferences = await this.account.getPrefs();
      return await this.account.updatePrefs({ ...preferences, theme });
    } catch (error: any) {
      console.error("Appwrite :: updateThemePref() :: ", error);
      throw error;
    }
  }

  async getThemePref(): Promise<ETheme | null> {
    try {
      const preferences = await this.account.getPrefs();
      return preferences.theme || null;
    } catch (error: any) {
      console.error("Appwrite :: getThemePref() :: ", error);
      throw error;
    }
  }

  async updateProfilePhotoIdPref({ photoFileId }: UpdateProfilePhotoPrefParams): Promise<IUser> {
    try {
      const preferences = await this.account.getPrefs();
      return await this.account.updatePrefs({ ...preferences, photoFileId });
    } catch (error: any) {
      console.error("Appwrite :: updateProfilePhotoPref() :: ", error);
      throw error;
    }
  }

  async getProfilePhotoIdPref(): Promise<string | null> {
    try {
      const preferences = await this.account.getPrefs();
      return preferences.photoFileId || null;
    } catch (error: any) {
      console.error("Appwrite :: getProfilePhotoPref() :: ", error);
      throw error;
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
