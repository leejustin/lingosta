import { Client, Databases, Account } from 'appwrite';

if (!process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
    throw new Error('Must include Appwrite project id');
}
  

const client = new Client();

client
.setEndpoint(process.env.NEXT_PUBLIC_API_ENDPOINT)
.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);
const database = new Databases(client);

export { client, database, account };