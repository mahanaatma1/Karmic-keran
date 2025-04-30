import React, { useState } from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Import components
import PersonalDetailsForm from '../../components/user/ask-question/PersonalDetailsForm';
import QuestionCategories from '../../components/user/ask-question/QuestionCategories';
import QuestionForm from '../../components/user/ask-question/QuestionForm';

const AskQuestionScreen = () => {
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    gender: '',
    birthDate: '',
    birthTime: { hour: '09', minute: '00', ampm: 'AM' },
    birthLocation: '',
  });
  
  const [category, setCategory] = useState('');
  const [question, setQuestion] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  // Form validation
  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    let newErrors = { ...errors };
    
    switch (field) {
      case 'fullName':
        if (!value.trim()) {
          newErrors.fullName = 'Full name is required';
        } else {
          delete newErrors.fullName;
        }
        break;
        
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = 'Email address is required';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'gender':
        if (!value) {
          newErrors.gender = 'Gender is required';
        } else {
          delete newErrors.gender;
        }
        break;
        
      case 'birthDate':
        if (!value) {
          newErrors.birthDate = 'Date of birth is required';
        } else {
          delete newErrors.birthDate;
        }
        break;
        
      case 'birthLocation':
        if (!value.trim()) {
          newErrors.birthLocation = 'Birth location is required';
        } else {
          delete newErrors.birthLocation;
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};
    
    // Validate personal details
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
      isValid = false;
    }
    
    if (!formData.birthDate) {
      newErrors.birthDate = 'Date of birth is required';
      isValid = false;
    }
    
    if (!formData.birthLocation.trim()) {
      newErrors.birthLocation = 'Birth location is required';
      isValid = false;
    }
    
    // Validate category
    if (!category) {
      newErrors.category = 'Please select a question category';
      isValid = false;
    }
    
    // Validate question
    if (!question.trim()) {
      newErrors.question = 'Please enter your question';
      isValid = false;
    } else if (question.trim().length < 20) {
      newErrors.question = 'Please provide more details in your question (at least 20 characters)';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setSubmitting(true);
      
      // In a real app, you would send this data to your API
      setTimeout(() => {
        setSubmitting(false);
        
        // Show success message and navigate
        Alert.alert(
          "Question Submitted Successfully",
          "Our expert astrologers will review your question and provide guidance within 24 hours.",
          [
            { 
              text: "OK", 
              onPress: () => router.push('/(tabs)/')
            }
          ]
        );
      }, 1500);
    } else {
      // Scroll to the top to show errors
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
      }
    }
  };

  // Add a handler to navigate to the How It Works screen
  const handleHowItWorks = () => {
    router.push('/how-it-works');
  };

  const scrollViewRef = React.useRef(null);

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <StatusBar style="dark" />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ask Your Question</Text>
          <TouchableOpacity onPress={handleHowItWorks} style={styles.infoButton}>
            <Ionicons name="information-circle-outline" size={22} color="#FF6B00" />
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Introduction */}
          <View style={styles.introContainer}>
            <Text style={styles.introText}>
              Share your concerns and receive personalized astrological guidance tailored to your specific situation.
            </Text>
          </View>
          
          {/* Personal Details Form */}
          <PersonalDetailsForm 
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            validateField={validateField}
          />
          
          {/* Question Categories */}
          <QuestionCategories 
            selectedCategory={category}
            onSelectCategory={setCategory}
          />
          {errors.category && (
            <Text style={styles.categoryError}>{errors.category}</Text>
          )}
          
          {/* Question Form */}
          <QuestionForm 
            question={question}
            setQuestion={setQuestion}
            error={errors.question}
          />
          
          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={submitting}
          >
            <Text style={styles.submitButtonText}>Submit Question</Text>
            <Ionicons name="sparkles" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          
          <Text style={styles.disclaimer}>
            By submitting your question, you agree to our terms of service and privacy policy.
          </Text>
        </ScrollView>
        
        {/* Loading Indicator */}
        {submitting && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF6B00" />
              <Text style={styles.loadingText}>Submitting your question...</Text>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 0,
    marginBottom: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
    paddingTop: 0,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  introContainer: {
    marginTop: 0,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  introText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    textAlign: 'center',
  },
  categoryError: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 15,
    marginLeft: 5,
  },
  submitButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 10,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  disclaimer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#888888',
    marginBottom: 30,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333333',
  },
  infoButton: {
    position: 'absolute',
    right: 16,
    padding: 8,
  },
});

export default AskQuestionScreen;
