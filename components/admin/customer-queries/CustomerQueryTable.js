import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, SPACING, FONT, SIZES } from '../../../constants/Theme';

const CustomerQueryTable = ({ queries, onWriteAnswer, onViewKundali }) => {
  return (
    <ScrollView horizontal style={styles.tableContainer}>
      <View>
        {/* Table Header */}
        <View style={styles.tableHeaderRow}>
          <View style={[styles.tableCell, styles.serialNumberCell]}>
            <Text style={styles.tableHeaderText}>S.No</Text>
          </View>
          <View style={[styles.tableCell, styles.customerDetailsCell]}>
            <Text style={styles.tableHeaderText}>Customer Details</Text>
          </View>
          <View style={[styles.tableCell, styles.questionCell]}>
            <Text style={styles.tableHeaderText}>Question</Text>
          </View>
          <View style={[styles.tableCell, styles.answerCell]}>
            <Text style={styles.tableHeaderText}>Answer</Text>
          </View>
          <View style={[styles.tableCell, styles.ratingCell]}>
            <Text style={styles.tableHeaderText}>Average R</Text>
          </View>
        </View>

        {/* Table Rows */}
        {queries.map((query) => (
          <View key={query.id} style={styles.tableRow}>
            <View style={[styles.tableCell, styles.serialNumberCell]}>
              <Text style={styles.tableCellText}>{query.id}</Text>
            </View>
            
            <View style={[styles.tableCell, styles.customerDetailsCell]}>
              <Text style={styles.tableCellTextBold}>Name: {query.name}</Text>
              <Text style={styles.tableCellText}>Email: {query.email}</Text>
              <Text style={styles.tableCellText}>Date of Birth: {query.dateOfBirth}</Text>
              <Text style={styles.tableCellText}>Time of Birth: {query.timeOfBirth}</Text>
              <Text style={styles.tableCellText}>Place of Birth: {query.placeOfBirth}</Text>
              <Text style={styles.tableCellText}>Gender: {query.gender}</Text>
            </View>
            
            <View style={[styles.tableCell, styles.questionCell]}>
              <Text style={styles.tableCellTextBold}>{query.category}</Text>
              <Text style={styles.tableCellText}>{query.question}</Text>
            </View>
            
            <View style={[styles.tableCell, styles.answerCell]}>
              <TouchableOpacity 
                style={styles.tableWriteAnswerButton}
                onPress={() => onWriteAnswer(query)}
              >
                <Text style={styles.tableButtonText}>Write Answer</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.tableViewKundaliButton}
                onPress={() => onViewKundali(query)}
              >
                <Text style={styles.tableButtonText}>View Kundali</Text>
              </TouchableOpacity>
            </View>
            
            <View style={[styles.tableCell, styles.ratingCell]}>
              <Text style={styles.tableCellText}>{query.rating}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    marginBottom: SPACING.l,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightBackground,
    borderTopLeftRadius: SIZES.radiusSmall,
    borderTopRightRadius: SIZES.radiusSmall,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  tableCell: {
    padding: SPACING.m,
    justifyContent: 'center',
  },
  serialNumberCell: {
    width: 50,
    alignItems: 'center',
  },
  customerDetailsCell: {
    width: 220,
  },
  questionCell: {
    width: 200,
  },
  answerCell: {
    width: 150,
    alignItems: 'center',
  },
  ratingCell: {
    width: 100,
    alignItems: 'center',
  },
  tableHeaderText: {
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
  },
  tableCellText: {
    fontSize: FONT.size.xs,
    color: COLORS.secondaryText,
    marginBottom: 2,
  },
  tableCellTextBold: {
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.medium,
    color: COLORS.primaryText,
    marginBottom: 4,
  },
  tableWriteAnswerButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.s,
    borderRadius: SIZES.radiusSmall,
    alignItems: 'center',
    marginBottom: SPACING.s,
    width: '100%',
  },
  tableViewKundaliButton: {
    backgroundColor: COLORS.goldenOrange,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.s,
    borderRadius: SIZES.radiusSmall,
    alignItems: 'center',
    width: '100%',
  },
  tableButtonText: {
    color: COLORS.white,
    fontSize: FONT.size.xs,
    fontWeight: FONT.weight.medium,
  },
});

export default CustomerQueryTable; 