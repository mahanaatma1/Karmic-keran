import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT } from '../../constants/Theme';

export default function TabSelector({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'today', label: 'Today' },
    { id: 'completed', label: 'Completed' }
  ];

  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tab,
            activeTab === tab.id && styles.activeTab
          ]}
          onPress={() => onTabChange(tab.id)}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText
            ]}
          >
            {tab.label}
          </Text>
          {activeTab === tab.id && <View style={styles.activeLine} />}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: SPACING.l,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    marginRight: SPACING.m,
    position: 'relative',
  },
  activeTab: {},
  tabText: {
    fontSize: FONT.size.m,
    color: COLORS.secondaryText,
    fontWeight: FONT.weight.medium,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: FONT.weight.bold,
  },
  activeLine: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: COLORS.primary,
  },
}); 