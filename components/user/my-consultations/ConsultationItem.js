import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT, SIZES, SHADOW } from '../../../constants/Theme';

const ConsultationItem = ({ 
  consultation, 
  onViewPress,
  expanded,
  onToggleExpand
}) => {
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
      <TouchableOpacity style={styles.card} onPress={onToggleExpand}>
        <View style={styles.header}>
          <View style={styles.idContainer}>
            <Text style={styles.idLabel}>ID: </Text>
            <Text style={styles.idValue}>{consultation.id}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(consultation.status) }]}>
            <Text style={styles.statusText}>{consultation.status}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Service:</Text>
          <Text style={styles.value}>{consultation.service}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date & Time:</Text>
          <Text style={styles.value}>{consultation.dateTime}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Zone:</Text>
          <Text style={styles.value}>{consultation.zone}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Amount:</Text>
            <Text style={styles.priceValue}>£{consultation.amount}</Text>
          </View>

          <View style={styles.paymentContainer}>
            <Text style={styles.paymentLabel}>Payment:</Text>
            <Text style={[
              styles.paymentStatus, 
              { color: getPaymentStatusColor(consultation.paymentStatus) }
            ]}>
              {consultation.paymentStatus}
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.viewButton} 
            onPress={() => onViewPress(consultation)}
          >
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>

        {expanded && (
          <View style={styles.expandedContent}>
            <View style={styles.expandedDivider} />
            
            <View style={styles.expandedRow}>
              <Text style={styles.expandedLabel}>Created:</Text>
              <Text style={styles.expandedValue}>{consultation.createdAt}</Text>
            </View>
            
            <View style={styles.expandedRow}>
              <Text style={styles.expandedLabel}>Client:</Text>
              <Text style={styles.expandedValue}>{consultation.client}</Text>
            </View>
            
            <TouchableOpacity style={styles.moreButton}>
              <Text style={styles.moreButtonText}>More</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.m,
    paddingBottom: SPACING.m,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    ...SHADOW.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  idLabel: {
    fontSize: FONT.size.m,
    color: COLORS.secondaryText,
  },
  idValue: {
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  label: {
    width: 90,
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
  },
  value: {
    flex: 1,
    fontSize: FONT.size.s,
    color: COLORS.primaryText,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.m,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    marginRight: SPACING.xs,
  },
  priceValue: {
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentLabel: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    marginRight: SPACING.xs,
  },
  paymentStatus: {
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.bold,
  },
  viewButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.warmAmber,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radiusSmall,
  },
  viewButtonText: {
    color: COLORS.warmAmber,
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.medium,
  },
  expandedContent: {
    marginTop: SPACING.m,
  },
  expandedDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: SPACING.m,
  },
  expandedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  expandedLabel: {
    width: 80,
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
  },
  expandedValue: {
    flex: 1,
    fontSize: FONT.size.s,
    color: COLORS.primaryText,
  },
  moreButton: {
    alignSelf: 'flex-end',
    marginTop: SPACING.s,
  },
  moreButtonText: {
    color: COLORS.primary,
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.medium,
  },
});

export default ConsultationItem; 