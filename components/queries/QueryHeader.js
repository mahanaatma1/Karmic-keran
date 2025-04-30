import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet
} from 'react-native';
import { COLORS, FONT, SPACING } from '../../constants/Theme';

const QueryHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Queries</Text>
      <Text style={styles.subtitle}>
        View and manage customer astrological queries. Track and respond to questions from
        users, monitor query status, and provide expert astrological guidance.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: SPACING.m,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primaryText,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.secondaryText,
    textAlign: 'center',
    lineHeight: 20,
  }
});

export default QueryHeader; 