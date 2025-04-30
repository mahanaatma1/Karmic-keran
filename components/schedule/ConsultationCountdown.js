import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT } from '../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';

export default function ConsultationCountdown({ compact = false, days = '03', hours = '11', minutes = '12' }) {
  if (compact) {
    // Compact version for inserting into ConsultationCard
    return (
      <View style={styles.compactContainer}>
        <Ionicons name="timer-outline" size={14} color="#ffffff" style={styles.compactIcon} />
        <View style={styles.compactTimerContainer}>
          <Text style={styles.compactTimerText}>{days}d : {hours}h : {minutes}m</Text>
        </View>
      </View>
    );
  }
  
  // Original standalone version
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <Ionicons name="timer-outline" size={18} color="#2196F3" style={styles.icon} />
          <Text style={styles.sectionTitle}>Next Consultation</Text>
        </View>
      </View>
      
      <View style={styles.contentBox}>
        <View style={styles.timerContainer}>
          <View style={styles.timerUnit}>
            <Text style={styles.timerNumber}>{days}</Text>
            <Text style={styles.timerLabel}>D</Text>
          </View>
          
          <View style={styles.separatorContainer}>
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
          
          <View style={styles.timerUnit}>
            <Text style={styles.timerNumber}>{hours}</Text>
            <Text style={styles.timerLabel}>H</Text>
          </View>
          
          <View style={styles.separatorContainer}>
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
          
          <View style={styles.timerUnit}>
            <Text style={styles.timerNumber}>{minutes}</Text>
            <Text style={styles.timerLabel}>M</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Styles for the compact version
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  compactIcon: {
    marginRight: 4,
  },
  compactTimerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactTimerText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Styles for the original version
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
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.s,
    paddingVertical: SPACING.xs,
    backgroundColor: '#F8F9FF',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
  sectionTitle: {
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
  },
  contentBox: {
    padding: SPACING.xs,
    alignItems: 'center',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerUnit: {
    alignItems: 'center',
    width: 40,
  },
  timerNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryText,
    marginBottom: 0,
  },
  timerLabel: {
    fontSize: 12,
    color: COLORS.secondaryText,
    fontWeight: '500',
  },
  separatorContainer: {
    height: 24,
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#2196F3',
    margin: 2,
  }
}); 