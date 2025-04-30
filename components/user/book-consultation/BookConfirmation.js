import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT, SIZES, SPACING } from '../../../constants/Theme';
import LottieView from 'lottie-react-native';

const BookConfirmation = ({ bookingDetails, onViewAppointments, onGoHome }) => {
  const { date, time, doctor = {} } = bookingDetails;

  // Default doctor data if not provided
  const doctorData = {
    name: doctor.name || 'Dr. Sarah Johnson',
    specialty: doctor.specialty || 'Dermatologist',
    image: doctor.image || require('../../../assets/images/icon.png'),
    ...doctor
  };

  const formatDate = () => {
    if (!date) return '';
    return `${date.day}, ${date.month} ${date.dayNumber}, ${date.date.format('YYYY')}`;
  };

  const formatTime = () => {
    if (!time) return '';
    return time.formattedTime;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.successContainer}>
          {/* Use a fallback Image if LottieView is not available */}
          <View style={styles.animationContainer}>
            <View style={styles.fallbackContainer}>
              <Ionicons name="checkmark-circle" size={80} color={COLORS.primary} />
            </View>
          </View>
          <Text style={styles.successTitle}>Booking Confirmed!</Text>
          <Text style={styles.successMessage}>
            Your appointment has been successfully booked.
          </Text>
        </View>

        <View style={styles.appointmentCard}>
          <View style={styles.doctorInfoContainer}>
            <Image
              source={typeof doctorData.image === 'string' 
                ? { uri: doctorData.image } 
                : doctorData.image}
              style={styles.doctorImage}
            />
            <View style={styles.doctorDetails}>
              <Text style={styles.doctorName}>{doctorData.name}</Text>
              <Text style={styles.doctorSpecialty}>{doctorData.specialty}</Text>
            </View>
          </View>

          <View style={styles.appointmentDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
              <Text style={styles.detailText}>{formatDate()}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="time-outline" size={20} color={COLORS.primary} />
              <Text style={styles.detailText}>{formatTime()}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="videocam-outline" size={20} color={COLORS.primary} />
              <Text style={styles.detailText}>Video Consultation</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Ionicons name="information-circle-outline" size={22} color={COLORS.primary} />
            <Text style={styles.infoText}>
              You will receive a notification 15 minutes before your appointment. Please ensure you have a stable internet connection for the video call.
            </Text>
          </View>

          <View style={styles.bookingIdContainer}>
            <Text style={styles.bookingIdLabel}>Booking ID</Text>
            <Text style={styles.bookingIdValue}>{`BK${Math.floor(100000 + Math.random() * 900000)}`}</Text>
          </View>
        </View>

        <View style={styles.reminderContainer}>
          <Text style={styles.reminderTitle}>What's Next?</Text>
          <View style={styles.reminderItem}>
            <View style={styles.reminderIconContainer}>
              <Ionicons name="document-text-outline" size={24} color={COLORS.white} />
            </View>
            <View style={styles.reminderTextContainer}>
              <Text style={styles.reminderItemTitle}>Medical History</Text>
              <Text style={styles.reminderItemDescription}>
                Complete your medical history form to help the doctor provide better consultation.
              </Text>
            </View>
          </View>
          <View style={styles.reminderItem}>
            <View style={styles.reminderIconContainer}>
              <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
            </View>
            <View style={styles.reminderTextContainer}>
              <Text style={styles.reminderItemTitle}>Reminders</Text>
              <Text style={styles.reminderItemDescription}>
                We'll send you reminders before your appointment.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={onGoHome}
        >
          <Ionicons name="home-outline" size={20} color={COLORS.primary} />
          <Text style={styles.secondaryButtonText}>Go to Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={onViewAppointments}
        >
          <Text style={styles.primaryButtonText}>View Appointments</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2 || '#f5f5f5',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  animationContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  animation: {
    width: 150,
    height: 150,
  },
  fallbackContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  successTitle: {
    fontSize: FONT.size.xxl,
    fontWeight: FONT.weight.bold,
    color: COLORS.black,
    marginBottom: 8,
  },
  successMessage: {
    fontSize: FONT.size.m,
    color: COLORS.darkGray || '#666',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  appointmentCard: {
    marginHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doctorInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray || '#eee',
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.black,
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: FONT.size.s,
    color: COLORS.darkGray || '#666',
  },
  appointmentDetails: {
    marginTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: FONT.size.m,
    color: COLORS.black,
    marginLeft: 12,
  },
  infoContainer: {
    backgroundColor: `${COLORS.primary}10`,
    borderRadius: 8,
    flexDirection: 'row',
    padding: 12,
    marginTop: 16,
    alignItems: 'flex-start',
  },
  infoText: {
    fontSize: FONT.size.s,
    color: COLORS.darkGray || '#666',
    marginLeft: 8,
    flex: 1,
  },
  bookingIdContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: COLORS.lightBackground || '#f9f9f9',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingIdLabel: {
    fontSize: FONT.size.s,
    color: COLORS.darkGray || '#666',
  },
  bookingIdValue: {
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.bold,
    color: COLORS.primary,
  },
  reminderContainer: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  reminderTitle: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.black,
    marginBottom: 16,
  },
  reminderItem: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reminderIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reminderTextContainer: {
    flex: 1,
  },
  reminderItemTitle: {
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.bold,
    color: COLORS.black,
    marginBottom: 4,
  },
  reminderItemDescription: {
    fontSize: FONT.size.s,
    color: COLORS.darkGray || '#666',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray || '#eee',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  secondaryButtonText: {
    fontSize: FONT.size.m,
    color: COLORS.primary,
    fontWeight: FONT.weight.medium,
    marginLeft: 8,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: FONT.size.m,
    color: COLORS.white,
    fontWeight: FONT.weight.medium,
  },
});

export default BookConfirmation; 