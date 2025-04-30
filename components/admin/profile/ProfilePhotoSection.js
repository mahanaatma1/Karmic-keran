import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT, SHADOW, SIZES } from '../../../constants/Theme';

const ProfilePhotoSection = ({ photoUrl, onUploadPhoto }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Profile Photo</Text>
      
      <View style={styles.photoContainer}>
        <View style={styles.photoWrapper}>
          {photoUrl ? (
            <Image 
              source={{ uri: photoUrl }} 
              style={styles.photo} 
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <Ionicons name="person" size={60} color="#8995A0" />
            </View>
          )}
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={onUploadPhoto}
          >
            <Ionicons name="camera" size={18} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={styles.helperText}>
        Upload a photo to help others recognize you
      </Text>
      <Text style={styles.recommendedText}>
        Recommended: Square image, at least 400×400 pixels
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SPACING.l,
    marginBottom: SPACING.m,
    ...SHADOW.small,
  },
  sectionTitle: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    marginBottom: SPACING.m,
  },
  photoContainer: {
    alignItems: 'center',
    marginVertical: SPACING.m,
  },
  photoWrapper: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'visible',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    backgroundColor: '#E1E8ED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  helperText: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    textAlign: 'center',
    marginTop: SPACING.m,
  },
  recommendedText: {
    fontSize: FONT.size.xs,
    color: COLORS.tertiaryText,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
});

export default ProfilePhotoSection; 