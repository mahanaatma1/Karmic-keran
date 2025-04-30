import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BirthDetailItem = ({ label, value, onEdit }) => (
  <View style={styles.detailItem}>
    <View>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value || 'Not specified'}</Text>
    </View>
    <TouchableOpacity onPress={onEdit} style={styles.editButton}>
      <Ionicons name="pencil" size={20} color="#666666" />
    </TouchableOpacity>
  </View>
);

const BirthDetailsSection = ({ 
  birthDate = '',
  birthTime = '',
  birthLocation = '',
  onEditDate,
  onEditTime,
  onEditLocation
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Birth Details</Text>
      
      <BirthDetailItem 
        label="Date of Birth"
        value={birthDate}
        onEdit={onEditDate}
      />
      
      <View style={styles.divider} />
      
      <BirthDetailItem 
        label="Time of Birth"
        value={birthTime}
        onEdit={onEditTime}
      />
      
      <View style={styles.divider} />
      
      <BirthDetailItem 
        label="Location of Birth"
        value={birthLocation}
        onEdit={onEditLocation}
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
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  detailValue: {
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

export default BirthDetailsSection; 