import { settings } from "@/constants/data";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import React from "react";
import {
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// import { SafeAreaView } from "react-native"; The difference between SafeAreaView and SafeAreaView from react-native-safe-area-context is that SafeAreaView from react-native-safe-area-context is used to get the safe area of the device, while SafeAreaView from react-native is used to get the safe area of the device.
import { SafeAreaView } from "react-native-safe-area-context"; // This import is better as it takes android into consideration as well. iOS is fine with both. android only works well with this.

type SettingsItemProps = {
  title: string;
  icon: ImageSourcePropType;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
};

const SettingsItem = ({
  title,
  icon,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProps) => {
  return (
    <TouchableOpacity
      className="flex flex-row justify-between items-center py-3"
      onPress={onPress}
    >
      <View className="flex flex-row items-center gap-2">
        <Image source={icon} className="size-6" resizeMode="cover" />
        <Text
          className={`text-lg font-rubik-medium text-black-300 ${textStyle}`} // Able to pass in a custom text style if needed.
        >
          {title}
        </Text>
      </View>
      {showArrow && (
        <Image
          source={icons.rightArrow}
          className="size-5"
          resizeMode="cover"
        />
      )}
    </TouchableOpacity>
  );
};

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();

    // If the logout is successful, show a success message.
    if (result) {
      Alert.alert("Logout successful", "You have been logged out");

      // Important to refetch the user data after logging out. What will happen is that the user will be logged out, but the user data will not be updated immediately. So, the user will still be logged in. Therefore, we need to refetch the user data, so that the app realizes the user is logged out and then the user will be redirected to the login screen.
      refetch();
    } else {
      // If the logout is not successful, show an error message.
      Alert.alert(
        "Error",
        "An error occurred while logging out. Please try again."
      );
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7" // contentContainerClassName vs. className: contentContainerClassName is used to style the content of the ScrollView, while className is used to style the ScrollView itself.
      >
        <View className="flex flex-row justify-between items-center mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" resizeMode="cover" />
        </View>

        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={user?.avatar ? { uri: user.avatar } : images.avatar}
              className="size-44 relative rounded-full"
              resizeMode="cover"
            />

            {/* TouchableOpacity is a pressable component used to create custom buttons. 
    Unlike the default Button component, it allows full styling flexibility and can contain any content, like icons or text. */}
            <TouchableOpacity className="absolute bottom-11 right-2 rounded-full">
              <Image source={icons.edit} className="size-9 mb-2.5" />
            </TouchableOpacity>

            <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
            <Text className="text-sm text-gray-500 mt-1">{user?.email}</Text>
          </View>
        </View>

        {/* View for settings. with multiple list items. my booking, payments, profile, notification, security, language, help center, invite friends, and logout. */}
        {/* Each list item will have an icon, a title, and then an arrow to serve as a link to visit more info. */}
        <View className="flex flex-col mt-10">
          <SettingsItem title="My Bookings" icon={icons.calendar} />
          <SettingsItem title="Payments" icon={icons.wallet} />
          {/* <SettingsItem title="Profile" icon={icons.person} />
          <SettingsItem title="Notification" icon={icons.bell} />
          <SettingsItem title="Security" icon={icons.shield} />
          <SettingsItem title="Language" icon={icons.language} />
          <SettingsItem title="Help Centre" icon={icons.info} />
          <SettingsItem title="Invite Friends" icon={icons.people} />
          <SettingsItem
            title="Logout"
            icon={icons.logout}
            onPress={handleLogout}
            textStyle="text-red-500"
            showArrow={false}
          /> */}
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {settings.slice(2).map((item) => (
            <SettingsItem key={item.title} {...item} />
          ))}
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          <SettingsItem
            title="Logout"
            icon={icons.logout}
            onPress={handleLogout}
            textStyle="text-danger"
            showArrow={false}
          />
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          <Text className="text-lg font-rubik-medium text-black-300">
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
