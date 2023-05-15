import { Client, Account } from 'appwrite';

const client = new Client();

client
.setEndpoint('https://cloud.appwrite.io/v1') 
.setProject('646057dd81245323769b');

const account = new Account(client);

export { client, account };