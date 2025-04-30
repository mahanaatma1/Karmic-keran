import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { COLORS, FONT, SPACING } from '../../constants/Theme';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'new', label: 'New' },
  { id: 'inProgress', label: 'In Progress' },
  { id: 'closed', label: 'Closed' },
  { id: 'aries', label: 'Aries' },
  { id: 'taurus', label: 'Taurus' },
  { id: 'gemini', label: 'Gemini' },
  { id: 'career', label: 'Career' },
  { id: 'love', label: 'Love' },
];

const FilterSection = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterPress = (filterId) => {
    setActiveFilter(filterId);
    if (onFilterChange) {
      onFilterChange(filterId);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              activeFilter === filter.id && styles.activeFilterButton
            ]}
            onPress={() => handleFilterPress(filter.id)}
          >
            <Text 
              style={[
                styles.filterText,
                activeFilter === filter.id && styles.activeFilterText
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: COLORS.lightBackground,
  },
  activeFilterButton: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: 14,
    fontFamily: FONT.medium,
    color: COLORS.secondaryText,
  },
  activeFilterText: {
    color: COLORS.white,
  },
});

export default FilterSection; 