import { Client, Account } from 'appwrite';

if (!process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
    throw new Error('Must include Appwrite project id');
}
  

const client = new Client();

client
.setEndpoint('https://cloud.appwrite.io/v1') 
.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);

export { client, account };