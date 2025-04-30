import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  iconName,
  keyboardType = 'default',
  autoCapitalize = 'none',
  editable = true,
  error,
  onPressIcon,
  marginBottom = 20,
  onFocus,
  onBlur
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!secureTextEntry);
  
  // Animated values
  const focusAnim = useState(new Animated.Value(0))[0];

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    
    if (onBlur) onBlur();
  };
  
  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0.1)', '#FF6B00']
  });
  
  const bgColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0.05)', 'rgba(255, 107, 0, 0.05)']
  });
  
  return (
    <View style={[styles.container, { marginBottom }]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <Animated.View style={[
        styles.inputWrapper,
        { 
          borderColor: error ? '#FF4444' : borderColor,
          backgroundColor: error ? 'rgba(255, 68, 68, 0.05)' : bgColor
        },
        !editable && styles.disabledInput
      ]}>
        {iconName && (
          <TouchableOpacity
            disabled={!onPressIcon}
            onPress={onPressIcon}
            style={styles.iconContainer}
          >
            <Ionicons 
              name={iconName} 
              size={20} 
              color={
                error ? '#FF4444' : 
                isFocused ? "#FF6B00" : 
                editable ? "#888888" : "#555555"
              } 
            />
          </TouchableOpacity>
        )}
        
        <TextInput
          style={[
            styles.input,
            !editable && styles.disabledText
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#666666"
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        
        {secureTextEntry && (
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconContainer}
          >
            <Ionicons 
              name={showPassword ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="#888888" 
            />
          </TouchableOpacity>
        )}
      </Animated.View>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    height: 56,
    paddingHorizontal: 16,
  },
  iconContainer: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    height: '100%',
  },
  disabledInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  disabledText: {
    color: '#888888',
  },
  errorText: {
    color: '#FF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  }
});

export default FormInput; 