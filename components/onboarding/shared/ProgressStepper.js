import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const ProgressStepper = ({ currentStep, totalSteps = 3 }) => {
  const steps = [];
  
  for (let i = 0; i < totalSteps; i++) {
    // For current step
    if (i === currentStep) {
      steps.push(
        <View key={i} style={[styles.step, styles.activeStep]}>
          <View style={styles.innerDot} />
        </View>
      );
    } 
    // For completed steps
    else if (i < currentStep) {
      steps.push(
        <View key={i} style={[styles.step, styles.completedStep]} />
      );
    } 
    // For future steps
    else {
      steps.push(
        <View key={i} style={styles.step} />
      );
    }
    
    // Add connector line between dots, except after the last one
    if (i < totalSteps - 1) {
      steps.push(
        <View 
          key={`line-${i}`} 
          style={[
            styles.line, 
            i < currentStep ? styles.activeLine : null
          ]} 
        />
      );
    }
  }

  return (
    <View style={styles.container}>
      {steps}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  step: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStep: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255, 107, 0, 0.2)',
    borderWidth: 2,
    borderColor: '#FF6B00',
  },
  completedStep: {
    backgroundColor: '#FF6B00',
  },
  innerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6B00',
  },
  line: {
    width: 30,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 5,
  },
  activeLine: {
    backgroundColor: '#FF6B00',
  },
});

export default ProgressStepper; 