import { Client, Account, ID } from "appwrite";
import config from "../ENV-Config/config"

export class AppwriteAuth {
    // Appwrite Auth Service
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.AppwriteUrl)
            .setProject(config.AppwriteProjectId)
        this.account = new Account(this.client);
    }

    // Create User
    async createUser({ email, password, name }) {
        try {
            const userData = await this.account.create(ID.unique(), email, password, name);
            if (userData) {
                return this.loginUser({ email, password});
            } else {
                return userData;
            }
        } catch (error) {
            console.log("Appwrite Service :: Create User Error: ", error);
            throw new Error(error);
        }
    }

    // Login User 
    async loginUser({ email, password}) {
        try {
            const userData = await this.account.createEmailPasswordSession(email, password);
            return userData
        } catch (error) {
            console.log("Appwrite Service :: Login Error: ", error);
            throw new Error(error);
        }
    }

    // GetCurrentUser
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite Service :: Get Current User Error: ", error);
            return null;
        }
    }

    // Logout User
    async logoutUser() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite Service :: Logout Error: ", error);
            return null;
        }
    }


}

const authService = new AppwriteAuth()
export default authService