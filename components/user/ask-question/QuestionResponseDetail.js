import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT, SIZES, SHADOW } from '../../../constants/Theme';

const QuestionResponseDetail = ({ question, onClose }) => {
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
      <View style={styles.header}>
        <Text style={styles.title}>Question Details</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>ID:</Text>
            <Text style={styles.value}>{question.id}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Subject:</Text>
            <Text style={styles.value}>{question.subject}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Status:</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(question.status) }]}>
              <Text style={styles.statusText}>{question.status}</Text>
            </View>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Submitted:</Text>
            <Text style={styles.value}>{formatDate(question.date)}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Question</Text>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{question.message}</Text>
          </View>
        </View>

        {question.response && (
          <>
            <View style={styles.divider} />
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Response</Text>
              <View style={styles.responseInfo}>
                <Text style={styles.responseInfoText}>
                  Responded by {question.respondent} on {formatDate(question.responseDate)}
                </Text>
              </View>
              <View style={styles.messageContainer}>
                <Text style={styles.message}>{question.response}</Text>
              </View>
            </View>
          </>
        )}

        {question.status.toLowerCase() === 'pending' && (
          <View style={styles.pendingSection}>
            <View style={styles.pendingIcon}>
              <Text style={styles.pendingIconText}>⏳</Text>
            </View>
            <Text style={styles.pendingText}>
              Your question is being reviewed. We'll respond as soon as possible.
            </Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          {question.status.toLowerCase() === 'answered' && (
            <TouchableOpacity style={styles.followUpButton}>
              <Text style={styles.followUpButtonText}>Follow Up</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={styles.closeQuestionButton}>
            <Text style={styles.closeQuestionButtonText}>
              {question.status.toLowerCase() === 'closed' ? 'Reopen Question' : 'Close Question'}
            </Text>
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
    width: 100,
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
  messageContainer: {
    backgroundColor: COLORS.lightBackground,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
  },
  message: {
    fontSize: FONT.size.m,
    color: COLORS.primaryText,
    lineHeight: 22,
  },
  responseInfo: {
    marginBottom: SPACING.m,
  },
  responseInfoText: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    fontStyle: 'italic',
  },
  pendingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightBackground,
    padding: SPACING.m,
    margin: SPACING.m,
    borderRadius: SIZES.radius,
  },
  pendingIcon: {
    marginRight: SPACING.m,
  },
  pendingIconText: {
    fontSize: 24,
  },
  pendingText: {
    flex: 1,
    fontSize: FONT.size.m,
    color: COLORS.secondaryText,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.m,
    marginTop: SPACING.m,
    marginBottom: SPACING.xl,
  },
  followUpButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: SPACING.m,
    borderRadius: SIZES.radiusSmall,
    alignItems: 'center',
    marginRight: SPACING.m,
  },
  followUpButtonText: {
    color: COLORS.white,
    fontWeight: FONT.weight.bold,
    fontSize: FONT.size.m,
  },
  closeQuestionButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.secondaryText,
    padding: SPACING.m,
    borderRadius: SIZES.radiusSmall,
    alignItems: 'center',
  },
  closeQuestionButtonText: {
    color: COLORS.secondaryText,
    fontWeight: FONT.weight.bold,
    fontSize: FONT.size.m,
  },
});

export default QuestionResponseDetail; 