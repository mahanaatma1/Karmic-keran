import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  Animated,
  View
} from 'react-native';

const ActionButton = ({ 
  title, 
  onPress, 
  loading = false, 
  disabled = false,
  variant = 'primary',
  fullWidth = true,
  marginTop = 0
}) => {
  // Determine button type styles
  const isPrimary = variant === 'primary';
  const isSuccess = variant === 'success';
  
  // Button press animation
  const animatedScale = new Animated.Value(1);
  
  const handlePressIn = () => {
    Animated.spring(animatedScale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(animatedScale, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };
  
  return (
    <Animated.View style={[
      fullWidth && styles.fullWidth,
      { transform: [{ scale: animatedScale }] },
      { marginTop }
    ]}>
      <TouchableOpacity
        style={[
          styles.button,
          isPrimary && styles.primaryButton,
          isSuccess && styles.successButton,
          disabled && styles.disabledButton,
          fullWidth && styles.fullWidth
        ]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <Text style={[
            styles.buttonText,
            isPrimary && styles.primaryButtonText,
            isSuccess && styles.successButtonText,
            disabled && styles.disabledButtonText
          ]}>
            {title}
          </Text>
        )}
        
        {/* Animated gradient overlay for primary button */}
        {isPrimary && !disabled && !loading && (
          <View style={styles.glowEffect} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    position: 'relative',
    overflow: 'hidden',
  },
  primaryButton: {
    backgroundColor: '#FF6B00',
    shadowColor: '#FF6B00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  successButton: {
    backgroundColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#AAAAAA',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  successButtonText: {
    color: '#FFFFFF',
  },
  disabledButtonText: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  glowEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    opacity: 0.3,
  }
});

export default ActionButton; 