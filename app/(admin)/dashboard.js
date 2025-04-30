import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, FONT } from '../../constants/Theme';

// Import dashboard components
import OverviewMetricsCard from '../../components/admin/OverviewMetricsCard';
import ActivityOverview from '../../components/admin/ActivityOverview';
import ServiceDistribution from '../../components/admin/ServiceDistribution';
import PopularServiceCard from '../../components/admin/PopularServiceCard';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Dashboard Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>
          This is your admin dashboard where you will see overview metrics of your application
        </Text>
      </View>
      
      {/* Overview Metrics Card */}
      <OverviewMetricsCard />
      
      {/* Activity Overview Section */}
      <ActivityOverview />
      
      {/* Service Distribution & Popular Services */}
      <View style={styles.servicesRow}>
        <View style={styles.serviceDistributionWrapper}>
          <ServiceDistribution />
        </View>
        <View style={styles.popularServiceWrapper}>
          <PopularServiceCard />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.l,
  },
  title: {
    fontSize: FONT.size.xl,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    textAlign: 'center',
    marginBottom: SPACING.l,
  },
  servicesRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.l,
    // For mobile views, we'll stack these components vertically
    flexWrap: 'wrap',
  },
  serviceDistributionWrapper: {
    flex: 1,
    minWidth: '100%', // On mobile, take full width
  },
  popularServiceWrapper: {
    flex: 1,
    minWidth: '100%', // On mobile, take full width
  },
}); 