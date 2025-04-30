import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT } from '../../../constants/Theme';

const screenWidth = Dimensions.get('window').width;
const cardPadding = SPACING.m;
const cardMargin = 4;

export default function OverviewMetrics({ metrics = { booked: 4, completed: 1, upcoming: 3 } }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <Ionicons name="analytics-outline" size={24} color={COLORS.primary} style={styles.icon} />
          <View>
            <Text style={styles.sectionTitle}>Today's Overview</Text>
            <Text style={styles.sectionSubtitle}>Real-time consultation metrics</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.contentBox}>
        <View style={styles.metricsContainer}>
          <View style={[styles.metricCard, styles.purpleCard]}>
            <Text style={styles.metricTitle}>Total Booked</Text>
            <View style={styles.metricValueContainer}>
              <Text style={styles.metricValue} numberOfLines={1}>{metrics.booked}</Text>
              <Text style={styles.metricLabel}>consultations</Text>
            </View>
            <View style={styles.iconWrapper}>
              <Ionicons name="time-outline" size={24} color="rgba(255,255,255,0.3)" />
            </View>
          </View>

          <View style={[styles.metricCard, styles.greenCard]}>
            <Text style={styles.metricTitle}>Completed</Text>
            <View style={styles.metricValueContainer}>
              <Text style={styles.metricValue} numberOfLines={1}>{metrics.completed}</Text>
              <Text style={styles.metricLabel}>sessions</Text>
            </View>
            <View style={styles.iconWrapper}>
              <Ionicons name="checkmark-outline" size={24} color="rgba(255,255,255,0.3)" />
            </View>
          </View>

          <View style={[styles.metricCard, styles.orangeCard]}>
            <Text style={styles.metricTitle}>Upcoming</Text>
            <View style={styles.metricValueContainer}>
              <Text style={styles.metricValue} numberOfLines={1}>{metrics.upcoming}</Text>
              <Text style={styles.metricLabel}>sessions</Text>
            </View>
            <View style={styles.iconWrapper}>
              <Ionicons name="arrow-forward-outline" size={24} color="rgba(255,255,255,0.3)" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    marginBottom: SPACING.m,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.m,
    backgroundColor: '#F8F9FF',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: SPACING.s,
  },
  sectionTitle: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
  },
  sectionSubtitle: {
    fontSize: FONT.size.xs,
    color: COLORS.secondaryText,
  },
  contentBox: {
    padding: SPACING.m,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricCard: {
    flex: 1,
    borderRadius: 8,
    padding: cardPadding,
    marginHorizontal: cardMargin,
    height: 100,
    position: 'relative',
    justifyContent: 'space-between',
  },
  purpleCard: {
    backgroundColor: '#8E44AD',
    marginLeft: 0,
  },
  greenCard: {
    backgroundColor: '#27AE60',
  },
  orangeCard: {
    backgroundColor: '#F39C12',
    marginRight: 0,
  },
  metricTitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: FONT.size.xs,
    fontWeight: FONT.weight.medium,
    marginBottom: 2,
  },
  metricValueContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  metricValue: {
    color: COLORS.white,
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
  },
  metricLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
  },
  iconWrapper: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    opacity: 0.7,
  },
}); 