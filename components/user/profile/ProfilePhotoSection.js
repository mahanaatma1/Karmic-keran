import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfilePhotoSection = ({ initials = 'TU', onUploadPhoto }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Profile Photo</Text>
      
      <View style={styles.photoContainer}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.uploadButton} 
        onPress={onUploadPhoto}
      >
        <Ionicons name="cloud-upload-outline" size={20} color="#666" style={styles.uploadIcon} />
        <Text style={styles.uploadText}>Upload a photo</Text>
      </TouchableOpacity>
      
      <Text style={styles.helperText}>
        Upload a photo to help others recognize you
      </Text>
      <Text style={styles.recommendedText}>
        Recommended: Square image, at least 400x400 pixels
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 20,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#555555',
  },
  uploadButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 6,
    marginBottom: 15,
  },
  uploadIcon: {
    marginRight: 10,
  },
  uploadText: {
    fontSize: 16,
    color: '#666666',
  },
  helperText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  recommendedText: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default ProfilePhotoSection; 