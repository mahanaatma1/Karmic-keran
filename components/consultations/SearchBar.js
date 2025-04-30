import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT, SIZES } from '../../constants/Theme';

const screenWidth = Dimensions.get('window').width;

export default function SearchBar({ value, onChangeText, onDateSelect, selectedDate }) {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons 
          name="search-outline" 
          size={20} 
          color={COLORS.secondaryText} 
          style={styles.searchIcon} 
        />
        <TextInput
          style={styles.input}
          placeholder="Search by ID, client, service, status"
          placeholderTextColor={COLORS.secondaryText}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      
      <TouchableOpacity style={styles.dateButton} onPress={onDateSelect}>
        <Ionicons name="calendar-outline" size={20} color={COLORS.primaryText} />
        <Text style={[
          styles.dateText,
          !selectedDate && styles.placeholderText
        ]}>
          {selectedDate || "Pick a date"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.l,
  },
  searchContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.m,
    height: 48,
    minWidth: 50,
  },
  searchIcon: {
    marginRight: SPACING.s,
  },
  input: {
    flex: 1,
    fontSize: FONT.size.m,
    color: COLORS.primaryText,
    height: '100%',
    paddingVertical: 0,
  },
  dateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.m,
    height: 48,
    marginLeft: SPACING.m,
    minWidth: 40,
  },
  dateText: {
    flex: 1,
    fontSize: FONT.size.m,
    color: COLORS.primaryText,
    marginLeft: SPACING.xs,
  },
  placeholderText: {
    color: COLORS.secondaryText,
  }
}); 