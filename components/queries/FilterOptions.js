import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT, SPACING } from '../../constants/Theme';

const FilterOptions = ({ 
  selectedFilter, 
  onFilterChange,
  onDateSelect
}) => {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'urgent', label: 'Urgent' },
    { id: 'completed', label: 'Completed' },
    { id: 'pending', label: 'Pending' }
  ];

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              selectedFilter === filter.id && styles.selectedFilterButton
            ]}
            onPress={() => onFilterChange(filter.id)}
          >
            <Text 
              style={[
                styles.filterText,
                selectedFilter === filter.id && styles.selectedFilterText
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.dateButton}
        onPress={onDateSelect}
      >
        <Ionicons name="calendar-outline" size={18} color={COLORS.primary} />
        <Text style={styles.dateText}>Date</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    justifyContent: 'space-between',
  },
  filtersContainer: {
    flexGrow: 1,
    paddingRight: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: COLORS.lightBackground,
  },
  selectedFilterButton: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: 14,
    fontFamily: FONT.medium,
    color: COLORS.darkText,
  },
  selectedFilterText: {
    color: COLORS.white,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.lightBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dateText: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  }
});

export default FilterOptions; 