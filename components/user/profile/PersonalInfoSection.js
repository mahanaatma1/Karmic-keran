import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InfoItem = ({ label, value, onEdit }) => (
  <View style={styles.infoItem}>
    <View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || 'Not specified'}</Text>
    </View>
    <TouchableOpacity onPress={onEdit} style={styles.editButton}>
      <Ionicons name="pencil" size={20} color="#666666" />
    </TouchableOpacity>
  </View>
);

const PersonalInfoSection = ({ 
  name = 'Tushar Kumar', 
  email = 'tusharkumar182736@gmail.com',
  gender = '',
  onEditName,
  onEditGender
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Personal Information</Text>
      
      <InfoItem 
        label="Name"
        value={name}
        onEdit={onEditName}
      />
      
      <View style={styles.divider} />
      
      <InfoItem 
        label="Email"
        value={email}
        onEdit={() => {}}
      />
      
      <View style={styles.divider} />
      
      <InfoItem 
        label="Gender"
        value={gender}
        onEdit={onEditGender}
      />
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
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  editButton: {
    padding: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 5,
  },
});

export default PersonalInfoSection; 