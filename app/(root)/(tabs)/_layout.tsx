import icons from "@/constants/icons";
import { Tabs } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

// A reusable component for the tab icons
const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: any;
  title: string;
}) => {
  return (
    <View className="flex-1 mt-0.5 flex flex-col items-center">
      <Image
        source={icon}
        tintColor={focused ? "#0061FF" : "#666876"}
        resizeMode="contain"
        className="size-6"
      />
      <Text
        className={`${
          focused
            ? "text-primary-300 font-rubik-medium"
            : "text-black-200 font-rubik"
        } text-xs w-full text-center mt-1`}
      >
        {title}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopWidth: 1,
          borderTopColor: "#0061FF1A",
          minHeight: 70,
        },
      }}
    >
      {/* Tabs.Screen is used to create a tab. */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          ),
          // Purposely commenting out to see the difference between the default and the custom tabBarButton
          // tabBarButton: (props) => (
          //   <Pressable
          //     android_ripple={{ color: "transparent" }} // removes grey ripple found on the android devices when you click on the tabs
          //     onPress={props.onPress}
          //     onLongPress={props.onLongPress}
          //     style={props.style}
          //     accessibilityState={props.accessibilityState}
          //     accessibilityLabel={props.accessibilityLabel}
          //   >
          //     {props.children}
          //   </Pressable>
          // ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Explore" />
          ),
          tabBarButton: (props) => (
            <Pressable
              android_ripple={{ color: "transparent" }} // removes grey ripple found on the android devices when you click on the tabs
              onPress={props.onPress}
              onLongPress={props.onLongPress}
              style={props.style}
              accessibilityState={props.accessibilityState}
              accessibilityLabel={props.accessibilityLabel}
            >
              {props.children}
            </Pressable>
          ),
        }}
      />{" "}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Profile" />
          ),
          tabBarButton: (props) => (
            <Pressable
              android_ripple={{ color: "transparent" }} // removes grey ripple found on the android devices when you click on the tabs
              onPress={props.onPress}
              onLongPress={props.onLongPress}
              style={props.style}
              accessibilityState={props.accessibilityState}
              accessibilityLabel={props.accessibilityLabel}
            >
              {props.children}
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
