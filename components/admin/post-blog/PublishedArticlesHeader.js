import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT } from '../../../constants/Theme';

const PublishedArticlesHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Published Articles</Text>
      <Text style={styles.subtitle}>
        View and manage all your published blog articles in one place
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.l,
  },
  title: {
    fontSize: FONT.size.xl,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    textAlign: 'center',
  },
});

export default PublishedArticlesHeader; 