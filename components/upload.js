import { storage, ID } from '../conf/conf';

const uploadFile = async (fileUri) => {
    try {
        const file = await storage.createFile(
            config.storageId,
            ID.unique(),
            fileUri
        );
        console.log('File Uploaded:', file);
        return file;
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};