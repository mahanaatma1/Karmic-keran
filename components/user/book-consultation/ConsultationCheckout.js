import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, SPACING, FONT, SIZES, SHADOW } from '../../../constants/Theme';

const ConsultationCheckout = ({ consultation, onClose, onContinue }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Handle continue button press
  const handleContinue = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onContinue();
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

        {/* Duration indicator */}
        <View style={styles.durationContainer}>
          <Text style={styles.durationText}>
            {consultation.duration} minutes
          </Text>
        </View>

        {/* Consultation details */}
        <View style={styles.detailsCard}>
          <View style={styles.consultationHeader}>
            <Image 
              source={{ uri: consultation.imageUri }}
              style={styles.consultationImage}
            />
            <View style={styles.consultationInfo}>
              <Text style={styles.consultationTitle}>{consultation.title}</Text>
              <Text style={styles.consultationSubtitle}>{consultation.subtitle}</Text>
            </View>
          </View>

          {/* Pricing breakdown */}
          <View style={styles.pricingContainer}>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Consultation Fee</Text>
              <Text style={styles.pricingValue}>£{consultation.price.toFixed(2)}</Text>
            </View>

            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Platform Fee</Text>
              <Text style={styles.pricingValue}>£0.00</Text>
            </View>

            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Taxes</Text>
              <Text style={styles.pricingValue}>£0.00</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>£{consultation.price.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Terms and conditions */}
        <Text style={styles.termsText}>
          By proceeding, you agree to our terms and conditions
        </Text>
      </ScrollView>

      {/* Bottom buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
    backgroundColor: COLORS.lightBackground,
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
  durationContainer: {
    alignItems: 'center',
    marginBottom: SPACING.l,
  },
  durationText: {
    fontSize: FONT.size.m,
    color: COLORS.secondaryText,
  },
  detailsCard: {
    margin: SPACING.m,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    ...SHADOW.small,
    overflow: 'hidden',
  },
  consultationHeader: {
    flexDirection: 'row',
    padding: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  consultationImage: {
    width: 70,
    height: 70,
    borderRadius: SIZES.radiusSmall,
  },
  consultationInfo: {
    flex: 1,
    marginLeft: SPACING.m,
    justifyContent: 'center',
  },
  consultationTitle: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  consultationSubtitle: {
    fontSize: FONT.size.m,
    color: COLORS.secondaryText,
  },
  pricingContainer: {
    padding: SPACING.m,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.m,
  },
  pricingLabel: {
    fontSize: FONT.size.m,
    color: COLORS.secondaryText,
  },
  pricingValue: {
    fontSize: FONT.size.m,
    color: COLORS.primaryText,
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
  termsText: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    textAlign: 'center',
    marginVertical: SPACING.l,
    paddingHorizontal: SPACING.l,
  },
  buttonContainer: {
    padding: SPACING.m,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  continueButton: {
    backgroundColor: COLORS.warmAmber,
    paddingVertical: SPACING.m,
    borderRadius: SIZES.radiusSmall,
    alignItems: 'center',
  },
  continueButtonText: {
    color: COLORS.white,
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.bold,
  },
});

export default ConsultationCheckout; 