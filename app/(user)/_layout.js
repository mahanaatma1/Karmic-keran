import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Stack, useRouter, Tabs } from 'expo-router';
import { COLORS, SPACING, FONT, SHADOW } from '../../constants/Theme';
import ProfileButton from '../../components/ProfileButton';
import { useAuth } from '../../context/AuthContext';
import HorizontalTabs from '../../components/HorizontalTabs';
import Logo from '../../components/Logo';

export default function UserLayout() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const tabs = [
    'Book Consultation',
    'My Consultations',
    'Self Discovery',
    'Learn',
    'Ask Question'
  ];

  const handleTabPress = (index) => {
    setActiveTab(index);
    // Navigate to the corresponding screen
    const routes = [
      '(book-consultations)/book-consultation',
      '(my-consultation)/my-consultations',
      '(self-discovery)/self-discovery',
      '(learn)/learn',
      '(Ask-questions)/ask-question'
    ];
    router.push(`/(user)/${routes[index]}`);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleProfilePress = () => {
    router.push('/(user)/profile');
    setShowDropdown(false);
  };

  const handleSettingsPress = () => {
    router.push('/(user)/settings');
    setShowDropdown(false);
  };

  const handleQueriesPress = () => {
    router.push('/(user)/my-queries');
    setShowDropdown(false);
  };

  const handleLogout = () => {
    setShowDropdown(false);
    logout();
    router.replace('/auth-screen');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      
      {/* Hide the default Expo Router header */}
      <Stack.Screen options={{ 
        headerShown: false,
        animation: 'none'
      }} />
      
      {/* Header with extra padding to avoid status bar */}
      <View style={styles.statusBarPlaceholder} />
      
      {/* Header with profile button */}
      <View style={styles.header}>
        <View style={styles.logoWrapper}>
          <Logo size="medium" />
        </View>
        <View style={styles.headerRight}>
          <ProfileButton 
            onPress={toggleDropdown}
            imageUrl={user?.profilePic} 
          />
        </View>
      </View>

      {/* Profile dropdown */}
      {showDropdown && (
        <View style={styles.dropdownContainer}>
          <TouchableOpacity style={styles.dropdownItem} onPress={handleProfilePress}>
            <Text style={styles.dropdownText}>Profile and Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem} onPress={handleQueriesPress}>
            <Text style={styles.dropdownText}>My Queries</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem} onPress={handleLogout}>
            <Text style={styles.dropdownText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Horizontal tabs navigation */}
      <HorizontalTabs 
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />

      {/* Content area */}
      <View style={styles.content}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  statusBarPlaceholder: {
    height: StatusBar.currentHeight + 5,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    backgroundColor: COLORS.white,
    ...SHADOW.small,
    height: 70,
  },
  logoWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 0,
  },
  headerRight: {
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  dropdownContainer: {
    position: 'absolute',
    top: StatusBar.currentHeight + 75,
    right: SPACING.m,
    backgroundColor: COLORS.white,
    borderRadius: 4,
    ...SHADOW.medium,
    zIndex: 10,
    width: 200,
  },
  dropdownItem: {
    padding: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  dropdownText: {
    fontSize: FONT.size.m,
    color: COLORS.primaryText,
  },
}); 