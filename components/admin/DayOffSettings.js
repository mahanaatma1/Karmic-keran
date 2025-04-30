import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { COLORS, FONT, SPACING, SIZES } from '../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';

const DateRangeItem = ({ dateRange, type, status, duration }) => {
  const getTypeColor = () => {
    switch (type) {
      case 'Available':
        return '#4CAF50'; // Green
      case 'DayOff':
        return '#FF5252'; // Red
      default:
        return COLORS.secondaryText;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'Upcoming':
        return '#2196F3'; // Blue
      case 'Past':
        return '#9E9E9E'; // Gray
      default:
        return COLORS.secondaryText;
    }
  };

  return (
    <View style={styles.tableRow}>
      <View style={styles.dateColumn}>
        <Text style={styles.dateText}>{dateRange}</Text>
      </View>
      
      <View style={styles.typeColumn}>
        <View style={[styles.tagContainer, { backgroundColor: `${getTypeColor()}20` }]}>
          <Text style={[styles.tagText, { color: getTypeColor() }]}>{type}</Text>
        </View>
      </View>
      
      <View style={styles.statusColumn}>
        <View style={[styles.tagContainer, { backgroundColor: `${getStatusColor()}20` }]}>
          <Text style={[styles.tagText, { color: getStatusColor() }]}>{status}</Text>
        </View>
      </View>
      
      <View style={styles.durationColumn}>
        <Text style={styles.durationText}>{duration}</Text>
      </View>
    </View>
  );
};

const TableHeader = () => {
  return (
    <View style={styles.headerRow}>
      <View style={styles.dateColumn}>
        <Text style={styles.headerText}>Date Range</Text>
      </View>
      
      <View style={styles.typeColumn}>
        <Text style={styles.headerText}>Type</Text>
      </View>
      
      <View style={styles.statusColumn}>
        <Text style={styles.headerText}>Status</Text>
      </View>
      
      <View style={styles.durationColumn}>
        <Text style={styles.headerText}>Duration</Text>
      </View>
    </View>
  );
};

const DayOffSettings = ({ 
  dateRanges,
  onAddDateRange 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Day Off & Availability</Text>
          <Text style={styles.subtitle}>Manage your day off and availability schedule</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={onAddDateRange}
        >
          <Ionicons name="add" size={20} color={COLORS.white} />
          <Text style={styles.addButtonText}>Add Date</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tableContainer}>
        <TableHeader />
        
        <ScrollView style={styles.tableScrollView}>
          {dateRanges.length > 0 ? (
            dateRanges.map((range, index) => (
              <DateRangeItem 
                key={index}
                dateRange={range.dateRange}
                type={range.type}
                status={range.status}
                duration={range.duration}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={48} color={COLORS.secondaryText} />
              <Text style={styles.emptyStateText}>No date ranges added</Text>
              <Text style={styles.emptyStateSubtext}>Add your first date range to manage your availability</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: SPACING.m,
    padding: SPACING.m,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.m,
  },
  title: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT.size.xs,
    color: COLORS.secondaryText,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },
  tableContainer: {
    marginBottom: SPACING.s,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableScrollView: {
    maxHeight: 300,
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  headerText: {
    fontSize: FONT.size.xs,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  dateColumn: {
    flex: 3,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: FONT.size.s,
    color: COLORS.primaryText,
  },
  typeColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationColumn: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  durationText: {
    fontSize: FONT.size.s,
    color: COLORS.primaryText,
  },
  tagContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 70,
  },
  tagText: {
    fontSize: FONT.size.xs,
    fontWeight: FONT.weight.medium,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.background,
  },
  emptyStateText: {
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.medium,
    color: COLORS.primaryText,
    marginTop: SPACING.m,
    marginBottom: SPACING.xs,
  },
  emptyStateSubtext: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    textAlign: 'center',
  }
});

export default DayOffSettings; 