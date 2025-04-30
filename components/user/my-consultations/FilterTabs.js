import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT, SIZES } from '../../../constants/Theme';

const FilterTabs = ({ activeTab, onTabChange }) => {
  const tabs = ['All', 'Today', 'Completed'];
  
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tab,
            activeTab === index && styles.activeTab
          ]}
          onPress={() => onTabChange(index)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === index && styles.activeTabText
            ]}
          >
            {tab}
          </Text>
          {activeTab === index && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: SPACING.m,
  },
  tab: {
    marginRight: SPACING.xl,
    paddingVertical: SPACING.m,
    position: 'relative',
  },
  activeTab: {
    // Active tab styling
  },
  tabText: {
    fontSize: FONT.size.m,
    color: COLORS.secondaryText,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: FONT.weight.bold,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
});

export default FilterTabs; 