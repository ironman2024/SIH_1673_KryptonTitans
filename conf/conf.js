import { Client, Account, Databases, Storage, ID } from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    projectId: '66f45e760006747235eb',
    databaseId: '66f4635400288d656c4d',
    storageId: '66f465130001e7674299'
}

const client = new Client();

client
    .setEndpoint(config.endpoint) // Appwrite API endpoint
    .setProject(config.projectId) // Appwrite project ID
;

// Create instances of the Account, Databases, and Storage services
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Export these to be used in your components
export { client, account, databases, storage };



// endpoint: "https://cloud.appwrite.io/v1", 
// platform: 'com.folder.aicrop', 
// projectId: '66f45e760006747235eb', 
// databaseId: '66f4631800059e4a165f', 
// collectionId: '66f4635400288d656c4d', 
// storageId: '66f465130001e7674299' 