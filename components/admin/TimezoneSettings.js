import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  FlatList
} from 'react-native';
import { COLORS, FONT, SPACING, SIZES } from '../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import TimeSlotItem from './TimeSlotItem';

const TimezoneSettings = ({ 
  timezone,
  setTimezone,
  use12HourFormat,
  setUse12HourFormat,
  timeSlots,
  onRemoveTimeSlot,
  onAddTimeSlot,
  onUpdateStartTime,
  onUpdateEndTime,
  onUpdateStartPeriod,
  onUpdateEndPeriod,
  onSave
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <Ionicons name="globe-outline" size={24} color={COLORS.primary} style={styles.icon} />
          <View>
            <Text style={styles.sectionTitle}>Timezone Settings</Text>
            <Text style={styles.sectionSubtitle}>Set your consultation timezone</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.contentBox}>
        <View style={styles.settingContainer}>
          <Text style={styles.settingLabel}>Set Timezone</Text>
          <Text style={styles.settingDescription}>
            Select your timezone for consultations. This will be used to display available time slots to clients.
          </Text>
          
          <TouchableOpacity 
            style={styles.timezoneSelector} 
            onPress={() => {}}
          >
            <View style={styles.flagContainer}>
              <Text style={styles.flagEmoji}>🇬🇧</Text>
              <Text style={styles.timezoneText}>{timezone}</Text>
            </View>
            <Ionicons name="chevron-down" size={20} color={COLORS.secondaryText} />
          </TouchableOpacity>
        </View>
        
        {/* Available Time Slots */}
        <View style={styles.timeSlotSection}>
          <View style={styles.timeSlotHeader}>
            <View>
              <Text style={styles.timeSlotTitle}>Available Time Slots</Text>
              <Text style={styles.timeSlotSubtitle}>Add or remove custom time slots</Text>
            </View>
            <TouchableOpacity 
              style={styles.formatButton}
              onPress={() => setUse12HourFormat(!use12HourFormat)}
            >
              <Text style={styles.formatButtonText}>{use12HourFormat ? '12h' : '24h'}</Text>
            </TouchableOpacity>
          </View>
          
          {timeSlots.map((slot) => (
            <TimeSlotItem 
              key={slot.id}
              slot={slot}
              onRemove={onRemoveTimeSlot}
              onStartTimeChange={(value) => onUpdateStartTime(slot.id, value)}
              onEndTimeChange={(value) => onUpdateEndTime(slot.id, value)}
              onStartPeriodChange={(value) => onUpdateStartPeriod(slot.id, value)}
              onEndPeriodChange={(value) => onUpdateEndPeriod(slot.id, value)}
            />
          ))}
          
          <TouchableOpacity style={styles.addTimeSlotButton} onPress={onAddTimeSlot}>
            <Ionicons name="add" size={20} color={COLORS.primary} />
            <Text style={styles.addTimeSlotText}>Add Time Slot</Text>
          </TouchableOpacity>
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
  settingContainer: {
    marginBottom: SPACING.m,
  },
  settingLabel: {
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.medium,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  settingDescription: {
    fontSize: FONT.size.xs,
    color: COLORS.secondaryText,
    marginBottom: SPACING.m,
    lineHeight: 18,
  },
  timezoneSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.m,
    height: 48,
    backgroundColor: '#FAFAFA',
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagEmoji: {
    fontSize: FONT.size.l,
    marginRight: SPACING.xs,
  },
  timezoneText: {
    fontSize: FONT.size.m,
    color: COLORS.primaryText,
  },
  timeSlotSection: {
    marginBottom: SPACING.m,
    backgroundColor: '#FAFFFE',
    borderRadius: 8,
    padding: SPACING.m,
    borderWidth: 1,
    borderColor: '#E5F4F1',
  },
  timeSlotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.m,
  },
  timeSlotTitle: {
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.medium,
    color: COLORS.primaryText,
  },
  timeSlotSubtitle: {
    fontSize: FONT.size.xs,
    color: COLORS.secondaryText,
  },
  formatButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  formatButtonText: {
    color: COLORS.white,
    fontSize: FONT.size.xs,
    fontWeight: FONT.weight.medium,
  },
  addTimeSlotButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.m,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    backgroundColor: '#F5FAFF',
    marginTop: SPACING.m,
  },
  addTimeSlotText: {
    fontSize: FONT.size.s,
    color: COLORS.primary,
    marginLeft: SPACING.xs,
    fontWeight: FONT.weight.medium,
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

export default TimezoneSettings; 