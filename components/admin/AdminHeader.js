import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity
} from 'react-native';
import { COLORS, FONT, SPACING } from '../../constants/Theme';

const tabs = [
  { id: 'consultation', title: 'Consultation Availability' },
  { id: 'services', title: 'Services and Pricing' },
  { id: 'dayoff', title: 'Day Off' }
];

const AdminHeader = ({ activeTab, onTabChange }) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Panel Settings</Text>
        <Text style={styles.headerSubtitle}>Manage your consultation slot availability and your services.</Text>
      </View>
      
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity 
            key={tab.id}
            style={styles.tabItem}
            onPress={() => onTabChange(tab.id)}
          >
            <Text 
              style={[
                styles.tabText, 
                activeTab === tab.id && styles.activeTab
              ]}
            >
              {tab.title}
            </Text>
            {activeTab === tab.id && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: SPACING.l,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: FONT.size.xl,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  tabItem: {
    position: 'relative',
    marginRight: SPACING.l,
    paddingVertical: SPACING.m,
  },
  tabText: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
  },
  activeTab: {
    color: COLORS.primary,
    fontWeight: FONT.weight.medium,
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

export default AdminHeader; 