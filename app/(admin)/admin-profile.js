import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Alert } from 'react-native';
import { COLORS, SPACING, FONT } from '../../constants/Theme';
import { useAuth } from '../../context/AuthContext';

// Import profile section components
import ProfilePhotoSection from '../../components/profile/ProfilePhotoSection';
import PersonalInfoSection from '../../components/profile/PersonalInfoSection';
import BirthDetailsSection from '../../components/profile/BirthDetailsSection';
import SecuritySection from '../../components/profile/SecuritySection';

export default function AdminProfileScreen() {
  const { user } = useAuth();
  
  // Mock admin data - in a real app, this would come from user context or API
  const [adminData, setAdminData] = useState({
    name: 'Admin',
    email: 'admin@karmickeran.com',
    gender: 'Not specified',
    birthDate: '',
    birthTime: '',
    birthLocation: '',
    profilePhoto: user?.profilePic || null
  });

  // Handler functions for user interactions
  const handleUploadPhoto = () => {
    Alert.alert('Upload Photo', 'Photo upload functionality would be implemented here');
  };

  const handleEditName = () => {
    Alert.alert('Edit Name', 'Name edit functionality would be implemented here');
  };

  const handleEditGender = () => {
    Alert.alert('Edit Gender', 'Gender selection functionality would be implemented here');
  };

  const handleEditBirthDate = () => {
    Alert.alert('Edit Birth Date', 'Date picker would be implemented here');
  };

  const handleEditBirthTime = () => {
    Alert.alert('Edit Birth Time', 'Time picker would be implemented here');
  };

  const handleEditBirthLocation = () => {
    Alert.alert('Edit Birth Location', 'Location selection would be implemented here');
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'Password change functionality would be implemented here');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Profile & Settings</Text>
        <Text style={styles.subtitle}>Manage your admin account settings and preferences</Text>
      </View>
      
      <View style={styles.sectionsContainer}>
        {/* Profile Photo Section */}
        <ProfilePhotoSection 
          photoUrl={adminData.profilePhoto}
          onUploadPhoto={handleUploadPhoto}
        />
        
        {/* Personal Information Section */}
        <PersonalInfoSection 
          name={adminData.name}
          email={adminData.email}
          gender={adminData.gender}
          onEditName={handleEditName}
          onEditGender={handleEditGender}
        />
        
        {/* Birth Details Section */}
        <BirthDetailsSection 
          birthDate={adminData.birthDate}
          birthTime={adminData.birthTime}
          birthLocation={adminData.birthLocation}
          onEditDate={handleEditBirthDate}
          onEditTime={handleEditBirthTime}
          onEditLocation={handleEditBirthLocation}
        />
        
        {/* Security Section */}
        <SecuritySection 
          onChangePassword={handleChangePassword}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.l,
    paddingBottom: SPACING.m,
  },
  title: {
    fontSize: FONT.size.xl,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
  },
  sectionsContainer: {
    paddingHorizontal: SPACING.m,
    paddingBottom: SPACING.xl, // Extra padding at bottom for better scrolling
  },
}); 