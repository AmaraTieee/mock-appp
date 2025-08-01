import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

function RouteGuard({ children }: { children: React.ReactNode }) {
   const router = useRouter();
   const { user, isLoadingUser } = useAuth();
   const segments = useSegments()

  useEffect(() => {

    const inAuthGroup = segments[0] === "auth"
    const timeout = setTimeout(() => {
        if (!user && !inAuthGroup && !isLoadingUser) {
          router.replace("/auth");
        
        } else if (!user && inAuthGroup && isLoadingUser) {
          router.replace("/")
        }
      }, 0);
    return () => clearTimeout(timeout);
   
}, [user, segments]);
  
   return <>{children}</>;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <SafeAreaProvider>
          <PaperProvider>
            <RouteGuard>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown : false }}/>
              </Stack>
            </RouteGuard>
          </PaperProvider>
        </SafeAreaProvider>
      </AuthProvider>
    </GestureHandlerRootView>

  );
}
