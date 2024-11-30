// app/_layout.jsx
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Load the tabs layout */}
      <Stack.Screen name="index"  />
      <Stack.Screen name="(tabs)"  />
    </Stack>
  );
};

export default RootLayout;