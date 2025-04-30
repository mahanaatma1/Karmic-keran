import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { COLORS, SPACING, FONT } from '../../../constants/Theme';
import QuestionCard from './QuestionCard';

const QuestionList = ({ 
  questions, 
  onViewResponse 
}) => {
  const renderItem = ({ item }) => (
    <QuestionCard
      question={item}
      onViewResponsePress={onViewResponse}
    />
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No questions found</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Your Previous Questions</Text>
      <FlatList
        data={questions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SPACING.l,
  },
  sectionTitle: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    marginHorizontal: SPACING.m,
    marginBottom: SPACING.m,
  },
  listContent: {
    paddingBottom: SPACING.xl,
  },
  emptyContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: FONT.size.m,
    color: COLORS.secondaryText,
    textAlign: 'center',
  },
});

export default QuestionList; 