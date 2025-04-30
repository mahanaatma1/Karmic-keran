import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Text, 
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import profile components
import ProfileHeader from '../../components/user/profile/ProfileHeader';
import ProfilePhotoSection from '../../components/user/profile/ProfilePhotoSection';
import PersonalInfoSection from '../../components/user/profile/PersonalInfoSection';
import BirthDetailsSection from '../../components/user/profile/BirthDetailsSection';
import SecuritySection from '../../components/user/profile/SecuritySection';

const ProfileScreen = () => {
  // User data state (would be fetched from API in real app)
  const [userData, setUserData] = useState({
    name: 'Tushar Kumar',
    email: 'tusharkumar182736@gmail.com',
    gender: '',
    birthDate: '',
    birthTime: '',
    birthLocation: '',
  });

  // Handler functions
  const handleUploadPhoto = () => {
    Alert.alert('Upload Photo', 'Photo upload functionality will be implemented here');
  };

  const handleEditPersonalInfo = (field) => {
    Alert.alert('Edit Field', `Edit ${field} functionality will be implemented here`);
  };

  const handleEditBirthDetails = (field) => {
    Alert.alert('Edit Field', `Edit ${field} functionality will be implemented here`);
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'Password change functionality will be implemented here');
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <StatusBar style="dark" />
      
      <ProfileHeader />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <ProfilePhotoSection 
            initials={userData.name ? userData.name.substring(0, 2).toUpperCase() : 'TU'}
            onUploadPhoto={handleUploadPhoto}
          />
          
          <PersonalInfoSection 
            name={userData.name}
            email={userData.email}
            gender={userData.gender}
            onEditName={() => handleEditPersonalInfo('name')}
            onEditGender={() => handleEditPersonalInfo('gender')}
          />
          
          <BirthDetailsSection 
            birthDate={userData.birthDate}
            birthTime={userData.birthTime}
            birthLocation={userData.birthLocation}
            onEditDate={() => handleEditBirthDetails('date')}
            onEditTime={() => handleEditBirthDetails('time')}
            onEditLocation={() => handleEditBirthDetails('location')}
          />
          
          <SecuritySection 
            onChangePassword={handleChangePassword}
            connectedAccounts={[
              { provider: 'Google', email: userData.email, isConnected: true }
            ]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 15,
    paddingBottom: 30,
  },
});

export default ProfileScreen;