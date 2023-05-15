import { Client, Account } from 'appwrite';

const client = new Client();

client
.setEndpoint('https://cloud.appwrite.io/v1') 
.setProject(process.env.WRITEAPP_PROJECT_ID);

const account = new Account(client);

export { client, account };