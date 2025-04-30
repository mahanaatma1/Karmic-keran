import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT, SIZES } from '../../constants/Theme';

const QuerySearchFilter = ({ 
  searchQuery, 
  onSearchChange, 
  selectedDate, 
  onDateSelect, 
  viewType, 
  onViewTypeChange 
}) => {
  return (
    <>
      {/* Search and Filters */}
      <View style={styles.filterContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.secondaryText} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, question, category"
            value={searchQuery}
            onChangeText={onSearchChange}
          />
        </View>

        <TouchableOpacity style={styles.dateButton} onPress={onDateSelect}>
          <Ionicons name="calendar-outline" size={18} color={COLORS.primary} />
          <Text style={styles.dateButtonText}>
            {selectedDate ? selectedDate : 'Pick a date'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* View type selector */}
      <View style={styles.viewTypeContainer}>
        <TouchableOpacity
          style={[styles.viewTypeButton, viewType === 'card' && styles.activeViewType]}
          onPress={() => onViewTypeChange('card')}
        >
          <Ionicons
            name="apps-outline"
            size={20}
            color={viewType === 'card' ? COLORS.primary : COLORS.secondaryText}
          />
          <Text
            style={[
              styles.viewTypeText,
              viewType === 'card' && styles.activeViewTypeText
            ]}
          >
            Card View
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.viewTypeButton, viewType === 'table' && styles.activeViewType]}
          onPress={() => onViewTypeChange('table')}
        >
          <Ionicons
            name="list-outline"
            size={20}
            color={viewType === 'table' ? COLORS.primary : COLORS.secondaryText}
          />
          <Text
            style={[
              styles.viewTypeText,
              viewType === 'table' && styles.activeViewTypeText
            ]}
          >
            Table View
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.l,
    marginBottom: SPACING.l,
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusSmall,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.m,
    marginRight: SPACING.m,
  },
  searchIcon: {
    marginRight: SPACING.s,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: FONT.size.s,
  },
  dateButton: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusSmall,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.m,
  },
  dateButtonText: {
    fontSize: FONT.size.s,
    color: COLORS.primary,
    marginLeft: SPACING.s,
  },
  viewTypeContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.l,
    marginBottom: SPACING.l,
  },
  viewTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.l,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    borderRadius: SIZES.radius,
  },
  activeViewType: {
    backgroundColor: COLORS.primary + '20', // 20% opacity
  },
  viewTypeText: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    marginLeft: SPACING.xs,
  },
  activeViewTypeText: {
    color: COLORS.primary,
    fontWeight: FONT.weight.medium,
  },
});

export default QuerySearchFilter; 