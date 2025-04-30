import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFF7ED',
        },
        headerTintColor: '#333333',
        headerTitleStyle: {
          fontFamily: 'Inter-Medium',
        },
        headerTitle: '', // Remove title display
        headerLeft: () => null, // Remove back button completely
        headerBackVisible: false, // Hide the default back button
        headerShadowVisible: false, // Remove the separation line/shadow
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="queries"
        options={{
          title: "",
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({}); 