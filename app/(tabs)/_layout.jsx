// app/(tabs)/_layout.jsx
import React from "react";
import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  return (
    <>
      {/* <StatusBar style= "auto" /> */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#f0f0f0",
          },
          tabBarActiveTintColor: "#000000",
          tabBarInactiveTintColor: "#888888",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons name="home" size={24} color="black" />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: () => (
              <FontAwesome5 name="user-circle" size={24} color="black" />
            ),
          }}
        />
        <Tabs.Screen
          name="bookings"
          options={{
            tabBarIcon: () => (
              <AntDesign name="adduser" size={24} color="black" />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
