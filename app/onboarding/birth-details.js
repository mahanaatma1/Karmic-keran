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

const BirthDetailsScreen = () => {
  const router = useRouter();
  
  // Avoid using TextInput since it's causing blank screens
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleNext = () => {
    setLoading(true);
    
    // Simple navigation without validation
    setTimeout(() => {
      router.push('/onboarding/birth-location');
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
        <Text style={styles.title}>Birth Details</Text>
        <Text style={styles.subtitle}>
          Enter your birth date and time for your cosmic profile
        </Text>
        
        <View style={styles.formContainer}>          
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Birth Date</Text>
            <TouchableOpacity style={styles.inputWrapper}>
              <Text style={styles.placeholderText}>MM/DD/YYYY</Text>
              <Ionicons name="calendar-outline" size={20} color="#888888" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Birth Time</Text>
            <TouchableOpacity style={styles.inputWrapper}>
              <Text style={styles.placeholderText}>HH:MM AM/PM</Text>
              <Ionicons name="time-outline" size={20} color="#888888" />
            </TouchableOpacity>
            <Text style={styles.hintText}>
              (For testing only - values are not required)
            </Text>
          </View>
        </View>
        
        <ActionButton
          title="Continue"
          onPress={handleNext}
          loading={loading}
          disabled={loading}
          marginTop={20}
        />
        
        <ProgressStepper currentStep={0} totalSteps={2} />
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
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    height: 56,
    paddingHorizontal: 16,
  },
  placeholderText: {
    color: '#666666',
    fontSize: 16,
  },
  errorText: {
    color: '#FF4444',
    fontSize: 14,
    marginTop: 16,
    textAlign: 'center',
  },
  hintText: {
    color: '#888888',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  }
});

export default BirthDetailsScreen; 