import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT, SHADOW } from '../../../constants/Theme';

export default function DailySchedule() {
  // Define time slots with their appropriate icons
  const timeSlots = [
    { id: 'morning', label: 'Morning', icon: 'sunny-outline', color: '#FFB347' },
    { id: 'afternoon', label: 'Afternoon', icon: 'partly-sunny-outline', color: '#FFB347' },
    { id: 'evening', label: 'Evening', icon: 'moon-outline', color: '#4682B4' },
    { id: 'night', label: 'Night', icon: 'moon', color: '#4682B4' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <Ionicons name="time-outline" size={24} color={COLORS.primary} style={styles.icon} />
          <View>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            <Text style={styles.sectionSubtitle}>All consultations for today</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.contentBox}>
        {timeSlots.map((slot) => (
          <View key={slot.id} style={styles.timeSlotContainer}>
            <View style={styles.timeSlotHeader}>
              <Ionicons name={slot.icon} size={20} color={slot.color} />
              <Text style={styles.timeSlotText}>{slot.label}</Text>
              <View style={styles.consultationCount}>
                <Text style={styles.countText}>0 Consultations</Text>
              </View>
            </View>
            <View style={styles.emptySlot}>
              <Text style={styles.emptyText}>No consultations available for {slot.label}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

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
  timeSlotContainer: {
    marginBottom: SPACING.m,
  },
  timeSlotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    padding: SPACING.s,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  timeSlotText: {
    fontSize: FONT.size.m,
    color: COLORS.primaryText,
    fontWeight: FONT.weight.medium,
    marginLeft: SPACING.s,
    flex: 1,
  },
  consultationCount: {
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  countText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: FONT.weight.medium,
  },
  emptySlot: {
    backgroundColor: COLORS.white,
    padding: SPACING.m,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#EAEAEA',
  },
  emptyText: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
  },
}); 