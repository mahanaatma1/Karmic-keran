import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ConsultationHeader from './ConsultationHeader';
import ConsultationScheduling from './ConsultationScheduling';
import PaymentDetails from './PaymentDetails';
import ConsultationCheckout from '../ConsultationCheckout';
import { COLORS } from '../../../constants/Theme';

const ConsultationBookingFlow = ({ consultation, navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({});
  
  // Mock consultation data for testing
  const mockConsultation = consultation || {
    id: '1',
    title: 'Career Consultation',
    description: 'One-on-one session with a career expert to guide your professional development.',
    price: 79.99,
    duration: 60, // in minutes
    counselorName: 'Dr. Jane Smith',
    counselorImage: 'https://randomuser.me/api/portraits/women/45.jpg',
  };

  const handleSchedulingComplete = (details) => {
    setBookingDetails(details);
    setCurrentStep(2);
  };

  const handlePaymentComplete = (details) => {
    setBookingDetails(details);
    setCurrentStep(3);
  };

  const handleSchedulingBack = () => {
    // If we're in scheduling step, go back to consultation details
    navigation.goBack();
  };

  const handlePaymentBack = () => {
    setCurrentStep(1);
  };

  const handleBookingComplete = () => {
    // This would typically submit the booking to an API
    console.log('Booking completed:', bookingDetails);
    
    // Navigate to success/confirmation screen
    navigation.navigate('BookingConfirmation', { 
      bookingDetails: bookingDetails,
      consultation: mockConsultation 
    });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ConsultationScheduling
            consultation={mockConsultation}
            onComplete={handleSchedulingComplete}
            onBack={handleSchedulingBack}
            currentStep={currentStep}
          />
        );
      case 2:
        return (
          <PaymentDetails
            consultation={mockConsultation}
            bookingDetails={bookingDetails}
            onComplete={handlePaymentComplete}
            onBack={handlePaymentBack}
          />
        );
      case 3:
        return (
          <ConsultationCheckout
            consultation={mockConsultation}
            bookingDetails={bookingDetails}
            onComplete={handleBookingComplete}
            onBack={() => setCurrentStep(2)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ConsultationHeader 
        title={mockConsultation.title}
        counselorName={mockConsultation.counselorName}
        counselorImage={mockConsultation.counselorImage}
      />
      {renderCurrentStep()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default ConsultationBookingFlow; 