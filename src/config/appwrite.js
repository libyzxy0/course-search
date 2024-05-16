import { Client, Account, Databases } from "appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectID: "66407c3a0031ab0dffd8",
  databaseID: "66459ba7000963464cc7",
  courseCollectionID: "66459bca0010031fef44",
};

const client = new Client();

client.setEndpoint(config.endpoint).setProject(config.projectID);

export const account = new Account(client);
export const databases = new Databases(client);

export default client;
