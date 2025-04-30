import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT } from '../../constants/Theme';

export default function ConsultationHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Consultations</Text>
        <Text style={styles.subtitle}>Manage and track all your consultation bookings in one place</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.l,
    alignItems: 'center',
  },
  titleContainer: {
    marginBottom: SPACING.m,
    alignItems: 'center',
  },
  title: {
    fontSize: FONT.size.xxl,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    textAlign: 'center',
    maxWidth: '90%',
  },
}); 