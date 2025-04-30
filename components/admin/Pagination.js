import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT } from '../../constants/Theme';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  rowsPerPage, 
  onPageChange, 
  onRowsPerPageChange 
}) => {
  return (
    <View style={styles.paginationContainer}>
      <Text style={styles.paginationText}>Rows per page: {rowsPerPage}</Text>
      <Text style={styles.paginationText}>Page {currentPage} of {totalPages}</Text>
      <View style={styles.paginationButtons}>
        <TouchableOpacity 
          style={styles.paginationButton} 
          disabled={currentPage <= 1}
          onPress={() => onPageChange(Math.max(1, currentPage - 1))}
        >
          <Ionicons 
            name="chevron-back" 
            size={20} 
            color={currentPage <= 1 ? COLORS.divider : COLORS.primaryText} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.paginationButton} 
          disabled={currentPage >= totalPages}
          onPress={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        >
          <Ionicons 
            name="chevron-forward" 
            size={20} 
            color={currentPage >= totalPages ? COLORS.divider : COLORS.primaryText} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: SPACING.l,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  paginationText: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    marginRight: SPACING.l,
  },
  paginationButtons: {
    flexDirection: 'row',
  },
  paginationButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.xs,
  },
});

export default Pagination; 