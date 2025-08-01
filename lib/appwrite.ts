import { Account, Client, Databases } from "react-native-appwrite";

export const COMPLETIONS_COLLECTION_ID = "6880e0df003596d595ee";

// ✅ Hardcoded — simple, safe, works everywhere
export const endpoint = "https://nyc.cloud.appwrite.io/v1";
export const project = "686fdc3d001f5d1b1d6d";

export const client = new Client()
  .setEndpoint(endpoint)
  .setProject(project);

export const account = new Account(client);

export const databases = new Databases(client);

export const DATABASE_ID = "687fa5b800066f876382";
export const HABITS_COLLECTION_ID = "687fa5fe002554e081f0";
  export interface RealtimeResponse {
    events: string[];
    payload: any;
  }
