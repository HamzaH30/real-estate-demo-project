import icons from "@/constants/icons";
import images from "@/constants/images";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SignIn = () => {
  const handleLogin = () => {
    console.log("Login with Google");
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
