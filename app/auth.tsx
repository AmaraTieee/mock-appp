import { useState } from "react";

import { useRouter } from "expo-router";

import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

import { useAuth } from "@/lib/auth-context";
import { Button, Text, TextInput, useTheme } from "react-native-paper";


export default function AuthScreen() {
    const theme = useTheme();
    const [isSignUp, setIsSignUp] = useState<boolean>(false);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const {signIn, signUp} = useAuth();

    const handleAuth = async () => {
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        setError(null);
        
        if (isSignUp) {
            const error = await signUp(email, password);
            if (error) {
                setError(error);
                return;
            }
            router.replace("/(tabs)");

        } else { 
            const error = await signIn(email, password);
            if (error) {
                setError(error);
                return;
            }
            router.replace("/(tabs)");

        }
        
    };

    const handleSwitchMode = () => {
        setIsSignUp((prev) => !prev);
    };


    return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
    > 
        <View style={styles.content}> 
            <Text style={styles.title} variant="headlineMedium"> 
                {isSignUp ? "Create Account" : "Welcome Back!"} </Text>
            <TextInput 
                autoCapitalize="none" 
                keyboardType="email-address" 
                placeholder="example@mail.com"
                mode="outlined"
                style={styles.input}
                onChangeText={setEmail}
            />

            <TextInput 
                autoCapitalize="none" 
                secureTextEntry
                placeholder="Type your password here..."
                mode="outlined"
                style={styles.input}
                onChangeText={setPassword}
            />

            {error && <Text style= {{ color: theme.colors.error }}> {error}</Text>}


            <Button mode="contained" style={styles.button} onPress={handleAuth}>
                {isSignUp ? "Sign Up" : "Sign in!"}</Button>

            <Button mode="text" onPress={handleSwitchMode} style={styles.switchModeButton}>{
            isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign up!"}</Button>
        </View>
    </KeyboardAvoidingView>   
    );
} 

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "#f5f5f5",
    },
    content: {
        flex: 1, 
        padding: 16,
        justifyContent: "center",
    },

    title: {
        textAlign: "center",
        marginBottom: 24,

    },
    input: {
        marginBottom: 16,
       
    },
    button: {
        marginTop: 8,

    },
    switchModeButton: {
        marginTop: 16,
        
    },
    
});
