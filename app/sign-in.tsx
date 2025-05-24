import icons from "@/constants/icons";
import images from "@/constants/images";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SignIn = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext();

  // If the user is logged in, redirect to the home screen
  if (!loading && isLoggedIn) {
    return <Redirect href="/" />;
  }

  // Async function because login is an async function, since it's an API call to Appwrite.
  const handleLogin = async () => {
    const result = await login(); // login() is an async function that we made in appwrite.ts. It returns a boolean.

    // If the login is successful, refetch the user to get the latest user data and update the global state
    if (result) {
      refetch(); // refetch the user to get the latest user data and update the global state
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="h-2/3 w-full"
          resizeMode="contain"
        />
        <View className="bg-white px-11">
          <Text className="text-center font-rubik-light">
            Welcome to Real Estate App
          </Text>
          <Text className="mt-2 text-center text-2xl font-rubik-bold capitalize">
            Where your <Text className="text-primary-300">dream home</Text>{" "}
            awaits
          </Text>
          <Text className="mt-16 text-center text-lg font-rubik text-black">
            Login with Google
          </Text>

          <TouchableOpacity // The "button" component in web dev
            onPress={handleLogin}
            className="mt-5 flex-row items-center justify-center gap-x-2 rounded-full bg-white shadow-md shadow-zinc-500 py-4"
          >
            <Image
              source={icons.google} // Note. different from 'src' in web dev
              className="h-5 w-5"
              resizeMode="contain"
            />
            <Text className="ml-2 text-lg font-rubik-medium">
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
