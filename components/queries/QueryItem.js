import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT, SIZES, SPACING } from '../../constants/Theme';

const QueryItem = ({ 
  query, 
  onPress 
}) => {
  const {
    id,
    customerName,
    message,
    timestamp,
    isRead,
    isUrgent,
    status
  } = query;

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return COLORS.success;
      case 'pending':
        return COLORS.warning;
      case 'urgent':
        return COLORS.error;
      default:
        return COLORS.gray;
    }
  };

  const formattedDate = new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  return (
    <TouchableOpacity 
      style={[
        styles.container,
        !isRead && styles.unreadContainer
      ]}
      onPress={() => onPress(id)}
    >
      <View style={styles.leftContent}>
        {isUrgent && (
          <View style={styles.urgentIndicator}>
            <Ionicons name="alert-circle" size={16} color={COLORS.error} />
          </View>
        )}
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{customerName}</Text>
          <Text 
            style={styles.messagePreview}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {message}
          </Text>
        </View>
      </View>
      
      <View style={styles.rightContent}>
        <Text style={styles.timestamp}>{formattedDate}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Text>
        </View>
      </View>
      
      {!isRead && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    justifyContent: 'space-between',
  },
  unreadContainer: {
    backgroundColor: COLORS.lightBackground,
  },
  leftContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  urgentIndicator: {
    marginRight: 8,
    marginTop: 4,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontFamily: FONT.bold,
    color: COLORS.darkText,
    marginBottom: 4,
  },
  messagePreview: {
    fontSize: 14,
    fontFamily: FONT.regular,
    color: COLORS.mediumText,
    lineHeight: 20,
  },
  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingLeft: 12,
  },
  timestamp: {
    fontSize: 12,
    fontFamily: FONT.regular,
    color: COLORS.lightText,
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontFamily: FONT.medium,
    color: COLORS.white,
  },
  unreadDot: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
});

export default QueryItem; 