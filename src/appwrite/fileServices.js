import { Client, Storage, ID, ImageFormat, ImageGravity } from "appwrite";
import config from "../ENV-Config/config"

export class AppwriteFileServices {
    // Appwrite File Services
    client = new Client();
    storage;

    constructor() {
        this.client
            .setEndpoint(config.AppwriteUrl)
            .setProject(config.AppwriteProjectId)
        this.storage = new Storage(this.client);
    }

    // Upload File
    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.AppwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: Upload File Error", error);
            return null;
        }
    }

    // Delete File
    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(
                config.AppwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite service :: Delete File Error", error);
            return null;
        }
    }

    // Get File Preview
    getFilePreview(fileId) {
        try {
            return this.storage.getFilePreview(
                config.AppwriteBucketId,
                fileId,
            );
        } catch (error) {
            console.log("Appwrite service :: Get File Preview Error", error);
            return null;
        }
    }

    // Download File
    async downloadFile(fileId) {
        try {
            // Fetch the file download response
            const response = await this.storage.getFileDownload(
                config.AppwriteBucketId,
                fileId
            );

            // // Check if response contains href for download
            if (response && response.href) {
                // Create an anchor element to trigger the download
                const a = document.createElement('a');
                a.href = response.href;
                a.download = 'filename'; // Optionally set the filename here
                document.body.appendChild(a);
                a.click();

                // Clean up
                document.body.removeChild(a);
            } else {
                console.error("Expected a valid href in the response, but received:", response);
            }
        } catch (error) {
            console.error("Appwrite service :: Download File Error", error);
        }
    }



}

const fileService = new AppwriteFileServices();
export default fileService;