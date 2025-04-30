import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Image
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';

const ConsultationSummary = ({ bookingDetails, onBack, onConfirm }) => {
  const { date, time, doctor = {} } = bookingDetails;

  // Default doctor data if not provided
  const doctorData = {
    name: doctor.name || 'Dr. Sarah Johnson',
    specialty: doctor.specialty || 'Dermatologist',
    rating: doctor.rating || 4.8,
    reviews: doctor.reviews || 128,
    image: doctor.image || require('../../../assets/images/doctor-placeholder.png'),
    experience: doctor.experience || '8 years',
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

  const renderDoctorInfo = () => {
    return (
      <View style={styles.doctorCard}>
        <View style={styles.doctorHeader}>
          <Text style={styles.sectionTitle}>Specialist Details</Text>
        </View>
        <View style={styles.doctorInfo}>
          <Image
            source={typeof doctorData.image === 'string' 
              ? { uri: doctorData.image } 
              : doctorData.image}
            style={styles.doctorImage}
          />
          <View style={styles.doctorDetails}>
            <Text style={styles.doctorName}>{doctorData.name}</Text>
            <Text style={styles.doctorSpecialty}>{doctorData.specialty}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFC107" />
              <Text style={styles.ratingText}>{doctorData.rating}</Text>
              <Text style={styles.reviewsText}>({doctorData.reviews} reviews)</Text>
            </View>
            <View style={styles.experienceContainer}>
              <Ionicons name="medkit-outline" size={16} color={COLORS.primary} />
              <Text style={styles.experienceText}>{doctorData.experience} experience</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderAppointmentDetails = () => {
    return (
      <View style={styles.appointmentCard}>
        <Text style={styles.sectionTitle}>Appointment Details</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{formatDate()}</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="time-outline" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailValue}>{formatTime()}</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="videocam-outline" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Consultation Type</Text>
              <Text style={styles.detailValue}>Video Call</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="cash-outline" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Consultation Fee</Text>
              <Text style={styles.detailValue}>$45.00</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderNotes = () => {
    return (
      <View style={styles.notesCard}>
        <Text style={styles.sectionTitle}>Important Notes</Text>
        <View style={styles.noteItem}>
          <Ionicons name="information-circle-outline" size={18} color={COLORS.primary} style={styles.noteIcon} />
          <Text style={styles.noteText}>Please join the call 5 minutes before the scheduled time.</Text>
        </View>
        <View style={styles.noteItem}>
          <Ionicons name="information-circle-outline" size={18} color={COLORS.primary} style={styles.noteIcon} />
          <Text style={styles.noteText}>You can cancel or reschedule up to 4 hours before the appointment.</Text>
        </View>
        <View style={styles.noteItem}>
          <Ionicons name="information-circle-outline" size={18} color={COLORS.primary} style={styles.noteIcon} />
          <Text style={styles.noteText}>Have your recent medical reports handy for reference during the consultation.</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderDoctorInfo()}
        {renderAppointmentDetails()}
        {renderNotes()}
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={onBack}
        >
          <Ionicons name="arrow-back" size={20} color={COLORS.primary} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.confirmButton}
          onPress={onConfirm}
        >
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
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
  doctorCard: {
    margin: 16,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  doctorHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  doctorInfo: {
    flexDirection: 'row',
    padding: 16,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  doctorDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  doctorName: {
    ...FONTS.h4,
    color: COLORS.black,
    marginBottom: 4,
  },
  doctorSpecialty: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingText: {
    ...FONTS.body4,
    color: COLORS.black,
    marginLeft: 4,
    marginRight: 6,
  },
  reviewsText: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  experienceText: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    marginLeft: 6,
  },
  appointmentCard: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    ...FONTS.h4,
    color: COLORS.black,
    marginBottom: 16,
  },
  detailsContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  detailIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${COLORS.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    marginBottom: 4,
  },
  detailValue: {
    ...FONTS.body3,
    color: COLORS.black,
  },
  notesCard: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 100,
  },
  noteItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  noteIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  noteText: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginRight: 12,
  },
  backButtonText: {
    ...FONTS.body4,
    color: COLORS.primary,
    marginLeft: 8,
  },
  confirmButton: {
    flex: 1,
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    ...FONTS.body3,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default ConsultationSummary; 