import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT, SHADOW } from '../constants/Theme';

export default function AuthButton({ 
  title, 
  onPress, 
  iconName,
  variant = 'primary', // primary, secondary
  fullWidth = true,
}) {
  const isPrimary = variant === 'primary';
  
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        isPrimary ? styles.primaryButton : styles.secondaryButton,
        fullWidth && styles.fullWidth,
        !isPrimary && SHADOW.small
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {iconName && (
        <View style={styles.iconContainer}>
          <Ionicons
            name={iconName}
            size={20}
            color={isPrimary ? COLORS.white : COLORS.primaryText}
          />
        </View>
      )}
      <Text 
        style={[
          styles.buttonText, 
          isPrimary ? styles.primaryButtonText : styles.secondaryButtonText
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.l,
    borderRadius: 4,
    marginVertical: SPACING.s,
  },
  primaryButton: {
    backgroundColor: COLORS.goldenOrange,
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  fullWidth: {
    width: '100%',
  },
  buttonText: {
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.medium,
    textAlign: 'center',
  },
  primaryButtonText: {
    color: COLORS.white,
  },
  secondaryButtonText: {
    color: COLORS.black,
  },
  iconContainer: {
    marginRight: SPACING.s,
  },
});