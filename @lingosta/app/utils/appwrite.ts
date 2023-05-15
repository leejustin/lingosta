import { Client, Account } from 'appwrite';

const client = new Client();

client
.setEndpoint('https://cloud.appwrite.io/v1') 
.setProject('6461987b4abe9e3e3016');

const account = new Account(client);

export { client, account };