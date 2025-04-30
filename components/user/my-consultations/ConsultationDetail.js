import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT, SIZES, SHADOW } from '../../../constants/Theme';

const ConsultationDetail = ({ consultation, onClose }) => {
  // Status-based styling
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'completed':
        return COLORS.success;
      case 'today':
        return COLORS.warmAmber;
      default:
        return COLORS.secondaryText;
    }
  };

  // Payment status styling
  const getPaymentStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'paid':
        return COLORS.success;
      case 'pending':
        return COLORS.warning;
      case 'failed':
        return COLORS.error;
      default:
        return COLORS.secondaryText;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Consultation Details</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>ID:</Text>
            <Text style={styles.value}>{consultation.id}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Client:</Text>
            <Text style={styles.value}>{consultation.client}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Service:</Text>
            <Text style={styles.value}>{consultation.service}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Schedule Information</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Date & Time:</Text>
            <Text style={styles.value}>{consultation.dateTime}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Zone:</Text>
            <Text style={styles.value}>{consultation.zone}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Status:</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(consultation.status) }]}>
              <Text style={styles.statusText}>{consultation.status}</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Amount:</Text>
            <Text style={styles.value}>£{consultation.amount}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Payment Status:</Text>
            <Text style={[
              styles.paymentStatus, 
              { color: getPaymentStatusColor(consultation.paymentStatus) }
            ]}>
              {consultation.paymentStatus}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Information</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Created At:</Text>
            <Text style={styles.value}>{consultation.createdAt}</Text>
          </View>
          
          <View style={styles.notes}>
            <Text style={styles.notesLabel}>Notes:</Text>
            <Text style={styles.notesText}>
              {consultation.notes || 'No additional notes available.'}
            </Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Reschedule</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: FONT.size.xl,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
  },
  closeButton: {
    fontSize: FONT.size.xl,
    color: COLORS.secondaryText,
    padding: SPACING.s,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: SPACING.m,
  },
  sectionTitle: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    marginBottom: SPACING.m,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  label: {
    width: 120,
    fontSize: FONT.size.m,
    color: COLORS.secondaryText,
  },
  value: {
    flex: 1,
    fontSize: FONT.size.m,
    color: COLORS.primaryText,
    fontWeight: FONT.weight.medium,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  statusBadge: {
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.xs,
    borderRadius: 20,
  },
  statusText: {
    color: COLORS.white,
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.medium,
  },
  paymentStatus: {
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.bold,
  },
  notes: {
    marginTop: SPACING.s,
  },
  notesLabel: {
    fontSize: FONT.size.m,
    color: COLORS.secondaryText,
    marginBottom: SPACING.s,
  },
  notesText: {
    fontSize: FONT.size.m,
    color: COLORS.primaryText,
    lineHeight: 22,
    padding: SPACING.m,
    backgroundColor: COLORS.lightBackground,
    borderRadius: SIZES.radius,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.m,
    marginTop: SPACING.m,
    marginBottom: SPACING.xl,
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.warmAmber,
    padding: SPACING.m,
    borderRadius: SIZES.radiusSmall,
    alignItems: 'center',
    marginRight: SPACING.m,
  },
  actionButtonText: {
    color: COLORS.white,
    fontWeight: FONT.weight.bold,
    fontSize: FONT.size.m,
  },
  cancelButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  cancelButtonText: {
    color: COLORS.error,
    fontWeight: FONT.weight.bold,
    fontSize: FONT.size.m,
  },
});

export default ConsultationDetail; 