import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT } from '../constants/Theme';

export default function CustomTextInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  iconName,
  error,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[
        styles.inputContainer, 
        error && styles.inputError,
        isFocused && styles.inputFocused
      ]}>
        {iconName && (
          <Ionicons 
            name={iconName} 
            size={20} 
            color={isFocused ? COLORS.goldenOrange : COLORS.secondaryText} 
            style={styles.icon} 
          />
        )}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.secondaryText}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.m,
    width: '100%',
  },
  label: {
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.medium,
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    paddingHorizontal: SPACING.m,
    height: 48,
    backgroundColor: COLORS.white,
  },
  inputFocused: {
    borderColor: COLORS.goldenOrange,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  icon: {
    marginRight: SPACING.s,
  },
  input: {
    flex: 1,
    fontSize: FONT.size.m,
    color: COLORS.black,
  },
  errorText: {
    fontSize: FONT.size.s,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
});