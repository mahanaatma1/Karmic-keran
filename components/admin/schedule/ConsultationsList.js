import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { COLORS, SPACING, FONT } from '../../constants/Theme';
import ConsultationCard from './ConsultationCard';
import { Ionicons } from '@expo/vector-icons';

export default function ConsultationsList({ consultations = [], loading = false, error = null }) {
  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.statusText}>Loading your consultations...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="alert-circle" size={60} color={COLORS.error} />
          </View>
          <Text style={styles.errorText}>Oops! Something went wrong</Text>
          <Text style={styles.statusSubtext}>{error}</Text>
        </View>
      );
    }

    if (consultations.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="calendar-outline" size={60} color={COLORS.secondaryText} />
          </View>
          <Text style={styles.emptyText}>No consultations scheduled</Text>
          <Text style={styles.statusSubtext}>You have no consultations for today. Enjoy your free time!</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={consultations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ConsultationCard consultation={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <Ionicons name="list-outline" size={24} color={COLORS.primary} style={styles.icon} />
          <View>
            <Text style={styles.sectionTitle}>Today's Consultations</Text>
            <Text style={styles.sectionSubtitle}>Your scheduled appointments</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.contentBox}>
        {renderContent()}
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
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.m,
    backgroundColor: '#F8F9FF',
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
  sectionTitle: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
  },
  sectionSubtitle: {
    fontSize: FONT.size.xs,
    color: COLORS.secondaryText,
  },
  contentBox: {
    padding: SPACING.m,
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
  },
  listContent: {
    paddingBottom: SPACING.m,
  },
  separator: {
    height: SPACING.m,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.l,
  },
  statusText: {
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.medium,
    color: COLORS.primaryText,
    marginTop: SPACING.m,
    textAlign: 'center',
  },
  errorText: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.error,
    marginBottom: SPACING.s,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    marginBottom: SPACING.s,
    textAlign: 'center',
  },
  statusSubtext: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
}); 