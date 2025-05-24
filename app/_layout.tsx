import GlobalProvider from "@/lib/global-provider";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "./global.css";

export default function RootLayout() {
  // Load fonts. Defined in the app.json file.
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      // This is used to hide the splash screen after the fonts are loaded.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // This is used to prevent the app from crashing if the fonts are not loaded.
  if (!fontsLoaded) {
    return null;
  }

  // Stack is the default layout for the app. It contains the screens that are used in the app.
  return (
    <GlobalProvider>
      {/* This is used to hide the default header of the app. */}
      <Stack screenOptions={{ headerShown: false }} />
    </GlobalProvider>
  );
}
