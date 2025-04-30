import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT, SHADOW, SIZES } from '../../../constants/Theme';

const ServiceDistribution = () => {
  // Mock data
  const totalConsultations = 5;
  const totalRevenue = '£221';
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Service Distribution</Text>
        <Text style={styles.subtitle}>Consultations by Service Type</Text>
      </View>
      
      {/* Donut Chart Placeholder */}
      <View style={styles.chartContainer}>
        <View style={styles.donutChart}>
          <View style={styles.donutSegment1} />
          <View style={styles.donutSegment2} />
          <View style={styles.donutHole}>
            <Text style={styles.donutCenterValue}>{totalConsultations}</Text>
            <Text style={styles.donutCenterLabel}>{totalRevenue}</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.distributionLabel}>
        Distribution of consultations by service type
      </Text>
      <Text style={styles.distributionSubLabel}>
        Showing total consultations and revenue across all services
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    marginBottom: SPACING.l,
    ...SHADOW.small,
  },
  header: {
    marginBottom: SPACING.m,
  },
  title: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT.size.xs,
    color: COLORS.secondaryText,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginVertical: SPACING.m,
  },
  donutChart: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  donutSegment1: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 80,
    borderWidth: 20,
    borderColor: '#FF7D7D',
    transform: [{ rotate: '0deg' }],
  },
  donutSegment2: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 80,
    borderWidth: 20,
    borderColor: '#26A69A',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  donutHole: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutCenterValue: {
    fontSize: 24,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
  },
  donutCenterLabel: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
  },
  distributionLabel: {
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.medium,
    color: COLORS.primaryText,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  distributionSubLabel: {
    fontSize: FONT.size.xs,
    color: COLORS.secondaryText,
    textAlign: 'center',
  },
});

export default ServiceDistribution; 