import { Tabs } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { palette, typography } from "@/constants/design-system";
import { supabase } from "@/lib/supabase";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: palette.accent,
        headerShown: true,
        headerStyle: { backgroundColor: palette.bg },
        headerShadowVisible: false,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => supabase.auth.signOut()}
            style={{
              marginRight: 16,
              borderWidth: 1,
              borderColor: palette.border,
              borderRadius: 20,
              padding: 6,
            }}
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
        name="Fridge/index"
        options={{
          title: "",
          headerLeft: () => (
            <Text style={{ marginLeft: 16, fontSize: 17, fontWeight: typography.weight.black, color: palette.textMuted, letterSpacing: 2 }}>
              MON FRIGO
            </Text>
          ),
          tabBarLabel: "Mon Frigo",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="refrigerator" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Recipes/index"
        options={{
          title: "Recettes",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="recipes" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Favorites/index"
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
