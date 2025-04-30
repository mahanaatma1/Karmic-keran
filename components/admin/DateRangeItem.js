import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  Platform
} from 'react-native';
import { COLORS, FONT, SPACING, SIZES } from '../../constants/Theme';

const StatusBadge = ({ status, type }) => {
  const badgeStyle = type === 'Available' 
    ? styles.availableBadge 
    : styles.dayOffBadge;
  
  const textStyle = type === 'Available' 
    ? styles.availableBadgeText 
    : styles.dayOffBadgeText;
  
  return (
    <View style={[styles.statusBadge, badgeStyle]}>
      <Text style={textStyle}>{type}</Text>
    </View>
  );
};

const DateRangeItem = ({ 
  dateRange,
  type,
  status,
  duration
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.dateColumn}>
        <Text style={styles.dateText}>{dateRange}</Text>
      </View>
      
      <View style={styles.typeColumn}>
        <StatusBadge type={type} status={status} />
      </View>
      
      <View style={styles.statusColumn}>
        <View style={[styles.statusBadge, status === 'Past' ? styles.pastBadge : styles.upcomingBadge]}>
          <Text style={[styles.statusText, status === 'Past' ? styles.pastText : styles.upcomingText]}>
            {status}
          </Text>
        </View>
      </View>
      
      <View style={styles.durationColumn}>
        <Text style={styles.durationText}>{duration}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dateColumn: {
    flex: 3,
  },
  typeColumn: {
    flex: 1,
    alignItems: 'center',
  },
  statusColumn: {
    flex: 1,
    alignItems: 'center',
  },
  durationColumn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: FONT.size.s,
    color: COLORS.primaryText,
    fontWeight: FONT.weight.medium,
  },
  durationText: {
    fontSize: FONT.size.s,
    color: COLORS.primaryText,
  },
  statusBadge: {
    paddingHorizontal: SPACING.s,
    paddingVertical: SPACING.xs / 2,
    borderRadius: 20,
    minWidth: 70,
    alignItems: 'center',
  },
  availableBadge: {
    backgroundColor: '#E8F5E9',
  },
  dayOffBadge: {
    backgroundColor: '#FFEBEE',
  },
  pastBadge: {
    backgroundColor: '#EEEEEE',
  },
  upcomingBadge: {
    backgroundColor: '#E3F2FD',
  },
  availableBadgeText: {
    fontSize: FONT.size.xs,
    color: '#2E7D32',
  },
  dayOffBadgeText: {
    fontSize: FONT.size.xs,
    color: '#C62828',
  },
  statusText: {
    fontSize: FONT.size.xs,
  },
  pastText: {
    color: '#757575',
  },
  upcomingText: {
    color: '#1976D2',
  },
});

export default DateRangeItem; 