import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal,
  Image,
  Pressable
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SPACING, FONT, SHADOW } from '../constants/Theme';

const ProfileDropdown = ({ 
  userEmail = 'karmickeranuk@gmail.com', 
  userName = 'karmic',
  profileImage = null,
  onProfileSettings,
  onLogout,
  countryCode = 'UK'
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.profileButton} 
        onPress={toggleDropdown}
        activeOpacity={0.7}
      >
        {profileImage ? (
          <Image 
            source={{ uri: profileImage }} 
            style={styles.profileImage} 
          />
        ) : (
          <View style={styles.profileImageFallback}>
            <Ionicons name="person" size={24} color={COLORS.white} />
          </View>
        )}
      </TouchableOpacity>
      
      <Modal
        transparent={true}
        visible={isDropdownVisible}
        animationType="fade"
        onRequestClose={closeDropdown}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={closeDropdown}
        >
          <View style={styles.dropdownContainer}>
            {/* Profile Card with user info */}
            <View style={styles.profileCard}>
              <View style={styles.profileIconContainer}>
                {profileImage ? (
                  <Image 
                    source={{ uri: profileImage }} 
                    style={styles.userProfileImage} 
                  />
                ) : (
                  <View style={styles.userProfileImageFallback}>
                    <Ionicons name="person" size={40} color={COLORS.white} />
                  </View>
                )}
              </View>
              <View style={styles.userInfoContainer}>
                <Text style={styles.userName}>{userName}</Text>
                <Text style={styles.userEmail}>{userEmail}</Text>
              </View>
            </View>
            
            {/* Menu Item - Profile Settings */}
            <TouchableOpacity 
              style={styles.menuOption}
              onPress={() => {
                closeDropdown();
                if (onProfileSettings) onProfileSettings();
              }}
            >
              <Text style={styles.menuText}>Profile Settings</Text>
            </TouchableOpacity>
            
            {/* Menu Item - Logout */}
            <TouchableOpacity 
              style={styles.menuOption}
              onPress={() => {
                closeDropdown();
                if (onLogout) onLogout();
              }}
            >
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileImageFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFA33C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    ...SHADOW.medium,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: SPACING.l,
    paddingHorizontal: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  profileIconContainer: {
    marginBottom: SPACING.m,
  },
  userProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userProfileImageFallback: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFA33C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoContainer: {
    alignItems: 'center',
  },
  userName: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  userEmail: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
  },
  menuOption: {
    padding: SPACING.l,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  menuText: {
    fontSize: FONT.size.l,
    color: COLORS.primaryText,
    textAlign: 'center',
  },
});

export default ProfileDropdown; 