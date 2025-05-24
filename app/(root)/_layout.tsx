import { useGlobalContext } from "@/lib/global-provider";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, SafeAreaView } from "react-native";

export default function AppLayout() {
  const { isLoggedIn, loading } = useGlobalContext();

  if (loading) {
    // This is used to show a loading screen while the user is logged in.
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator className="text-primary-300" size="large" />
      </SafeAreaView>
    );
  }

  if (!isLoggedIn) {
    // This is used to redirect the user to the sign-in screen if they are not logged in.
    return <Redirect href="/sign-in" />;
  }

  return <Slot />; // Slot renders whatever the active route's screen is here inside a layout.
}
