import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT, SIZES } from '../../../constants/Theme';
import ConsultationCountdown from './ConsultationCountdown';

const screenWidth = Dimensions.get('window').width;

export default function ConsultationCard({ consultation, onJoinCall = () => {}, onViewCharts = () => {}, showCountdown = true }) {
  const { clientName, clientInitials, serviceType, date, time, paymentStatus, amount, meetingLink } = consultation;
  
  // Extract duration from time if available
  const duration = consultation.duration || '60m';
  
  // Countdown props
  const timeLeft = consultation.timeLeft || { days: '03', hours: '11', minutes: '12' };
  
  return (
    <View style={styles.container}>
      {/* Client Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.headerTop}>
          <View style={styles.clientInfo}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {clientInitials || clientName.substring(0, 2).toUpperCase()}
              </Text>
            </View>
            <View style={styles.nameSection}>
              <Text style={styles.labelText}>Client Name</Text>
              <Text style={styles.clientNameText} numberOfLines={1}>{clientName}</Text>
            </View>
          </View>
          
          {/* Countdown timer in top right */}
          {showCountdown && (
            <View style={styles.countdownContainer}>
              <ConsultationCountdown 
                compact={true} 
                days={timeLeft.days} 
                hours={timeLeft.hours} 
                minutes={timeLeft.minutes} 
              />
            </View>
          )}
        </View>
        
        {/* Date and time section */}
        <View style={styles.dateTimeWrapper}>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={16} color="#fff" />
            <Text style={styles.dateText}>{date}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={16} color="#fff" />
            <Text style={styles.timeText}>{time}</Text>
            <Text style={styles.durationText}>({duration})</Text>
          </View>
        </View>
      </View>
      
      {/* Details Section */}
      <View style={styles.detailsSection}>
        {/* Service Type */}
        <View style={styles.detailRow}>
          <View style={styles.detailIconContainer}>
            <Ionicons name="star-outline" size={20} color={COLORS.primary} />
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Service Type</Text>
            <Text style={styles.detailValue}>{serviceType}</Text>
          </View>
        </View>
        
        {/* Payment Status */}
        <View style={styles.detailRow}>
          <View style={styles.detailIconContainer}>
            <MaterialIcons name="payment" size={20} color={COLORS.success} />
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Payment Status</Text>
            <View style={styles.paymentRow}>
              <Text style={styles.amountText}>{amount}</Text>
              <View style={styles.statusPill}>
                <Text style={styles.statusText}>{paymentStatus}</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Meeting Link */}
        <View style={styles.detailRow}>
          <View style={styles.detailIconContainer}>
            <Ionicons name="link-outline" size={20} color={COLORS.primary} />
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Meeting Link</Text>
            <View style={styles.linkContainer}>
              <Text style={styles.linkText} numberOfLines={1}>{meetingLink}</Text>
              <TouchableOpacity style={styles.copyButton}>
                <Feather name="copy" size={16} color={COLORS.primary} />
                <Text style={styles.copyText}>Copy Link</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      
      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.joinButton} onPress={onJoinCall}>
          <Ionicons name="videocam-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Join Video Call</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.chartsButton} onPress={onViewCharts}>
          <Feather name="file-text" size={20} color="#fff" />
          <Text style={styles.buttonText}>Jatak's Kundali Charts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: SPACING.m,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
  headerSection: {
    backgroundColor: '#2D7AF8',
    padding: SPACING.m,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.s,
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  countdownContainer: {
    marginLeft: SPACING.s,
  },
  avatarContainer: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.m,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  nameSection: {
    justifyContent: 'center',
    flex: 1,
  },
  labelText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: FONT.size.xs,
    marginBottom: 2,
  },
  clientNameText: {
    color: COLORS.white,
    fontSize: FONT.size.xl,
    fontWeight: 'bold',
  },
  dateTimeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dateText: {
    color: COLORS.white,
    marginLeft: 6,
    fontSize: FONT.size.s,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  timeText: {
    color: COLORS.white,
    marginLeft: 6,
    fontSize: FONT.size.s,
  },
  durationText: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
    fontSize: FONT.size.xs,
  },
  detailsSection: {
    padding: SPACING.m,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f7fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.m,
  },
  detailContent: {
    flex: 1,
    justifyContent: 'center',
  },
  detailLabel: {
    color: COLORS.secondaryText,
    fontSize: FONT.size.s,
    marginBottom: 4,
  },
  detailValue: {
    color: COLORS.primaryText,
    fontSize: FONT.size.m,
    fontWeight: '500',
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    color: COLORS.primaryText,
    fontSize: FONT.size.m,
    fontWeight: '500',
    marginRight: SPACING.m,
  },
  statusPill: {
    backgroundColor: '#e7f7ed',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: COLORS.success,
    fontSize: FONT.size.xs,
    fontWeight: '600',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linkText: {
    color: COLORS.primaryText,
    fontSize: FONT.size.s,
    flex: 1,
    marginRight: SPACING.s,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  copyText: {
    color: COLORS.primary,
    fontSize: FONT.size.xs,
    marginLeft: 4,
    fontWeight: '500',
  },
  actionSection: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.m,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  chartsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7043',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1.5,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: FONT.size.s,
    marginLeft: 6,
  },
}); 