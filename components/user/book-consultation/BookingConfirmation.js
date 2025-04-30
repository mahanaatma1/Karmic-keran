import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT, SIZES } from '../../../constants/Theme';

const BookingConfirmation = ({ bookingDetails, onClose }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
        
        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.description}>
          Your {bookingDetails.consultation.title} consultation has been scheduled for {bookingDetails.date} at {bookingDetails.time}.
        </Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Consultation:</Text>
            <Text style={styles.detailValue}>{bookingDetails.consultation.title}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date:</Text>
            <Text style={styles.detailValue}>{bookingDetails.date}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time:</Text>
            <Text style={styles.detailValue}>{bookingDetails.time}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Duration:</Text>
            <Text style={styles.detailValue}>{bookingDetails.consultation.duration} minutes</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Price:</Text>
            <Text style={styles.detailValue}>£{bookingDetails.consultation.price}</Text>
          </View>
        </View>
        
        <Text style={styles.note}>
          A confirmation email has been sent to {bookingDetails.email}. You can manage your consultation from the My Consultations section.
        </Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={onClose}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SPACING.l,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.m,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.l,
  },
  checkmark: {
    fontSize: 40,
    color: COLORS.white,
    fontWeight: FONT.weight.bold,
  },
  title: {
    fontSize: FONT.size.xxl,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    marginBottom: SPACING.m,
    textAlign: 'center',
  },
  description: {
    fontSize: FONT.size.m,
    color: COLORS.secondaryText,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  detailsContainer: {
    backgroundColor: COLORS.lightBackground,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    width: '100%',
    marginBottom: SPACING.xl,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.xs,
  },
  detailLabel: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    fontWeight: FONT.weight.medium,
  },
  detailValue: {
    fontSize: FONT.size.s,
    color: COLORS.primaryText,
    fontWeight: FONT.weight.bold,
  },
  note: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    textAlign: 'center',
    marginBottom: SPACING.l,
  },
  button: {
    backgroundColor: COLORS.warmAmber,
    borderRadius: SIZES.radiusSmall,
    padding: SPACING.m,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: FONT.weight.bold,
    fontSize: FONT.size.m,
  },
});

export default BookingConfirmation; 