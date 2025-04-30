import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Switch
} from 'react-native';
import { COLORS, FONT, SPACING, SIZES } from '../../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';

const BookingTimeItem = ({ booking, onToggle }) => (
  <View style={styles.bookingTimeItem}>
    <View style={styles.bookingTimeInfo}>
      <Ionicons 
        name="time-outline" 
        size={20} 
        color={COLORS.primary} 
        style={styles.bookingTimeIcon}
      />
      <Text style={styles.bookingTimeText}>{booking.startTime} to {booking.endTime}</Text>
    </View>
    <Switch
      value={booking.active}
      onValueChange={(value) => onToggle(booking.id, value)}
      trackColor={{ false: COLORS.border, true: COLORS.primary }}
      thumbColor={COLORS.white}
    />
  </View>
);

const AvailabilitySettings = ({
  availableBookings,
  onToggleAvailability,
  onSave
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <Ionicons name="calendar-outline" size={24} color={COLORS.primary} style={styles.icon} />
          <View>
            <Text style={styles.sectionTitle}>Availability Settings</Text>
            <Text style={styles.sectionSubtitle}>Manage your available booking times</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.contentBox}>
        <View style={styles.bookingTimesContainer}>
          <Text style={styles.bookingTimesTitle}>Available for Bookings</Text>
          <Text style={styles.bookingTimesSubtitle}>Toggle availability for specific time slots</Text>
          
          {availableBookings.map(booking => (
            <BookingTimeItem 
              key={booking.id} 
              booking={booking}
              onToggle={onToggleAvailability}
            />
          ))}
        </View>
        
        <View style={styles.optionsContainer}>
          <View style={styles.optionItem}>
            <View style={styles.optionHeader}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" style={styles.optionIcon} />
              <Text style={styles.optionTitle}>Working Hours</Text>
            </View>
            <Text style={styles.optionDescription}>
              Standard hours when you're available for consultations
            </Text>
          </View>
          
          <View style={styles.optionItem}>
            <View style={styles.optionHeader}>
              <Ionicons name="close-circle" size={20} color="#FF5252" style={styles.optionIcon} />
              <Text style={styles.optionTitle}>Day Off</Text>
            </View>
            <Text style={styles.optionDescription}>
              Mark entire days as unavailable for bookings
            </Text>
          </View>
          
          <View style={styles.optionItem}>
            <View style={styles.optionHeader}>
              <Ionicons name="time" size={20} color="#2196F3" style={styles.optionIcon} />
              <Text style={styles.optionTitle}>Custom Hours</Text>
            </View>
            <Text style={styles.optionDescription}>
              Set specific times when you're available outside regular hours
            </Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    marginBottom: SPACING.m,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.m,
    backgroundColor: '#F8F9FF',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: SPACING.s,
  },
  sectionTitle: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
  },
  sectionSubtitle: {
    fontSize: FONT.size.xs,
    color: COLORS.secondaryText,
  },
  contentBox: {
    padding: SPACING.m,
  },
  bookingTimesContainer: {
    marginBottom: SPACING.m,
    backgroundColor: '#FAFFFE',
    borderRadius: 8,
    padding: SPACING.m,
    borderWidth: 1,
    borderColor: '#E5F4F1',
  },
  bookingTimesTitle: {
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.medium,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  bookingTimesSubtitle: {
    fontSize: FONT.size.xs,
    color: COLORS.secondaryText,
    marginBottom: SPACING.m,
  },
  bookingTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.s,
    borderBottomWidth: 1,
    borderBottomColor: '#E5F4F1',
    marginBottom: SPACING.xs,
  },
  bookingTimeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingTimeIcon: {
    marginRight: SPACING.s,
  },
  bookingTimeText: {
    fontSize: FONT.size.s,
    color: COLORS.primaryText,
  },
  optionsContainer: {
    marginBottom: SPACING.m,
  },
  optionItem: {
    backgroundColor: '#F8F9FF',
    borderRadius: 8,
    padding: SPACING.m,
    marginBottom: SPACING.s,
    borderWidth: 1,
    borderColor: '#E8ECFD',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  optionIcon: {
    marginRight: SPACING.xs,
  },
  optionTitle: {
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.medium,
    color: COLORS.primaryText,
  },
  optionDescription: {
    fontSize: FONT.size.xs,
    color: COLORS.secondaryText,
    lineHeight: 18,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: SPACING.m,
    alignItems: 'center',
    marginTop: SPACING.s,
  },
  saveButtonText: {
    color: COLORS.white,
    fontWeight: FONT.weight.medium,
    fontSize: FONT.size.m,
  },
});

export default AvailabilitySettings; 