import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT, SHADOW, SIZES } from '../../../constants/Theme';

const timeRangeOptions = [
  { label: 'Last 7 days', value: '7' },
  { label: 'Last 30 days', value: '30' },
  { label: 'Last 3 months', value: '90' },
];

const ActivityOverview = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Activity Overview</Text>
          <Text style={styles.subtitle}>Showing registrations and consultations over time</Text>
        </View>
        
        <View style={styles.dropdown}>
          <Text style={styles.dropdownLabel}>
            {timeRangeOptions.find(option => option.value === selectedTimeRange)?.label}
          </Text>
          <Ionicons name="chevron-down" size={16} color={COLORS.secondaryText} />
        </View>
      </View>
      
      {/* Placeholder for chart */}
      <View style={styles.chartContainer}>
        <View style={styles.chartPlaceholder}>
          <View style={styles.areaChartPlaceholder}>
            <View style={[styles.areaSeries, styles.consultationSeries]} />
            <View style={[styles.areaSeries, styles.registrationSeries]} />
          </View>
          
          {/* X-axis labels */}
          <View style={styles.xAxisLabels}>
            {['Mar 30', 'Apr 5', 'Apr 10', 'Apr 15', 'Apr 20', 'Apr 25', 'Apr 30'].map((label, index) => (
              <Text key={index} style={styles.axisLabel}>
                {label}
              </Text>
            ))}
          </View>
        </View>
      </View>
      
      {/* Legend */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#26A69A' }]} />
          <Text style={styles.legendText}>Consultations</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#FF7D7D' }]} />
          <Text style={styles.legendText}>Registrations</Text>
        </View>
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightBackground,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radiusSmall,
  },
  dropdownLabel: {
    fontSize: FONT.size.s,
    color: COLORS.primaryText,
    marginRight: SPACING.xs,
  },
  chartContainer: {
    height: 200,
    marginBottom: SPACING.m,
  },
  chartPlaceholder: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  areaChartPlaceholder: {
    height: '85%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'relative',
  },
  areaSeries: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  consultationSeries: {
    backgroundColor: 'rgba(38, 166, 154, 0.2)',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    height: '60%',
  },
  registrationSeries: {
    backgroundColor: 'rgba(255, 125, 125, 0.2)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 200,
    height: '80%',
  },
  xAxisLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    paddingTop: SPACING.xs,
  },
  axisLabel: {
    fontSize: FONT.size.xs,
    color: COLORS.secondaryText,
    textAlign: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.m,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.xs,
  },
  legendText: {
    fontSize: FONT.size.xs,
    color: COLORS.secondaryText,
  },
});

export default ActivityOverview; 