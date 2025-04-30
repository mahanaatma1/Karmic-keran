import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT, SIZES, SHADOW } from '../../../constants/Theme';

const ConsultationDetailCard = ({ consultation, onViewKundaliPress, onJoinCallPress, onDetailsPress }) => {
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
      {/* Left green indicator */}
      <View style={styles.leftIndicator} />
      
      {/* Card content */}
      <View style={styles.cardContent}>
        {/* Header with user info and status */}
        <View style={styles.header}>
          <View style={styles.userInfoContainer}>
            <View style={styles.userInitials}>
              <Text style={styles.initialsText}>
                {consultation.client.split(' ').map(name => name[0]).join('')}
              </Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{consultation.client}</Text>
              <Text style={styles.userId}>ID: {consultation.id}</Text>
            </View>
          </View>
          
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(consultation.status) }]}>
            <Text style={styles.statusText}>{consultation.status}</Text>
          </View>
        </View>
        
        {/* Consultation details */}
        <View style={styles.detailsContainer}>
          {/* Service */}
          <View style={styles.detailRow}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>★</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Service</Text>
              <Text style={styles.detailValue}>{consultation.service}</Text>
            </View>
          </View>
          
          {/* Date & Time */}
          <View style={styles.detailRow}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>📅</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Date & Time</Text>
              <Text style={styles.detailValue}>{consultation.dateTime}</Text>
            </View>
          </View>
          
          {/* Amount */}
          <View style={styles.detailRow}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>💳</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Amount</Text>
              <View style={styles.paymentRow}>
                <Text style={styles.detailValue}>£{consultation.amount}</Text>
                <View style={styles.paymentBadge}>
                  <Text style={[styles.paymentStatus, { color: getPaymentStatusColor(consultation.paymentStatus) }]}>
                    {consultation.paymentStatus}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        
        {/* Button row */}
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.kundaliButton]} 
            onPress={() => onViewKundaliPress(consultation)}
          >
            <Text style={styles.kundaliButtonText}>📄 View Kundali</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.callButton]} 
            onPress={() => onJoinCallPress(consultation)}
          >
            <Text style={styles.callButtonText}>📞 Join Call</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.detailsButton]} 
            onPress={() => onDetailsPress(consultation)}
          >
            <Text style={styles.detailsButtonText}>⋯ Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.m,
    marginBottom: SPACING.m,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    ...SHADOW.small,
    overflow: 'hidden',
  },
  leftIndicator: {
    width: 6,
    backgroundColor: COLORS.success,
  },
  cardContent: {
    flex: 1,
    padding: SPACING.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInitials: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.m,
  },
  initialsText: {
    fontSize: FONT.size.l,
    color: COLORS.primary,
    fontWeight: FONT.weight.bold,
  },
  userDetails: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    marginBottom: 2,
  },
  userId: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
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
  detailsContainer: {
    marginBottom: SPACING.m,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.m,
  },
  icon: {
    fontSize: 20,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: FONT.size.m,
    color: COLORS.primaryText,
    fontWeight: FONT.weight.medium,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentBadge: {
    marginLeft: SPACING.m,
    paddingHorizontal: SPACING.s,
    paddingVertical: 2,
    backgroundColor: COLORS.lightBackground,
    borderRadius: SIZES.radiusSmall,
  },
  paymentStatus: {
    fontSize: FONT.size.xs,
    fontWeight: FONT.weight.bold,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.m,
  },
  actionButton: {
    paddingVertical: SPACING.s,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  kundaliButton: {
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  callButton: {
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  kundaliButtonText: {
    color: COLORS.warmAmber,
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.medium,
  },
  callButtonText: {
    color: COLORS.primary,
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.medium,
  },
  detailsButtonText: {
    color: COLORS.secondaryText,
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.medium,
  },
});

export default ConsultationDetailCard; 