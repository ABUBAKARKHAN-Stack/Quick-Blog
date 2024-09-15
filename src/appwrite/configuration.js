import { Client, Databases, ID, Query } from "appwrite";
import config from "../ENV-Config/config"

export class AppwriteConfig {
    // Appwrite Config
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(config.AppwriteUrl)
            .setProject(config.AppwriteProjectId)
        this.databases = new Databases(this.client)
    }

    // Create Post 
    async createPost({ title, content, image, status, userID, slug, authorName , profileColor }) {
        if (!userID) console.log("User ID is missing or undefined");
     
        
        try {
            return await this.databases.createDocument(
                config.AppwriteDataBaseId,
                config.AppwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                    authorName,
                    profileColor,
                    userID
                }
            );
        } catch (error) {
            console.log("Appwrite service :: Create Post Error", error);
        }
    }

    // Update Post
    async updatePost(slug, { image, content, title, status }) {
        try {
            return await this.databases.updateDocument(
                config.AppwriteDataBaseId,
                config.AppwriteCollectionId,
                slug,
                {
                    image,
                    content,
                    title,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite service :: Update Post Error", error);
        }

    }

    // Delete Post
    async deletePost(slug) {
        try {
            return await this.databases.deleteDocument(
                config.AppwriteDataBaseId,
                config.AppwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: Delete Post Error", error);
        }
    }





    // Get Post 
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.AppwriteDataBaseId,
                config.AppwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: Get Post Error", error);
        }
    }


    // Get All Posts
    async getAllPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.AppwriteDataBaseId,
                config.AppwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: Get All Posts Error", error);
            return false
        }
    }
}

const configuration = new AppwriteConfig();
export default configuration;