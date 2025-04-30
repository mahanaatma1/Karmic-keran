import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT } from '../../constants/Theme';

export default function SelfDiscoveryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Self Discovery</Text>
      <Text style={styles.placeholder}>Explore tools and resources for your spiritual journey</Text>
    </View>
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