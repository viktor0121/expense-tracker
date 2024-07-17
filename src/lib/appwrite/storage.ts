import { Client, ID, ImageGravity, Permission, Role, Storage } from "appwrite";
import { auth } from "@/lib/appwrite/auth";
import { env } from "@/lib/env";

// PROFILE PHOTO
interface CreateProfilePhotoParams {
  file: File;
}

interface GetProfilePhotoUrlParams {
  photoId: string;
}

interface DeleteProfilePhotoParams {
  photoId: string;
}

// GOAL PHOTO
interface CreateGoalPhotoParams extends CreateProfilePhotoParams {}

interface GetGoalPhotoUrlParams extends GetProfilePhotoUrlParams {}

interface DeleteGoalPhotoParams extends DeleteProfilePhotoParams {}

export class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client.setEndpoint(env.awProjectUrl).setProject(env.awProjectId);
    this.storage = new Storage(this.client);
  }

  async _getUDPermissions() {
    const user = await auth.getCurrentUser();
    if (!user) throw new Error("No user is authenticated to perform action");

    return [Permission.delete(Role.user(user.$id)), Permission.update(Role.user(user.$id))];
  }

  // PROFILE PHOTO
  async createProfilePhoto({ file }: CreateProfilePhotoParams): Promise<string> {
    try {
      const permissions = await this._getUDPermissions();
      const photo = await this.storage.createFile(env.awProfilePhotoStorageId, ID.unique(), file, permissions);
      return photo.$id;
    } catch (error: any) {
      console.error("Appwrite :: createProfilePhoto() :: ", error);
      throw error;
    }
  }

  async deleteProfilePhoto({ photoId }: DeleteProfilePhotoParams): Promise<void> {
    try {
      await this.storage.deleteFile(env.awProfilePhotoStorageId, photoId);
    } catch (error: any) {
      console.error("Appwrite :: deleteProfilePhoto() :: ", error);
      throw error;
    }
  }

  getProfilePhotoUrl({ photoId }: GetProfilePhotoUrlParams): string {
    try {
      const url: URL = this.storage.getFilePreview(
        env.awProfilePhotoStorageId,
        photoId,
        2000,
        2000,
        ImageGravity.Top,
        100,
      );
      return url.toString();
    } catch (error: any) {
      console.error("Appwrite :: getProfilePhotoUrl() :: ", error);
      throw error;
    }
  }

  // GOAL PHOTO
  async createGoalPhoto({ file }: CreateGoalPhotoParams): Promise<string> {
    try {
      const permissions = await this._getUDPermissions();
      const photo = await this.storage.createFile(env.awGoalPhotoStorageId, ID.unique(), file, permissions);
      return photo.$id;
    } catch (error: any) {
      console.error("Appwrite :: createGoalPhoto() :: ", error);
      throw error;
    }
  }

  async deleteGoalPhoto({ photoId }: DeleteGoalPhotoParams): Promise<void> {
    try {
      await this.storage.deleteFile(env.awGoalPhotoStorageId, photoId);
    } catch (error: any) {
      console.error("Appwrite :: deleteGoalPhoto() :: ", error);
      throw error;
    }
  }

  getGoalPhotoUrl({ photoId }: GetGoalPhotoUrlParams): string {
    try {
      const url: URL = this.storage.getFilePreview(
        env.awGoalPhotoStorageId,
        photoId,
        800,
        800,
        ImageGravity.Center,
        100,
      );
      return url.toString();
    } catch (error: any) {
      console.error("Appwrite :: getGoalPhotoUrl() :: ", error);
      throw error;
    }
  }
}

export const storage = new StorageService();
