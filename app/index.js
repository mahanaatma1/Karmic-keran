import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../constants/Theme';
import Logo from '../components/Logo';

export default function Index() {
  const { user, loading } = useAuth();

  // Show loading screen while checking auth
  if (loading) {
    return (
      <View style={styles.container}>
        <Logo size="large" />
        <Text style={styles.appName}>Karmic Keran</Text>
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
      </View>
    );
  }

  // Redirect to landing page for new users
  return <Redirect href="/landing" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.black,
    marginTop: 20,
    marginBottom: 30,
  },
  loader: {
    marginTop: 20,
  },
});