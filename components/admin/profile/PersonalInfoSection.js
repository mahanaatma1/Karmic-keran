import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT, SHADOW, SIZES } from '../../../constants/Theme';

const InfoRow = ({ label, value, onEdit }) => {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value || 'Not specified'}</Text>
      </View>
      <TouchableOpacity 
        style={styles.editIcon}
        onPress={onEdit}
      >
        <Ionicons name="pencil" size={18} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

const PersonalInfoSection = ({ 
  name,
  email,
  gender,
  onEditName,
  onEditGender
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Personal Information</Text>
      
      <InfoRow 
        label="Name"
        value={name}
        onEdit={onEditName}
      />
      
      <View style={styles.divider} />
      
      <InfoRow 
        label="Email"
        value={email}
        onEdit={null} // Email is typically not editable, or requires special verification
      />
      
      <View style={styles.divider} />
      
      <InfoRow 
        label="Gender"
        value={gender}
        onEdit={onEditGender}
      />
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.m,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    marginBottom: SPACING.xs,
  },
  infoValue: {
    fontSize: FONT.size.m,
    color: COLORS.primaryText,
  },
  editIcon: {
    padding: SPACING.xs,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
  },
});

export default PersonalInfoSection; 