import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { COLORS, SPACING, FONT } from '../../../constants/Theme';
import ConsultationDetailCard from './ConsultationDetailCard';

const ConsultationDetailList = ({ 
  consultations, 
  onViewKundali, 
  onJoinCall, 
  onViewDetails 
}) => {
  const renderItem = ({ item }) => (
    <ConsultationDetailCard
      consultation={item}
      onViewKundaliPress={onViewKundali}
      onJoinCallPress={onJoinCall}
      onDetailsPress={onViewDetails}
    />
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No consultations found</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={consultations}
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
  },
  listContent: {
    paddingTop: SPACING.m,
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

export default ConsultationDetailList; 