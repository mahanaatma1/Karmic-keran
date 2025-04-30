import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Import shared components
import OnboardingContainer from '../../components/onboarding/shared/OnboardingContainer';
import ActionButton from '../../components/onboarding/shared/ActionButton';
import ProgressStepper from '../../components/onboarding/shared/ProgressStepper';

const BirthLocationScreen = () => {
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  
  const handleNext = () => {
    setLoading(true);
    
    // Simple navigation to user book-consultation
    setTimeout(() => {
      try {
        router.push('/(user)/book-consultation');
      } catch (error) {
        console.error("Navigation error:", error);
        setLoading(false);
      }
    }, 300);
  };
  
  const handleBack = () => {
    router.back();
  };
  
  return (
    <OnboardingContainer onBack={handleBack}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Birth Location</Text>
        <Text style={styles.subtitle}>
          Enter the city where you were born to complete your cosmic profile
        </Text>
        
        <View style={styles.formContainer}>
          <Text style={styles.label}>Birth Location</Text>
          
          <TouchableOpacity style={styles.searchContainer}>
            <Ionicons 
              name="location-outline" 
              size={20} 
              color="#888888" 
              style={styles.searchIcon}
            />
            
            <Text style={styles.placeholderText}>Enter city, country</Text>
          </TouchableOpacity>
          
          <Text style={styles.hintText}>
            (For testing only - value is not required)
          </Text>
        </View>
        
        <ActionButton
          title="Continue"
          onPress={handleNext}
          loading={loading}
          disabled={loading}
          marginTop={20}
        />
        
        <ProgressStepper currentStep={1} totalSteps={2} />
      </ScrollView>
    </OnboardingContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#AAAAAA',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    height: 56,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  placeholderText: {
    color: '#666666',
    fontSize: 16,
  },
  hintText: {
    color: '#888888',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  }
});

export default BirthLocationScreen; 