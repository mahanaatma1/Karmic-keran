import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT } from '../../../constants/Theme';

const ConsultationHeader = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.m,
    marginBottom: SPACING.m,
  },
  title: {
    fontSize: FONT.size.xxl,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT.size.m,
    color: COLORS.secondaryText,
    lineHeight: 22,
  },
});

export default ConsultationHeader; 