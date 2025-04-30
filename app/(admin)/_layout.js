import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, Platform, SafeAreaView } from 'react-native';
import { Stack, useRouter, usePathname } from 'expo-router';
import { COLORS, SPACING, FONT, SHADOW, SIZES } from '../../constants/Theme';
import ProfileButton from '../../components/ProfileButton';
import ProfileDropdown from '../../components/ProfileDropdown';
import { useAuth } from '../../context/AuthContext';
import HorizontalTabs from '../../components/HorizontalTabs';
import Logo from '../../components/Logo';
import Constants from 'expo-constants';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);

  // Tab routes
  const routes = [
    'schedule',
    'dashboard',
    'consultations',
    'post-blog',
    'admin-setting',
    'customer-queries',
    'admin-profile'
  ];

  // Tabs names
  const tabs = [
    'Schedule',
    'Dashboard',
    'Consultations',
    'Post Blog',
    'Admin Settng',
    'Customer Queries',
    'Profile'
  ];

  // Find active tab based on current path
  const getCurrentTabIndex = () => {
    const currentRoute = pathname.split('/').pop();
    const index = routes.findIndex(route => route === currentRoute);
    return index !== -1 ? index : 0; // Default to first tab if not found
  };
  
  const [activeTab, setActiveTab] = useState(0);
  
  // Update active tab when pathname changes
  useEffect(() => {
    setActiveTab(getCurrentTabIndex());
  }, [pathname]);

  const handleTabPress = (index) => {
    setActiveTab(index);
    // Navigate to the corresponding screen
    router.push(`/(admin)/${routes[index]}`);
  };

  const handleProfileSettings = () => {
    // Navigate to admin profile screen
    router.push('/(admin)/admin-profile');
  };

  const handleLogout = () => {
    logout();
    router.replace('/auth-screen');
  };

  // Calculate status bar height
  const statusBarHeight = Constants.statusBarHeight || 0;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      
      {/* Hide the default Expo Router header */}
      <Stack.Screen options={{ 
        headerShown: false,
        animation: 'none'
      }} />
      
      {/* Status bar placeholder */}
      <View style={[styles.statusBarPlaceholder, { height: statusBarHeight }]} />
      
      {/* Header with app logo and profile dropdown */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Logo size="medium" />
        </View>
        
        <View style={styles.headerRight}>
          <View style={styles.regionContainer}>
            <Text style={styles.countryCode}>UK</Text>
            <Text style={styles.flagEmoji}>🇬🇧</Text>
          </View>
          
          <ProfileDropdown 
            userName={user?.displayName || "Admin User"}
            userEmail={user?.email || "admin@example.com"}
            profileImage={user?.profilePic}
            onProfileSettings={handleProfileSettings}
            onLogout={handleLogout}
            countryCode="UK"
          />
        </View>
      </View>

      {/* Horizontal tabs navigation */}
      <HorizontalTabs 
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />

      {/* Content area - use headerMode: none to remove inner headers */}
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
    backgroundColor: COLORS.white,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.m,
    backgroundColor: COLORS.white,
    ...SHADOW.small,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoTextContainer: {
    marginLeft: SPACING.s,
  },
  logoTextPrimary: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: '#721C24', // Dark burgundy color for Karmic Keran brand
    lineHeight: 24,
  },
  logoTextSecondary: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: '#721C24', // Dark burgundy color for Karmic Keran brand
    lineHeight: 24,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  regionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.m,
    backgroundColor: COLORS.lightBackground,
    paddingHorizontal: SPACING.s,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radiusSmall,
  },
  countryCode: {
    fontSize: FONT.size.s,
    color: COLORS.primaryText,
    marginRight: SPACING.xs,
    fontWeight: FONT.weight.medium,
  },
  flagEmoji: {
    fontSize: FONT.size.m,
  },
  content: {
    flex: 1,
  }
}); 