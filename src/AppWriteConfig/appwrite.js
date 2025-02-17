import { Client, Account, ID, Databases } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('67a1c369000c28cb062d'); 

const account = new Account(client);
const databases = new Databases(client);

// Signup function
export const signUp = async (email, password) => {
    try {
        const response = await account.create(ID.unique(), email, password);
        console.log("Signup Success:", response);
        return response;
    } catch (error) {
        console.error("Signup Error:", error);
        throw error;
    }
};

// Login function
export const login = async (email, password) => {
    try {
        const response = await account.createEmailPasswordSession(email, password);
        console.log("Login Success:", response);
        return response;
    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
};
