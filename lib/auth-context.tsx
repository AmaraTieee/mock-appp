import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account, client } from "./appwrite";

type AuthContextType = {
    user: Models.User<Models.Preferences> | null;
    isLoadingUser: boolean;
    signUp: (email: string, password: string) => Promise<string | null>;
    signIn: (email: string, password: string) => Promise<string | null>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

    useEffect (() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const session = await account.get();
            setUser(session);
        } catch (error) {
            setUser(null)
        } finally {
            setIsLoadingUser(false);
        }
    };


    const signUp = async (email: string, password: string) => {
        try {
            await account.create(ID.unique(), email, password);
            return await signIn(email, password); // handles JWT + user
        } catch (error) {
            if (error instanceof Error) {
                return error.message;
            }
            return "An unknown error occurred during Sign Up.";
        }
    };
    const signIn = async (email: string, password: string) => {
        try {
            // Create the session first (necessary to generate a JWT)
            await account.createEmailPasswordSession(email, password);

            // Get JWT and set it to the Appwrite client
            const jwtResponse = await account.createJWT();
            const jwt = jwtResponse.jwt;
            client.setJWT(jwt); // Critical step

            // Now that JWT is attached, you can safely fetch the user
            const userAccount = await account.get();
            setUser(userAccount);

            return null;
        } catch (error: any) {
            console.error("SignIn error:", error);
            if (error instanceof Error) {
                return error.message;
            }
            return "An unknown error occurred during Sign In.";
        }
    };

    const signOut = async () => {
        try {
            await account.deleteSession("current");
            setUser(null);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };
    

    return (
    <AuthContext.Provider value={{ isLoadingUser, user, signUp, signIn, signOut }}> 
        {children} 
    </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}