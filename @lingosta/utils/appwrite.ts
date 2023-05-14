import { Client, Account } from 'appwrite';

const client = new Client();

client
.setEndpoint('') 
.setProject('');

const account = new Account(client);

export { client, account };