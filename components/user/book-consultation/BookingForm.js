import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT, SHADOW, SIZES } from '../../../constants/Theme';
import TextInput from '../../../components/TextInput';

const BookingForm = ({ consultation, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.date || !formData.time) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Pass form data to parent component
    onSubmit({
      ...formData,
      consultation
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Book {consultation.title}</Text>
        <Text style={styles.subtitle}>Duration: {consultation.duration} minutes | Price: £{consultation.price}</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Your Information</Text>
        
        <TextInput
          label="Full Name"
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
          placeholder="Enter your full name"
          required
        />
        
        <TextInput
          label="Email"
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          placeholder="Enter your email"
          keyboardType="email-address"
          required
        />
        
        <TextInput
          label="Phone Number"
          value={formData.phone}
          onChangeText={(text) => handleChange('phone', text)}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />
        
        <Text style={[styles.formLabel, { marginTop: SPACING.l }]}>Appointment Details</Text>
        
        <TextInput
          label="Preferred Date"
          value={formData.date}
          onChangeText={(text) => handleChange('date', text)}
          placeholder="Select a date"
          required
        />
        
        <TextInput
          label="Preferred Time"
          value={formData.time}
          onChangeText={(text) => handleChange('time', text)}
          placeholder="Select a time"
          required
        />
        
        <TextInput
          label="Additional Notes"
          value={formData.notes}
          onChangeText={(text) => handleChange('notes', text)}
          placeholder="Any specific questions or concerns?"
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: SPACING.l,
    backgroundColor: COLORS.lightBackground,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: FONT.size.xl,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT.size.m,
    color: COLORS.warmAmber,
    fontWeight: FONT.weight.medium,
  },
  formContainer: {
    padding: SPACING.l,
  },
  formLabel: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.medium,
    color: COLORS.primaryText,
    marginBottom: SPACING.m,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.l,
    paddingTop: SPACING.m,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  cancelButton: {
    flex: 1,
    padding: SPACING.m,
    marginRight: SPACING.m,
    borderRadius: SIZES.radiusSmall,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.secondaryText,
    fontWeight: FONT.weight.medium,
  },
  submitButton: {
    flex: 2,
    backgroundColor: COLORS.warmAmber,
    padding: SPACING.m,
    borderRadius: SIZES.radiusSmall,
    alignItems: 'center',
  },
  submitButtonText: {
    color: COLORS.white,
    fontWeight: FONT.weight.bold,
  },
});

export default BookingForm; 