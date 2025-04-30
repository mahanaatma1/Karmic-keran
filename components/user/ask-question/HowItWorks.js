import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const steps = [
  {
    id: 1,
    title: 'Enter Your Details',
    description: 'Provide your birth details for accurate astrological readings',
    icon: 'user-alt',
  },
  {
    id: 2,
    title: 'Choose Category',
    description: 'Select the specific life area you need guidance in',
    icon: 'list-alt',
  },
  {
    id: 3,
    title: 'Get Expert Answer',
    description: 'Receive detailed guidance from our experienced astrologers within 24 hours',
    icon: 'star',
  },
];

const HowItWorks = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How It Works</Text>
      
      {steps.map((step) => (
        <View key={step.id} style={styles.stepContainer}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>{step.id}</Text>
          </View>
          
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDescription}>{step.description}</Text>
          </View>
          
          <FontAwesome5 name={step.icon} size={24} color="#FF6B00" style={styles.stepIcon} />
        </View>
      ))}
      
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>
          "Our expert Vedic astrologers combine ancient Vedic wisdom with modern insights to provide you with accurate and meaningful guidance based on time-tested principles of Vedic astrology."
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF6B00',
    marginBottom: 25,
    textAlign: 'center',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 12,
  },
  stepNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumber: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  stepIcon: {
    marginLeft: 10,
  },
  quoteContainer: {
    backgroundColor: '#FFF5EE',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#FF6B00',
  },
  quoteText: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});

export default HowItWorks; 