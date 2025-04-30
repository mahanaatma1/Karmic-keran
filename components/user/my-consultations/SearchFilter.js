import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { COLORS, SPACING, FONT, SIZES, SHADOW } from '../../../constants/Theme';

const SearchFilter = ({ searchQuery, onSearchChange, onDatePress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by ID, client, service, status"
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholderTextColor={COLORS.secondaryText}
        />
      </View>
      
      <TouchableOpacity style={styles.dateButton} onPress={onDatePress}>
        <Text style={styles.dateButtonText}>Pick a date</Text>
        <Text style={styles.calendarIcon}>📅</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SPACING.m,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flex: 2,
    marginRight: SPACING.m,
  },
  searchInput: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusSmall,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.m,
    fontSize: FONT.size.m,
    color: COLORS.primaryText,
  },
  dateButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusSmall,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.m,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateButtonText: {
    fontSize: FONT.size.m,
    color: COLORS.secondaryText,
  },
  calendarIcon: {
    fontSize: FONT.size.m,
  }
});

export default SearchFilter; 