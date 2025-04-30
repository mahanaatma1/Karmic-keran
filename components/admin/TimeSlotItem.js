import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput,
  TouchableOpacity
} from 'react-native';
import { COLORS, FONT, SPACING, SIZES } from '../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';

const TimeSlotItem = ({ 
  slot, 
  onRemove,
  onStartTimeChange,
  onEndTimeChange,
  onStartPeriodChange,
  onEndPeriodChange
}) => {
  return (
    <View style={styles.timeSlotContainer}>
      <View style={styles.timeSlotRow}>
        <View style={styles.timeSlotColumn}>
          <Text style={styles.timeSlotLabel}>Start Time</Text>
          <View style={styles.timeInputContainer}>
            <TextInput 
              style={styles.timeInput} 
              value={slot.startTime}
              onChangeText={(text) => onStartTimeChange(slot.id, text)}
              keyboardType="numbers-and-punctuation"
            />
            <TouchableOpacity 
              style={styles.periodSelector}
              onPress={() => onStartPeriodChange(slot.id, slot.startPeriod === 'AM' ? 'PM' : 'AM')}
            >
              <Text style={styles.periodText}>{slot.startPeriod}</Text>
              <Ionicons name="chevron-down" size={16} color={COLORS.secondaryText} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.timeSlotColumn}>
          <Text style={styles.timeSlotLabel}>End Time</Text>
          <View style={styles.timeInputContainer}>
            <TextInput 
              style={styles.timeInput} 
              value={slot.endTime}
              onChangeText={(text) => onEndTimeChange(slot.id, text)}
              keyboardType="numbers-and-punctuation"
            />
            <TouchableOpacity 
              style={styles.periodSelector}
              onPress={() => onEndPeriodChange(slot.id, slot.endPeriod === 'AM' ? 'PM' : 'AM')}
            >
              <Text style={styles.periodText}>{slot.endPeriod}</Text>
              <Ionicons name="chevron-down" size={16} color={COLORS.secondaryText} />
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => onRemove(slot.id)}
        >
          <Ionicons name="close" size={20} color={COLORS.secondaryText} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeSlotContainer: {
    marginBottom: SPACING.m,
  },
  timeSlotRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeSlotColumn: {
    flex: 1,
    marginRight: SPACING.xs,
  },
  timeSlotLabel: {
    fontSize: FONT.size.xs,
    color: COLORS.secondaryText,
    marginBottom: SPACING.xs,
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    height: 40,
    backgroundColor: COLORS.white,
  },
  timeInput: {
    flex: 1,
    paddingHorizontal: SPACING.s,
    fontSize: FONT.size.s,
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.s,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
    height: '100%',
  },
  periodText: {
    fontSize: FONT.size.xs,
    marginRight: SPACING.xs,
  },
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.lightBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.xs,
  },
});

export default TimeSlotItem; 