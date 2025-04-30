import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SharedTransition } from 'expo-router';

const { width, height } = Dimensions.get('window');

const LandingScreen = () => {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // In a real app, we would load fonts properly
  // const [fontsLoaded] = useFonts({
  //   'SpaceGrotesk-Bold': require('../assets/fonts/SpaceGrotesk-Bold.ttf'),
  //   'SpaceGrotesk-Medium': require('../assets/fonts/SpaceGrotesk-Medium.ttf'),
  // });

  const handleLogin = () => {
    // Fade out animation before navigation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Navigate after animation completes
      router.push('/auth-screen');
    });
  };

  // Animated stars (simplified for this example)
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 3 + 1;
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
              opacity: Math.random() * 0.8 + 0.2,
            },
          ]}
        />
      );
    }
    return stars;
  };

  return (
    <LinearGradient
      colors={['#121212', '#1E1E1E', '#0A0A0A']}
      style={styles.container}
    >
      <StatusBar style="light" />
      
      {/* Stars background */}
      {renderStars()}
      
      {/* Floating elements */}
      <View style={[styles.floatingElement, { top: height * 0.15, right: width * 0.2 }]}>
        <Ionicons name="star" size={14} color="#FF6B00" />
      </View>
      <View style={[styles.floatingElement, { top: height * 0.3, left: width * 0.15 }]}>
        <Ionicons name="star" size={18} color="#FF6B00" />
      </View>
      <View style={[styles.floatingElement, { bottom: height * 0.35, right: width * 0.15 }]}>
        <Ionicons name="sparkles" size={16} color="#FF6B00" />
      </View>
      
      {/* App Logo & Name - Wrap with Animated.View for fade effect */}
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <View style={styles.sunContainer}>
          <View style={styles.sunRays} />
          <View style={styles.sunCore} />
        </View>
        <Text style={styles.appName}>Karmic Keran</Text>
        <Text style={styles.tagline}>Your Cosmic Guide to Self-Discovery</Text>
      </Animated.View>
      
      {/* Main Content - Wrap with Animated.View for fade effect */}
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Meet Your Personal</Text>
        <Text style={styles.subtitle}>The Pocket Astrologer</Text>
        
        <Text style={styles.description}>
          Meet your personal pocket astrologer—your cosmic guide for insights on love, career, and your life purpose.
        </Text>
      </Animated.View>
      
      {/* Footer with Login Button - Wrap with Animated.View for fade effect */}
      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  star: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  floatingElement: {
    position: 'absolute',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  sunContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  sunRays: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 20,
    borderColor: '#FFB830',
    opacity: 0.3,
  },
  sunCore: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFD700',
    shadowColor: '#FFA500',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#CCCCCC',
    maxWidth: '80%',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B00',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#AAAAAA',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '85%',
  },
  footer: {
    paddingBottom: 40,
    paddingHorizontal: 30,
  },
  loginButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#FF6B00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LandingScreen; 