import { Slot, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '../context/AuthContext';
import React from 'react';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <AuthProvider>
      <View style={{ flex: 1, backgroundColor: '#121212' }}>
        <StatusBar style="light" />
        <Stack 
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#121212' },
            animation: 'fade',
            animationDuration: 300,
            presentation: 'transparentModal',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        >
          <Stack.Screen 
            name="index" 
            options={{ 
              animation: 'fade',
              animationDuration: 400
            }} 
          />
          <Stack.Screen 
            name="landing" 
            options={{ 
              animation: 'fade',
              animationDuration: 400
            }} 
          />
          <Stack.Screen 
            name="auth-screen" 
            options={{ 
              animation: 'fade',
              animationDuration: 300,
              presentation: 'transparentModal',
              gestureEnabled: true
            }} 
          />
          <Stack.Screen 
            name="birth-location" 
            options={{ 
              animation: 'slide_from_right',
              animationDuration: 300
            }} 
          />
          <Stack.Screen 
            name="birth-chart" 
            options={{ 
              animation: 'slide_from_right',
              animationDuration: 300
            }} 
          />
          <Stack.Screen 
            name="(tabs)" 
            options={{ 
              animation: 'fade',
              animationDuration: 300
            }} 
          />
          <Stack.Screen 
            name="(admin)" 
            options={{ 
              animation: 'fade',
              animationDuration: 300
            }} 
          />
        </Stack>
      </View>
    </AuthProvider>
  );
} 