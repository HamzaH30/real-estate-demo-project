import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="my-10 font-rubik-light text-3xl">
        Welcome to Real Estate App
      </Text>
      <Link href="/sign-in">Sign In</Link>
      <Link href="/explore">Explore</Link>
      <Link href="/profile">Profile</Link>
      <Link
        href={{
          pathname: "/properties/[id]",
          params: { id: "1" },
        }} // This is the same as just writing "/properties/1" as the href directly as a string
      >
        Property
      </Link>
    </View>
  );
}
