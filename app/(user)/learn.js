import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, FONT } from '../../constants/Theme';

export default function LearnScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Learn</Text>
      <Text style={styles.placeholder}>Educational content and resources about astrology and spirituality</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.l,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: FONT.size.xl,
    fontWeight: FONT.weight.bold,
    marginBottom: SPACING.l,
    color: COLORS.primaryText,
  },
  placeholder: {
    fontSize: FONT.size.m,
    color: COLORS.secondaryText,
  },
}); 