import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { COLORS, FONT, SPACING, SIZES } from '../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';

const DateRangeFormModal = ({
  visible,
  onClose,
  onSave,
  dateRange = null
}) => {
  // Date picker would be added for real implementation
  // Using text inputs for simplicity in this example
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('Available'); // 'Available' or 'DayOff'
  
  useEffect(() => {
    if (dateRange) {
      // Parse the dateRange string like "Apr 23, 2025 - Apr 25, 2025"
      const dates = dateRange.dateRange.split(' - ');
      setStartDate(dates[0]);
      setEndDate(dates[1]);
      setType(dateRange.type);
    } else {
      // Reset form for new date range
      const today = new Date();
      setStartDate(formatDate(today));
      
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      setEndDate(formatDate(tomorrow));
      
      setType('Available');
    }
  }, [dateRange, visible]);
  
  const formatDate = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };
  
  const calculateDuration = (start, end) => {
    // Very simplified duration calculation for example purposes
    // In real implementation, would use proper date parsing and calculation
    return '7 days';
  };
  
  const toggleType = () => {
    setType(type === 'Available' ? 'DayOff' : 'Available');
  };
  
  const handleSave = () => {
    const newDateRange = {
      dateRange: `${startDate} - ${endDate}`,
      type: type,
      status: 'Upcoming', // Assuming new dates are always upcoming
      duration: calculateDuration(startDate, endDate)
    };
    
    onSave(newDateRange);
    onClose();
  };
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {dateRange ? 'Edit Date Range' : 'Add New Date Range'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={COLORS.secondaryText} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Start Date</Text>
              <TouchableOpacity style={styles.dateInput}>
                <Text style={styles.dateText}>{startDate}</Text>
                <Ionicons name="calendar" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>End Date</Text>
              <TouchableOpacity style={styles.dateInput}>
                <Text style={styles.dateText}>{endDate}</Text>
                <Ionicons name="calendar" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Type</Text>
              <View style={styles.typeButtons}>
                <TouchableOpacity 
                  style={[
                    styles.typeButton, 
                    type === 'Available' && styles.selectedTypeButton
                  ]}
                  onPress={() => setType('Available')}
                >
                  <Text 
                    style={[
                      styles.typeButtonText, 
                      type === 'Available' && styles.selectedTypeButtonText
                    ]}
                  >
                    Available
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.typeButton, 
                    type === 'DayOff' && styles.selectedTypeButton
                  ]}
                  onPress={() => setType('DayOff')}
                >
                  <Text 
                    style={[
                      styles.typeButtonText, 
                      type === 'DayOff' && styles.selectedTypeButtonText
                    ]}
                  >
                    Day Off
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.saveButton]} 
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: SPACING.m,
  },
  modalContent: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
  },
  formContainer: {
    padding: SPACING.m,
  },
  inputGroup: {
    marginBottom: SPACING.m,
  },
  inputLabel: {
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.medium,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radiusSmall,
    padding: SPACING.m,
    height: 48,
  },
  dateText: {
    fontSize: FONT.size.m,
    color: COLORS.primaryText,
  },
  typeButtons: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radiusSmall,
    overflow: 'hidden',
  },
  typeButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.m,
    backgroundColor: COLORS.white,
  },
  selectedTypeButton: {
    backgroundColor: COLORS.primary,
  },
  typeButtonText: {
    fontSize: FONT.size.m,
    color: COLORS.primaryText,
  },
  selectedTypeButtonText: {
    color: COLORS.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.m,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  button: {
    flex: 1,
    paddingVertical: SPACING.m,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.lightBackground,
    marginRight: SPACING.s,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    marginLeft: SPACING.s,
  },
  cancelButtonText: {
    color: COLORS.primaryText,
    fontWeight: FONT.weight.medium,
    fontSize: FONT.size.m,
  },
  saveButtonText: {
    color: COLORS.white,
    fontWeight: FONT.weight.medium,
    fontSize: FONT.size.m,
  },
});

export default DateRangeFormModal; 