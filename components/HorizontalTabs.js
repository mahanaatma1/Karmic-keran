import React, { useRef } from 'react';
import { ScrollView, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT } from '../constants/Theme';

export default function HorizontalTabs({ tabs, activeTab, onTabPress }) {
  const scrollViewRef = useRef(null);

  const handleTabPress = (index) => {
    onTabPress(index);
    
    // Scroll to make the selected tab visible - adjust for variable tab widths
    scrollViewRef.current?.scrollTo({
      x: index * (100 + SPACING.m * 2), // Base width plus padding
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tabButton,
              index === activeTab && styles.activeTabButton
            ]}
            onPress={() => handleTabPress(index)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                index === activeTab && styles.activeTabText,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {tab}
            </Text>
            {index === activeTab && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  scrollContainer: {
    paddingHorizontal: SPACING.m,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabButton: {
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    position: 'relative',
    marginRight: SPACING.xs,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100, // Ensure a minimum width for each tab
    flex: 1, // Allow tabs to grow based on available space
  },
  tabText: {
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.medium,
    color: COLORS.black,
    textAlign: 'center', // Center text horizontally
  },
  activeTabText: {
    color: COLORS.goldenOrange,
    fontWeight: FONT.weight.bold,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: COLORS.goldenOrange,
  },
  activeTabButton: {
    // Add any additional styles for the active tab button if needed
  },
});