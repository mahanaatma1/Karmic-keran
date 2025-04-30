import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView, Platform } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const PersonalDetailsForm = ({ 
  formData, 
  setFormData, 
  errors,
  validateField
}) => {
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeTimeField, setActiveTimeField] = useState(null); // 'hour', 'minute', or 'ampm'

  // Gender options
  const genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
  
  // Time options
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
  const ampm = ['AM', 'PM'];

  const handleSelectGender = (gender) => {
    setFormData({ ...formData, gender });
    setShowGenderPicker(false);
    validateField('gender', gender);
  };

  const handleSelectTimeValue = (value) => {
    if (activeTimeField === 'hour') {
      setFormData({ ...formData, birthTime: { ...formData.birthTime, hour: value } });
    } else if (activeTimeField === 'minute') {
      setFormData({ ...formData, birthTime: { ...formData.birthTime, minute: value } });
    } else if (activeTimeField === 'ampm') {
      setFormData({ ...formData, birthTime: { ...formData.birthTime, ampm: value } });
    }
    setShowTimePicker(false);
  };

  const handleTimePickerOpen = (field) => {
    setActiveTimeField(field);
    setShowTimePicker(true);
  };

  // Simple calendar component
  const Calendar = ({ onSelectDate, onClose }) => {
    const [currentDate, setCurrentDate] = useState(
      formData.birthDate ? new Date(formData.birthDate) : new Date()
    );
    
    const handleConfirm = () => {
      onSelectDate(currentDate);
      onClose();
    };
    
    // Current month/year for display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Generate list of days in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    return (
      <View style={styles.calendarContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Select Date</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close-circle" size={24} color="#FF6B00" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.calendarTitle}>
          {monthNames[month]} {year}
        </Text>
        
        <View style={styles.calendarGrid}>
          {days.map(day => (
            <TouchableOpacity
              key={day}
              style={[
                styles.calendarDay,
                currentDate.getDate() === day && styles.calendarDaySelected
              ]}
              onPress={() => {
                const newDate = new Date(currentDate);
                newDate.setDate(day);
                setCurrentDate(newDate);
              }}
            >
              <Text style={[
                styles.calendarDayText,
                currentDate.getDate() === day && styles.calendarDayTextSelected
              ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.calendarActions}>
          <TouchableOpacity style={styles.calendarButton} onPress={onClose}>
            <Text style={styles.calendarButtonTextCancel}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calendarButton} onPress={handleConfirm}>
            <Text style={styles.calendarButtonTextConfirm}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Format date for display in the UI
  const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const handleSelectDate = (date) => {
    setFormData({ ...formData, birthDate: date.toISOString() });
    validateField('birthDate', date.toISOString());
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <FontAwesome name="user" size={20} color="#FF6B00" />
        <Text style={styles.title}>Personal Details</Text>
      </View>

      {/* Full Name */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={[styles.input, errors.fullName && styles.inputError]}
          placeholder="Enter your full name"
          value={formData.fullName}
          onChangeText={(text) => {
            setFormData({ ...formData, fullName: text });
            validateField('fullName', text);
          }}
        />
        {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
      </View>

      {/* Email Address */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Enter your email address"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => {
            setFormData({ ...formData, email: text });
            validateField('email', text);
          }}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      {/* Gender */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gender</Text>
        <TouchableOpacity 
          style={[styles.dropdownButton, errors.gender && styles.inputError]} 
          onPress={() => setShowGenderPicker(true)}
        >
          <Text style={formData.gender ? styles.dropdownText : styles.dropdownPlaceholder}>
            {formData.gender || 'Select Gender'}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
        {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
      </View>

      {/* Date of Birth */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity 
          style={[styles.dateButton, errors.birthDate && styles.inputError]}
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons name="calendar-outline" size={20} color="#666" style={styles.dateIcon} />
          <Text style={formData.birthDate ? styles.dropdownText : styles.dropdownPlaceholder}>
            {formData.birthDate ? formatDisplayDate(formData.birthDate) : 'Pick a date'}
          </Text>
        </TouchableOpacity>
        {errors.birthDate && <Text style={styles.errorText}>{errors.birthDate}</Text>}
      </View>

      {/* Time of Birth */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Time of Birth</Text>
        <View style={styles.timePickerContainer}>
          {/* Hour */}
          <TouchableOpacity 
            style={[styles.timeButton, errors.birthTime?.hour && styles.inputError]} 
            onPress={() => handleTimePickerOpen('hour')}
          >
            <Text style={styles.dropdownText}>{formData.birthTime.hour}</Text>
            <Ionicons name="chevron-down" size={16} color="#666" />
          </TouchableOpacity>
          
          <Text style={styles.timeSeparator}>:</Text>
          
          {/* Minute */}
          <TouchableOpacity 
            style={[styles.timeButton, errors.birthTime?.minute && styles.inputError]} 
            onPress={() => handleTimePickerOpen('minute')}
          >
            <Text style={styles.dropdownText}>{formData.birthTime.minute}</Text>
            <Ionicons name="chevron-down" size={16} color="#666" />
          </TouchableOpacity>
          
          {/* AM/PM */}
          <TouchableOpacity 
            style={[styles.timeButton, errors.birthTime?.ampm && styles.inputError]} 
            onPress={() => handleTimePickerOpen('ampm')}
          >
            <Text style={styles.dropdownText}>{formData.birthTime.ampm}</Text>
            <Ionicons name="chevron-down" size={16} color="#666" />
          </TouchableOpacity>
        </View>
        {(errors.birthTime?.hour || errors.birthTime?.minute || errors.birthTime?.ampm) && (
          <Text style={styles.errorText}>Please select a valid birth time</Text>
        )}
      </View>

      {/* Birth Location */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Birth Location</Text>
        <TextInput
          style={[styles.input, errors.birthLocation && styles.inputError]}
          placeholder="Enter city, state or country"
          value={formData.birthLocation}
          onChangeText={(text) => {
            setFormData({ ...formData, birthLocation: text });
            validateField('birthLocation', text);
          }}
        />
        {errors.birthLocation && <Text style={styles.errorText}>{errors.birthLocation}</Text>}
      </View>

      {/* Gender Picker Modal */}
      <Modal
        visible={showGenderPicker}
        transparent={true}
        animationType="fade"
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          onPress={() => setShowGenderPicker(false)}
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Gender</Text>
              <TouchableOpacity onPress={() => setShowGenderPicker(false)}>
                <Ionicons name="close-circle" size={24} color="#FF6B00" />
              </TouchableOpacity>
            </View>

            {genderOptions.map((gender) => (
              <TouchableOpacity
                key={gender}
                style={styles.optionItem}
                onPress={() => handleSelectGender(gender)}
              >
                <Text style={styles.optionText}>{gender}</Text>
                {formData.gender === gender && (
                  <Ionicons name="checkmark-circle" size={20} color="#FF6B00" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="fade"
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          onPress={() => setShowDatePicker(false)}
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            <Calendar 
              onSelectDate={handleSelectDate}
              onClose={() => setShowDatePicker(false)}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Time Picker Modal */}
      <Modal
        visible={showTimePicker}
        transparent={true}
        animationType="fade"
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          onPress={() => setShowTimePicker(false)}
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Select {activeTimeField === 'hour' ? 'Hour' : activeTimeField === 'minute' ? 'Minute' : 'AM/PM'}
              </Text>
              <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                <Ionicons name="close-circle" size={24} color="#FF6B00" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.optionList}>
              {activeTimeField === 'hour' && hours.map((hour) => (
                <TouchableOpacity
                  key={hour}
                  style={styles.optionItem}
                  onPress={() => handleSelectTimeValue(hour)}
                >
                  <Text style={styles.optionText}>{hour}</Text>
                  {formData.birthTime.hour === hour && (
                    <Ionicons name="checkmark-circle" size={20} color="#FF6B00" />
                  )}
                </TouchableOpacity>
              ))}

              {activeTimeField === 'minute' && minutes.map((minute) => (
                <TouchableOpacity
                  key={minute}
                  style={styles.optionItem}
                  onPress={() => handleSelectTimeValue(minute)}
                >
                  <Text style={styles.optionText}>{minute}</Text>
                  {formData.birthTime.minute === minute && (
                    <Ionicons name="checkmark-circle" size={20} color="#FF6B00" />
                  )}
                </TouchableOpacity>
              ))}

              {activeTimeField === 'ampm' && ampm.map((period) => (
                <TouchableOpacity
                  key={period}
                  style={styles.optionItem}
                  onPress={() => handleSelectTimeValue(period)}
                >
                  <Text style={styles.optionText}>{period}</Text>
                  {formData.birthTime.ampm === period && (
                    <Ionicons name="checkmark-circle" size={20} color="#FF6B00" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 0,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 10,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
  dropdownButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333333',
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#AAAAAA',
  },
  dateButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  dateIcon: {
    marginRight: 10,
  },
  timePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  timeSeparator: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#666666',
    marginHorizontal: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  optionList: {
    maxHeight: 300,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
  },
  // Calendar styles
  calendarContainer: {
    padding: 5,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333333',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  calendarDay: {
    width: '13%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 20,
  },
  calendarDaySelected: {
    backgroundColor: '#FF6B00',
  },
  calendarDayText: {
    fontSize: 16,
    color: '#333333',
  },
  calendarDayTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  calendarActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 10,
  },
  calendarButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginLeft: 10,
  },
  calendarButtonTextCancel: {
    color: '#666666',
    fontSize: 16,
  },
  calendarButtonTextConfirm: {
    color: '#FF6B00',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PersonalDetailsForm; 