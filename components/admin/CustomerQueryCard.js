import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT, SHADOW, SIZES } from '../../constants/Theme';

const CustomerQueryCard = ({ query, onWriteAnswer, onViewKundali }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.serialNumber}>
          <Text style={styles.serialNumberText}>{query.id}</Text>
        </View>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{query.category}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{query.name}</Text>
          <Text style={styles.customerEmail}>{query.email}</Text>
          <Text style={styles.customerDetails}>
            Birth: {query.dateOfBirth} at {query.timeOfBirth}
          </Text>
          <Text style={styles.customerDetails}>
            Place: {query.placeOfBirth}
          </Text>
          <Text style={styles.customerDetails}>
            Gender: {query.gender}
          </Text>
        </View>

        <View style={styles.questionSection}>
          <Text style={styles.questionLabel}>Question:</Text>
          <Text style={styles.questionText}>{query.question}</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.writeAnswerButton}
            onPress={() => onWriteAnswer(query)}
          >
            <Ionicons name="pencil" size={16} color={COLORS.white} />
            <Text style={styles.actionButtonText}>Write Answer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewKundaliButton}
            onPress={() => onViewKundali(query)}
          >
            <Ionicons name="document-text-outline" size={16} color={COLORS.white} />
            <Text style={styles.actionButtonText}>View Kundali</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.ratingLabel}>Rating: {query.rating}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.l,
    ...SHADOW.small,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  serialNumber: {
    width: 24,
    height: 24,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serialNumberText: {
    color: COLORS.white,
    fontWeight: FONT.weight.bold,
    fontSize: FONT.size.xs,
  },
  categoryBadge: {
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radiusSmall,
  },
  categoryText: {
    color: COLORS.primary,
    fontSize: FONT.size.xs,
    fontWeight: FONT.weight.medium,
  },
  cardBody: {
    padding: SPACING.m,
  },
  customerInfo: {
    marginBottom: SPACING.m,
  },
  customerName: {
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  customerEmail: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    marginBottom: SPACING.s,
  },
  customerDetails: {
    fontSize: FONT.size.xs,
    color: COLORS.secondaryText,
    marginBottom: SPACING.xs,
  },
  questionSection: {
    marginBottom: SPACING.m,
  },
  questionLabel: {
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.medium,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  questionText: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  writeAnswerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.s,
    borderRadius: SIZES.radiusSmall,
    marginRight: SPACING.s,
  },
  viewKundaliButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.goldenOrange,
    paddingVertical: SPACING.s,
    borderRadius: SIZES.radiusSmall,
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.medium,
    marginLeft: SPACING.xs,
  },
  cardFooter: {
    padding: SPACING.m,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    backgroundColor: COLORS.lightBackground,
  },
  ratingLabel: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    textAlign: 'right',
  },
});

export default CustomerQueryCard; 