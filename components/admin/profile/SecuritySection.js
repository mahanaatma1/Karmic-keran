import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT, SHADOW, SIZES } from '../../../constants/Theme';

const SecuritySection = ({ onChangePassword }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Security & Connected Accounts</Text>
      
      <View style={styles.passwordSection}>
        <Text style={styles.passwordTitle}>Password</Text>
        <Text style={styles.passwordDescription}>
          Change your password to keep your account secure
        </Text>
        
        <TouchableOpacity 
          style={styles.changePasswordButton}
          onPress={onChangePassword}
        >
          <Ionicons name="lock-closed" size={18} color={COLORS.white} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
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
  passwordSection: {
    marginBottom: SPACING.m,
  },
  passwordTitle: {
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.medium,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  passwordDescription: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    marginBottom: SPACING.m,
  },
  changePasswordButton: {
    backgroundColor: '#FF7D2C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.l,
    borderRadius: SIZES.radiusSmall,
    alignSelf: 'flex-start',
  },
  buttonIcon: {
    marginRight: SPACING.xs,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.medium,
  },
});

export default SecuritySection; 