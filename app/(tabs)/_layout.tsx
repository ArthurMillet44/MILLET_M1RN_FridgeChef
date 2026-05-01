import { Tabs } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { palette } from "@/constants/design-system";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { supabase } from "@/lib/supabase";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        headerStyle: { backgroundColor: palette.bg },
        headerShadowVisible: false,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => supabase.auth.signOut()}
            style={{ marginRight: 16 }}
          >
            <IconSymbol
              size={24}
              name="rectangle.portrait.and.arrow.right"
              color={palette.textMuted}
            />
          </TouchableOpacity>
        ),
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="fridge"
        options={{
          title: "Mon Frigo",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="refrigerator" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: "Recettes",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="recipes" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favoris",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="heart" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
