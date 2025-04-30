import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { COLORS, SPACING, FONT, SIZES, SHADOW } from '../../../constants/Theme';

const PaymentDetails = ({ consultation, bookingDetails, onBack, onComplete }) => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [currentStep, setCurrentStep] = useState(3);
  const totalSteps = 3;

  const isFormValid = () => {
    return name.trim() !== '' && 
           cardNumber.trim().length === 19 && // 16 digits + 3 spaces
           expiry.length === 5 && // MM/YY
           cvv.length === 3;
  };

  const formatCardNumber = (text) => {
    // Remove any non-digit characters
    const cleaned = text.replace(/\D/g, '');
    
    // Add spaces every 4 digits
    let formatted = '';
    for (let i = 0; i < cleaned.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += ' ';
      }
      formatted += cleaned[i];
    }
    
    return formatted.substring(0, 19); // Limit to 16 digits + 3 spaces
  };

  const formatExpiry = (text) => {
    // Remove any non-digit characters
    const cleaned = text.replace(/\D/g, '');
    
    // Add / after the first 2 digits
    if (cleaned.length > 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    
    return cleaned;
  };

  const handleCardNumberChange = (text) => {
    setCardNumber(formatCardNumber(text));
  };

  const handleExpiryChange = (text) => {
    setExpiry(formatExpiry(text));
  };

  const handleCvvChange = (text) => {
    // Only allow digits and limit to 3
    const cleaned = text.replace(/\D/g, '');
    setCvv(cleaned.substring(0, 3));
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      onComplete({
        ...bookingDetails,
        paymentDetails: {
          name,
          cardNumber,
          expiry,
          cvv
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Steps indicator */}
        <View style={styles.stepsContainer}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <View key={index} style={styles.stepWrapper}>
              <View 
                style={[
                  styles.stepIndicator, 
                  index + 1 === currentStep && styles.activeStepIndicator,
                  index + 1 < currentStep && styles.completedStepIndicator
                ]}
              >
                <Text 
                  style={[
                    styles.stepNumber,
                    (index + 1 === currentStep || index + 1 < currentStep) && styles.activeStepNumber
                  ]}
                >
                  {index + 1}
                </Text>
              </View>
              {index < totalSteps - 1 && (
                <View style={[
                  styles.stepConnector,
                  index + 1 < currentStep && styles.completedStepConnector
                ]} />
              )}
            </View>
          ))}
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          
          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cardholder Name</Text>
              <TextInput 
                style={styles.input}
                placeholder="Enter name on card"
                value={name}
                onChangeText={setName}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Card Number</Text>
              <TextInput 
                style={styles.input}
                placeholder="XXXX XXXX XXXX XXXX"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={handleCardNumberChange}
              />
            </View>
            
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: SPACING.m }]}>
                <Text style={styles.label}>Expiry Date</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="MM/YY"
                  keyboardType="numeric"
                  value={expiry}
                  onChangeText={handleExpiryChange}
                  maxLength={5}
                />
              </View>
              
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>CVV</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="XXX"
                  keyboardType="numeric"
                  value={cvv}
                  onChangeText={handleCvvChange}
                  maxLength={3}
                  secureTextEntry
                />
              </View>
            </View>
          </View>
          
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Booking Summary</Text>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Consultation:</Text>
              <Text style={styles.summaryValue}>{consultation.title}</Text>
            </View>
            
            {bookingDetails?.selectedDate && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Date:</Text>
                <Text style={styles.summaryValue}>
                  {bookingDetails.selectedDate.toDateString()}
                </Text>
              </View>
            )}
            
            {bookingDetails?.selectedTime && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Time:</Text>
                <Text style={styles.summaryValue}>{bookingDetails.selectedTime}</Text>
              </View>
            )}
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Duration:</Text>
              <Text style={styles.summaryValue}>{consultation.duration} minutes</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>£{consultation.price.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={onBack}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.confirmButton,
            !isFormValid() && styles.disabledButton
          ]}
          onPress={handleSubmit}
          disabled={!isFormValid()}
        >
          <Text style={styles.confirmButtonText}>Complete Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.l,
    paddingHorizontal: SPACING.xl,
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepIndicator: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.lightBackground,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  activeStepIndicator: {
    backgroundColor: COLORS.warmAmber,
  },
  completedStepIndicator: {
    backgroundColor: COLORS.warmAmber,
  },
  stepNumber: {
    fontSize: FONT.size.m,
    color: COLORS.secondaryText,
    fontWeight: FONT.weight.bold,
  },
  activeStepNumber: {
    color: COLORS.white,
  },
  stepConnector: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.lightBackground,
    marginHorizontal: -5,
  },
  completedStepConnector: {
    backgroundColor: COLORS.warmAmber,
  },
  contentContainer: {
    padding: SPACING.m,
  },
  sectionTitle: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    marginBottom: SPACING.m,
  },
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    marginBottom: SPACING.l,
    ...SHADOW.small,
  },
  inputGroup: {
    marginBottom: SPACING.m,
  },
  label: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    marginBottom: SPACING.xs,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radiusSmall,
    paddingHorizontal: SPACING.m,
    fontSize: FONT.size.m,
  },
  row: {
    flexDirection: 'row',
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    marginBottom: SPACING.l,
    ...SHADOW.small,
  },
  summaryTitle: {
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    marginBottom: SPACING.m,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.s,
  },
  summaryLabel: {
    fontSize: FONT.size.m,
    color: COLORS.secondaryText,
  },
  summaryValue: {
    fontSize: FONT.size.m,
    color: COLORS.primaryText,
    fontWeight: FONT.weight.medium,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.m,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
  },
  totalValue: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: SPACING.m,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  backButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.m,
    borderRadius: SIZES.radiusSmall,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: SPACING.m,
  },
  backButtonText: {
    color: COLORS.secondaryText,
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.medium,
  },
  confirmButton: {
    flex: 2,
    backgroundColor: COLORS.success,
    paddingVertical: SPACING.m,
    borderRadius: SIZES.radiusSmall,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: COLORS.border,
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.bold,
  },
});

export default PaymentDetails; 