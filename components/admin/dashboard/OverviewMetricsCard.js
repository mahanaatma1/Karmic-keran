import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT, SIZES } from '../../../constants/Theme';

const MetricBox = ({ title, value, subValue, subLabel }) => {
  return (
    <View style={styles.metricBox}>
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      {subValue && (
        <View style={styles.subValueContainer}>
          <Text style={styles.subValueLabel}>{subLabel}:</Text>
          <Text style={styles.subValue}>{subValue}</Text>
        </View>
      )}
    </View>
  );
};

const OverviewMetricsCard = () => {
  // Mock data
  const metrics = {
    consultations: { total: 5, subLabel: 'sessions' },
    revenue: { total: '£221', decimal: '.00', subLabel: 'Revenue today', subValue: '£0' },
    timeSpent: { total: '4.50', subLabel: 'hours', subLabel2: 'Avg. earnings', subValue: '£49.72/hour' },
    clients: { total: 11, subLabel: 'clients', subLabel2: 'New this month', subValue: '11' },
    visits: { total: 0, subLabel: 'today' },
    downloads: { total: 0, subLabel: 'total', ios: 0, android: 0 }
  };

  return (
    <LinearGradient
      colors={['#FF7D7D', '#FFA33C', '#4CAF50', '#2196F3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientContainer}
    >
      <View style={styles.headerContainer}>
        <Ionicons name="stats-chart" size={24} color={COLORS.white} style={styles.headerIcon} />
        <View>
          <Text style={styles.headerTitle}>Overview Metrics</Text>
          <Text style={styles.headerSubtitle}>Real-time insights for consultations, revenue, and client engagement</Text>
        </View>
      </View>

      <View style={styles.metricsContainer}>
        {/* Top Row */}
        <View style={styles.metricsRow}>
          {/* Consultations */}
          <View style={[styles.metricBox, styles.metricBoxWide]}>
            <Text style={styles.metricTitle}>Total consultations</Text>
            <View style={styles.metricValueRow}>
              <Text style={styles.metricValueLarge}>{metrics.consultations.total}</Text>
              <Text style={styles.metricUnit}> {metrics.consultations.subLabel}</Text>
            </View>
          </View>

          {/* Revenue */}
          <View style={[styles.metricBox, styles.metricBoxWide]}>
            <Text style={styles.metricTitle}>Total revenue</Text>
            <View style={styles.metricValueRow}>
              <Text style={styles.metricValueLarge}>{metrics.revenue.total}</Text>
              <Text style={styles.metricDecimal}>{metrics.revenue.decimal}</Text>
            </View>
            <View style={styles.subValueContainer}>
              <Text style={styles.subValueLabel}>{metrics.revenue.subLabel}:</Text>
              <Text style={styles.subValue}>{metrics.revenue.subValue}</Text>
            </View>
          </View>
        </View>

        {/* Middle Row */}
        <View style={styles.metricsRow}>
          {/* Time Spent */}
          <View style={[styles.metricBox, styles.metricBoxWide]}>
            <Text style={styles.metricTitle}>Total time spent</Text>
            <View style={styles.metricValueRow}>
              <Text style={styles.metricValueLarge}>{metrics.timeSpent.total}</Text>
              <Text style={styles.metricUnit}> {metrics.timeSpent.subLabel}</Text>
            </View>
            <View style={styles.subValueContainer}>
              <Text style={styles.subValueLabel}>{metrics.timeSpent.subLabel2}:</Text>
              <Text style={styles.subValue}>{metrics.timeSpent.subValue}</Text>
            </View>
          </View>

          {/* Clients */}
          <View style={[styles.metricBox, styles.metricBoxWide]}>
            <Text style={styles.metricTitle}>Total clients</Text>
            <View style={styles.metricValueRow}>
              <Text style={styles.metricValueLarge}>{metrics.clients.total}</Text>
              <Text style={styles.metricUnit}> {metrics.clients.subLabel}</Text>
            </View>
            <View style={styles.subValueContainer}>
              <Text style={styles.subValueLabel}>{metrics.clients.subLabel2}:</Text>
              <Text style={styles.subValue}>{metrics.clients.subValue}</Text>
            </View>
          </View>
        </View>

        {/* Bottom Row */}
        <View style={styles.metricsRow}>
          {/* Landing Page Visits */}
          <View style={[styles.metricBox, styles.metricBoxWide]}>
            <Text style={styles.metricTitle}>Landing page visits</Text>
            <View style={styles.metricValueRow}>
              <Text style={styles.metricValueLarge}>{metrics.visits.total}</Text>
              <Text style={styles.metricUnit}> {metrics.visits.subLabel}</Text>
            </View>
          </View>

          {/* App Downloads */}
          <View style={[styles.metricBox, styles.metricBoxWide]}>
            <Text style={styles.metricTitle}>Mobile app downloads</Text>
            <View style={styles.metricValueRow}>
              <Text style={styles.metricValueLarge}>{metrics.downloads.total}</Text>
              <Text style={styles.metricUnit}> {metrics.downloads.subLabel}</Text>
            </View>
            <View style={styles.platformContainer}>
              <View style={styles.platformItem}>
                <Text style={styles.platformLabel}>iOS:</Text>
                <Text style={styles.platformValue}>{metrics.downloads.ios}</Text>
              </View>
              <View style={styles.platformItem}>
                <Text style={styles.platformLabel}>Android:</Text>
                <Text style={styles.platformValue}>{metrics.downloads.android}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    marginBottom: SPACING.l,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.m,
  },
  headerIcon: {
    marginRight: SPACING.s,
  },
  headerTitle: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: FONT.size.xs,
    color: COLORS.white,
    opacity: 0.9,
  },
  metricsContainer: {
    padding: SPACING.s,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.s,
  },
  metricBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: SIZES.radiusSmall,
    padding: SPACING.m,
    flex: 1,
    marginHorizontal: SPACING.xs,
  },
  metricBoxWide: {
    flex: 1,
  },
  metricTitle: {
    color: COLORS.white,
    fontSize: FONT.size.xs,
    marginBottom: SPACING.xs,
    opacity: 0.9,
  },
  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  metricValue: {
    color: COLORS.white,
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
  },
  metricValueLarge: {
    color: COLORS.white,
    fontSize: FONT.size.xxl,
    fontWeight: FONT.weight.bold,
  },
  metricDecimal: {
    color: COLORS.white,
    fontSize: FONT.size.s,
    opacity: 0.8,
  },
  metricUnit: {
    color: COLORS.white,
    fontSize: FONT.size.xs,
    opacity: 0.8,
  },
  subValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  subValueLabel: {
    color: COLORS.white,
    fontSize: FONT.size.xs,
    opacity: 0.8,
    marginRight: SPACING.xs,
  },
  subValue: {
    color: COLORS.white,
    fontSize: FONT.size.xs,
    fontWeight: FONT.weight.medium,
  },
  platformContainer: {
    flexDirection: 'row',
    marginTop: SPACING.xs,
    justifyContent: 'space-between',
  },
  platformItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformLabel: {
    color: COLORS.white,
    fontSize: FONT.size.xs,
    opacity: 0.8,
    marginRight: SPACING.xs,
  },
  platformValue: {
    color: COLORS.white,
    fontSize: FONT.size.xs,
    fontWeight: FONT.weight.medium,
  },
});

export default OverviewMetricsCard; 