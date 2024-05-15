import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66407c3a0031ab0dffd8");

export const account = new Account(client);

export default client;
