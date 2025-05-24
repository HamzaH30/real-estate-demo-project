import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";

export const config = {
    platform: "com.hamza.realestateapp",
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PUBLIC_ID,
};

export const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!);

export const avatar = new Avatars(client); // Manages user avatars for profile icons (e.g., initials, flags, etc.)
export const account = new Account(client); // Manages user accounts for login, signup, etc.

// 'Action' is a function that is used to login the user
export async function login() {
    try {
        // This is the URI that Appwrite will redirect to after the user logs in (so, this is the root path of the app)
        const redirectURI = Linking.createURL("/"); // home page

        // Generate a token for the user to login with
        // Starts an OAuth login flow with Google and redirects to the redirectURI once the user is logged in and done
        const response = await account.createOAuth2Token(
            OAuthProvider.Google,
            redirectURI // Tells it to open the broswer and send it to this URL upon success.
        );

        // If the token is not created, throw an error
        if (!response) {
            throw new Error("Failed to login. Failed to create OAuth2 token");
        }

        // Open the login page in the browser
        // This is a native modal that opens the browser to the Appwrite login page
        // Once the user is logged in and done, they will be redirected to the redirectURI
        const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectURI // This is the URI for Expo to know that when the browser hits this URI, it should redirect to the home page
        );

        // If the browser result is not a success, throw an error
        if (browserResult.type !== "success") {
            throw new Error("Failed to login. Failed to open browser");
        }

        // Parse the URL to get the secret and userId
        const url = new URL(browserResult.url);
        const secret = url.searchParams.get("secret")?.toString();
        const userId = url.searchParams.get("userId")?.toString();

        // If the secret or userId is not found, throw an error
        if (!secret || !userId) {
            throw new Error("Failed to login. Failed to get secret or userId");
        }

        // Create a session for the user
        // A session is a way to authenticate the user.
        // It is created by passing the userId and secret to the account.createSession method
        // This method returns a session object that contains the sessionId, userId, and expiration date
        // The sessionId is used to authenticate the user for the duration of the session
        // So this session is only created once the user is logged in and ready to use the app
        const session = await account.createSession(userId, secret);

        // If the session is not created, throw an error
        if (!session) {
            throw new Error("Failed to login. Failed to create session");
        }

        // Return true if the user is logged in
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function logout() {
    try {
        // Delete the current session
        // "current" is a keyword that tells Appwrite to delete the session of the currently logged in user
        await account.deleteSession("current");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// 'Action' is a function that is used to get the user
export async function getUser() {
    try {
        // Get the user
        const response = await account.get();

        // If the user is found, return the user
        if (response["$id"]) { // or response.$id
            // Get the user's avatar
            const userAvatar = avatar.getInitials(response.name);

            // Return the user with the avatar
            return {
                ...response,
                avatar: userAvatar.toString(),
            };
        }

        // If the user is not found, return null
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
