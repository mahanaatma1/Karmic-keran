import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { COLORS, FONT, SPACING } from '../../constants/Theme';

const tabs = [
  { id: 'consultation', title: 'Consultation\nAvailability' },
  { id: 'services', title: 'Services and\nPricing' },
  { id: 'dayoff', title: 'Day Off' }
];

const AdminTabBar = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <TouchableOpacity 
          key={tab.id}
          style={[
            styles.tabItem,
            activeTab === tab.id && styles.activeTabItem
          ]}
          onPress={() => onTabChange(tab.id)}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === tab.id && styles.activeTabText
            ]}
            numberOfLines={2}
          >
            {tab.title}
          </Text>
          {activeTab === tab.id && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: COLORS.white,
  },
  tabItem: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  activeTabItem: {
    // No specific styles needed, the underline is a separate element
  },
  tabText: {
    fontSize: 14,
    color: '#4A4A4A',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#2196F3',
    fontWeight: '500',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#2196F3',
  },
});

export default AdminTabBar; 