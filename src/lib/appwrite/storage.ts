import { Client, ID, ImageGravity, Storage } from "appwrite";
import env from "@/lib/env";

interface CreateProfilePhotoParams {
  file: File;
}

interface GetProfilePhotoUrlParams {
  photoId: string;
}

interface DeleteProfilePhotoParams {
  photoId: string;
}

export class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client.setEndpoint(env.awProjectUrl).setProject(env.awProjectId);
    this.storage = new Storage(this.client);
  }

  async createProfilePhoto({ file }: CreateProfilePhotoParams): Promise<string> {
    try {
      const photo = await this.storage.createFile(env.awProfilePhotoStorageId, ID.unique(), file);
      return photo.$id;
    } catch (error: any) {
      console.error("Appwrite :: uploadProfilePhoto() :: ", error);
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

  async deleteProfilePhoto({ photoId }: DeleteProfilePhotoParams): Promise<void> {
    try {
      await this.storage.deleteFile(env.awProfilePhotoStorageId, photoId);
    } catch (error: any) {
      console.error("Appwrite :: deleteProfilePhoto() :: ", error);
      throw error;
    }
  }
}

export const storage = new StorageService();
