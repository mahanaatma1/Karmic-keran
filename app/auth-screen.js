import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput as RNTextInput,
  Dimensions,
  Animated,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';

const { width, height } = Dimensions.get('window');

// Custom TextInput Component
const TextInput = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry = false, 
  iconName,
  keyboardType = 'default' 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={[
        styles.inputWrapper,
        isFocused && styles.inputWrapperFocused
      ]}>
        <Ionicons 
          name={iconName} 
          size={20} 
          color={isFocused ? "#FF6B00" : "#888888"} 
          style={styles.inputIcon} 
        />
        <RNTextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#666666"
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {secureTextEntry && (
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            style={styles.passwordToggle}
          >
            <Ionicons 
              name={showPassword ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="#888888" 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// Custom Auth Button Component
const CustomAuthButton = ({ title, onPress, variant = 'primary', iconName }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.authButton,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {iconName && (
        <Ionicons 
          name={iconName} 
          size={20} 
          color={variant === 'primary' ? "#FFFFFF" : "#FF6B00"} 
          style={styles.buttonIcon} 
        />
      )}
      <Text 
        style={[
          styles.authButtonText,
          variant === 'primary' ? styles.primaryButtonText : styles.secondaryButtonText
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  
  const router = useRouter();
  const { login, isAdminEmail, adminEmail } = useAuth();

  // Improved animation on mount with both fade and slide
  useEffect(() => {
    // Reset state when component mounts
    setEmail('');
    setPassword('');
    setOtp('');
    setShowPasswordField(false);
    setShowOtpField(false);
    
    // Start animation sequence
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        delay: 100
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
        delay: 100
      })
    ]).start();
  }, []);
  
  const handleEmailContinue = () => {
    if (!email || !email.includes('@')) {
      // Show some validation error
      return;
    }
    
    // Check if it's an admin email
    if (isAdminEmail(email)) {
      setShowPasswordField(true);
      setShowOtpField(false);
    } else {
      setShowPasswordField(false);
      setShowOtpField(true);
    }
  };

  const handleLogin = () => {
    // For admin login
    if (showPasswordField && password) {
      const success = login(email, password);
      if (success) {
        // Fade out before navigation
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          router.replace('/(admin)');
        });
        return;
      }
    }
    
    // For regular user login
    if (showOtpField && otp) {
      const success = login(email, null, otp);
      if (success) {
        // Fade out before navigation
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          router.push('/onboarding/birth-details');
        });
        return;
      }
    }
  };

  const handleSocialLogin = (provider) => {
    // In a real app, we would handle OAuth here
    // For demo purposes, navigate to onboarding flow
    // Fade out before navigation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      router.push('/onboarding/birth-details');
    });
  };

  const handleBack = () => {
    if (showPasswordField || showOtpField) {
      // Go back to email input
      setShowPasswordField(false);
      setShowOtpField(false);
    } else {
      // Go back to landing with animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 30,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start(() => {
        router.back();
      });
    }
  };

  // Add the stars animation similar to landing page
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 2 + 1;
      stars.push(
        <View
          key={i}
          style={[
            styles.star,
            {
              width: size,
              height: size,
              top: Math.random() * height * 0.7,
              left: Math.random() * width,
              opacity: Math.random() * 0.5 + 0.2,
            },
          ]}
        />
      );
    }
    return stars;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={['#121212', '#1E1E1E', '#0A0A0A']}
        style={styles.container}
      >
        <StatusBar style="light" />
        
        {/* Stars background */}
        {renderStars()}
        
        {/* Back button with fade animation */}
        <Animated.View style={[styles.backButtonContainer, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </Animated.View>
        
        {/* Logo with combined animations */}
        <Animated.View 
          style={[
            styles.logoContainer,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Logo size="large" />
          <Text style={styles.logoText}>Karmic Kiran</Text>
        </Animated.View>
        
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <Animated.View 
            style={[
              styles.formContainer,
              { 
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={styles.formTitle}>
              {!showPasswordField && !showOtpField 
                ? "Log in or Sign up" 
                : showPasswordField 
                  ? "Enter your password" 
                  : "Enter verification code"}
            </Text>
            
            {/* Email field - always shown but disabled when showing password/OTP */}
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              iconName="mail-outline"
            />
            
            {/* Password field - conditionally shown */}
            {showPasswordField && (
              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry={true}
                iconName="lock-closed-outline"
              />
            )}
            
            {/* OTP field - conditionally shown */}
            {showOtpField && (
              <TextInput
                label="Verification Code"
                value={otp}
                onChangeText={setOtp}
                placeholder="Enter 6-digit code"
                keyboardType="number-pad"
                iconName="keypad-outline"
              />
            )}
            
            {/* Forgot Password link - only shown with password field */}
            {showPasswordField && (
              <TouchableOpacity style={styles.forgotPasswordButton}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}
            
            {/* Login/Continue Buttons */}
            {!showPasswordField && !showOtpField ? (
              <CustomAuthButton
                title="Continue with Email"
                onPress={handleEmailContinue}
                variant="primary"
              />
            ) : (
              <CustomAuthButton
                title="Login"
                onPress={handleLogin}
                variant="primary"
              />
            )}
            
            {/* Social Login Options - Only shown on initial screen */}
            {!showPasswordField && !showOtpField && (
              <>
                <View style={styles.dividerContainer}>
                  <View style={styles.divider} />
                  <Text style={styles.dividerText}>OR</Text>
                  <View style={styles.divider} />
                </View>
                
                <CustomAuthButton
                  title="Continue with Google"
                  iconName="logo-google"
                  onPress={() => handleSocialLogin('Google')}
                  variant="secondary"
                />
              </>
            )}
          </Animated.View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(30, 30, 30, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: height * 0.1,
  },
  formContainer: {
    width: '100%',
    backgroundColor: 'rgba(30, 30, 30, 0.7)',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#BBBBBB',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 20, 20, 0.8)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333333',
    height: 50,
    paddingHorizontal: 15,
  },
  inputWrapperFocused: {
    borderColor: '#FF6B00',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    height: '100%',
  },
  passwordToggle: {
    padding: 5,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#FF6B00',
    fontSize: 14,
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  primaryButton: {
    backgroundColor: '#FF6B00',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF6B00',
  },
  authButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#FF6B00',
  },
  buttonIcon: {
    marginRight: 10,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#444444',
  },
  dividerText: {
    color: '#BBBBBB',
    paddingHorizontal: 15,
    fontSize: 14,
  },
}); 