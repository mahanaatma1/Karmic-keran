import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT } from '../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeSection({ greeting = 'Welcome to your Schedule', name = 'Karmic Keran' }) {
  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={['#F8F9FF', '#EAEFFF']} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerRow}
      >
        <View style={styles.titleContainer}>
          <Ionicons name="sunny-outline" size={24} color={COLORS.primary} style={styles.icon} />
          <View>
            <Text style={styles.greeting}>{greeting}</Text>
            <Text style={styles.name}>{name}</Text>
          </View>
        </View>
      </LinearGradient>
      
      <View style={styles.contentBox}>
        <View style={styles.infoContainer}>
          <View style={styles.subtitleContainer}>
            <Ionicons name="star-outline" size={16} color={COLORS.primary} style={styles.infoIcon} />
            <Text style={styles.subtitle}>Have a blessed day!</Text>
          </View>
          
          <View style={styles.subtitleContainer}>
            <Ionicons name="calendar-outline" size={16} color={COLORS.primary} style={styles.infoIcon} />
            <Text style={styles.subtitle}>4 consultations today</Text>
          </View>
          
          <View style={styles.iconContainer}>
            <Text style={styles.namasteEmoji}>🙏</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    marginBottom: SPACING.m,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: SPACING.s,
  },
  greeting: {
    fontSize: FONT.size.m,
    color: COLORS.secondaryText,
    marginBottom: 4,
  },
  name: {
    fontSize: FONT.size.xl,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
  },
  contentBox: {
    padding: SPACING.m,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.m,
  },
  infoIcon: {
    marginRight: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    fontWeight: FONT.weight.medium,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 163, 60, 0.1)',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  namasteEmoji: {
    fontSize: 32,
  },
}); 