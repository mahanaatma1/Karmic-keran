import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT, SPACING } from '../../constants/Theme';

const SearchBar = ({ value, onChangeText, onSubmit, onClear }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons 
          name="search-outline" 
          size={20} 
          color={COLORS.darkGray} 
          style={styles.searchIcon}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Search customer queries..."
          placeholderTextColor={COLORS.gray}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
          autoCapitalize="none"
        />
        
        {value?.length > 0 && (
          <TouchableOpacity onPress={onClear} style={styles.clearButton}>
            <Ionicons name="close-circle" size={18} color={COLORS.darkGray} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightBackground,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: FONT.regular,
    color: COLORS.darkText,
    height: '100%',
    paddingVertical: 8,
  },
  clearButton: {
    padding: 4,
  }
});

export default SearchBar; 