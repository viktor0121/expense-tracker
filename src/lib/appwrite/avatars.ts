import { Avatars, Client } from "appwrite";
import env from "@/lib/env";

export class AvatarsService {
  client = new Client();
  avatars;

  constructor() {
    this.client.setEndpoint(env.awProjectUrl).setProject(env.awProjectId);
    this.avatars = new Avatars(this.client);
  }
}

export default new AvatarsService();
