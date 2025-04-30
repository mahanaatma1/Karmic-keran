import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT, SIZES, SHADOW } from '../../../constants/Theme';

const QuestionCard = ({ question, onViewResponsePress }) => {
  // Status-based styling
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'answered':
        return COLORS.success;
      case 'pending':
        return COLORS.warmAmber;
      case 'closed':
        return COLORS.secondaryText;
      default:
        return COLORS.secondaryText;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View style={styles.container}>
      {/* Left indicator */}
      <View 
        style={[
          styles.leftIndicator, 
          { backgroundColor: getStatusColor(question.status) }
        ]} 
      />
      
      {/* Card content */}
      <View style={styles.cardContent}>
        {/* Header with question ID and status */}
        <View style={styles.header}>
          <View style={styles.idContainer}>
            <Text style={styles.idLabel}>ID: </Text>
            <Text style={styles.idValue}>{question.id}</Text>
          </View>
          
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(question.status) }]}>
            <Text style={styles.statusText}>{question.status}</Text>
          </View>
        </View>
        
        {/* Question details */}
        <View style={styles.detailsContainer}>
          {/* Subject */}
          <View style={styles.detailRow}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>❓</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Subject</Text>
              <Text style={styles.detailValue}>{question.subject}</Text>
            </View>
          </View>
          
          {/* Message preview */}
          <View style={styles.detailRow}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>💬</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Message</Text>
              <Text style={styles.messagePreview} numberOfLines={2}>
                {question.message}
              </Text>
            </View>
          </View>
          
          {/* Date */}
          <View style={styles.detailRow}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>📅</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Submitted on</Text>
              <Text style={styles.detailValue}>{formatDate(question.date)}</Text>
            </View>
          </View>
        </View>
        
        {/* Button row */}
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.viewResponseButton} 
            onPress={() => onViewResponsePress(question)}
          >
            <Text style={styles.viewResponseText}>View Response</Text>
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
  messagePreview: {
    fontSize: FONT.size.m,
    color: COLORS.primaryText,
    lineHeight: 20,
  },
  buttonRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.m,
    alignItems: 'center',
  },
  viewResponseButton: {
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.l,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusSmall,
  },
  viewResponseText: {
    color: COLORS.white,
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.medium,
  },
});

export default QuestionCard; 