import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const Calendar = ({ 
  selectedDate, 
  onSelectDate, 
  onClose 
}) => {
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate || new Date()
  );
  const [localSelectedDate, setLocalSelectedDate] = useState(selectedDate);
  
  // Set a default selection if none provided
  useEffect(() => {
    if (!localSelectedDate) {
      setLocalSelectedDate(new Date(currentMonth));
    }
  }, []);
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  const renderDays = () => {
    const days = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Add day headers
    weekDays.forEach(day => (
      days.push(
        <View key={`header-${day}`} style={styles.calendarDayHeader}>
          <Text style={styles.calendarDayHeaderText}>{day}</Text>
        </View>
      )
    ));
    
    // Add empty days from previous month
    const firstDay = getFirstDayOfMonth(year, month);
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <View key={`empty-${i}`} style={styles.calendarDay} />
      );
    }
    
    // Add days of the current month
    const daysInMonth = getDaysInMonth(year, month);
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      
      // Check if this date is selected
      const isSelected = localSelectedDate && 
        date.getDate() === localSelectedDate.getDate() && 
        date.getMonth() === localSelectedDate.getMonth() && 
        date.getFullYear() === localSelectedDate.getFullYear();
      
      days.push(
        <TouchableOpacity
          key={`day-${i}`}
          style={[
            styles.calendarDay,
            isSelected && styles.calendarDaySelected
          ]}
          onPress={() => setLocalSelectedDate(date)}
        >
          <Text
            style={[
              styles.calendarDayText,
              isSelected && styles.calendarDayTextSelected
            ]}
          >
            {i}
          </Text>
        </TouchableOpacity>
      );
    }
    
    return days;
  };
  
  const goToPreviousMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentMonth(newDate);
  };
  
  const goToNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentMonth(newDate);
  };
  
  const confirm = () => {
    if (localSelectedDate) {
      onSelectDate(localSelectedDate);
    }
    onClose();
  };
  
  return (
    <View style={styles.calendarContainer}>
      <LinearGradient
        colors={['#1E1E1E', '#121212']}
        style={styles.calendarContent}
      >
        <View style={styles.calendarHeader}>
          <Text style={styles.calendarTitle}>Select Date</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#AAAAAA" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.monthSelector}>
          <TouchableOpacity onPress={goToPreviousMonth} style={styles.monthButton}>
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <Text style={styles.monthText}>
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </Text>
          
          <TouchableOpacity onPress={goToNextMonth} style={styles.monthButton}>
            <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.calendarDaysContainer}>
          {renderDays()}
        </View>
        
        <View style={styles.calendarFooter}>
          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={confirm}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const TimePicker = ({ 
  selectedTime,
  onSelectTime,
  onClose
}) => {
  // Initialize with either provided values or defaults
  const [hours, setHours] = useState(selectedTime?.hours || '12');
  const [minutes, setMinutes] = useState(selectedTime?.minutes || '00');
  const [period, setPeriod] = useState(selectedTime?.period || 'AM');
  
  const hourOptions = Array.from({ length: 12 }, (_, i) => 
    (i + 1).toString().padStart(2, '0')
  );
  
  const minuteOptions = Array.from({ length: 60 }, (_, i) => 
    i.toString().padStart(2, '0')
  );
  
  // Create refs for the ScrollViews
  const hourScrollRef = React.useRef();
  const minuteScrollRef = React.useRef();
  
  // Scroll to the selected position initially
  useEffect(() => {
    if (hourScrollRef.current) {
      // Find position of selected hour and scroll to it
      const hourIndex = hourOptions.findIndex(h => h === hours);
      if (hourIndex !== -1) {
        setTimeout(() => {
          hourScrollRef.current.scrollTo({ y: hourIndex * 44, animated: true });
        }, 100);
      }
    }
    
    if (minuteScrollRef.current) {
      // Find position of selected minute and scroll to it
      const minuteIndex = minuteOptions.findIndex(m => m === minutes);
      if (minuteIndex !== -1) {
        setTimeout(() => {
          minuteScrollRef.current.scrollTo({ y: minuteIndex * 44, animated: true });
        }, 100);
      }
    }
  }, []);
  
  const confirm = () => {
    onSelectTime({ hours, minutes, period });
    onClose();
  };
  
  return (
    <View style={styles.calendarContainer}>
      <LinearGradient
        colors={['#1E1E1E', '#121212']}
        style={styles.calendarContent}
      >
        <View style={styles.calendarHeader}>
          <Text style={styles.calendarTitle}>Select Time</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#AAAAAA" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.timePickerContainer}>
          {/* Hours */}
          <View style={styles.timeColumn}>
            <Text style={styles.timeLabel}>Hour</Text>
            <View style={styles.timeScrollViewContainer}>
              <ScrollView 
                ref={hourScrollRef}
                style={styles.timeScrollView}
                showsVerticalScrollIndicator={false}
              >
                {hourOptions.map(hour => (
                  <TouchableOpacity
                    key={`hour-${hour}`}
                    style={[
                      styles.timeOption,
                      hours === hour && styles.timeOptionSelected
                    ]}
                    onPress={() => setHours(hour)}
                  >
                    <Text
                      style={[
                        styles.timeOptionText,
                        hours === hour && styles.timeOptionTextSelected
                      ]}
                    >
                      {hour}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
          
          {/* Separator */}
          <View style={styles.timeSeparator}>
            <Text style={styles.timeSeparatorText}>:</Text>
          </View>
          
          {/* Minutes */}
          <View style={styles.timeColumn}>
            <Text style={styles.timeLabel}>Minute</Text>
            <View style={styles.timeScrollViewContainer}>
              <ScrollView 
                ref={minuteScrollRef}
                style={styles.timeScrollView}
                showsVerticalScrollIndicator={false}
              >
                {minuteOptions.map(minute => (
                  <TouchableOpacity
                    key={`minute-${minute}`}
                    style={[
                      styles.timeOption,
                      minutes === minute && styles.timeOptionSelected
                    ]}
                    onPress={() => setMinutes(minute)}
                  >
                    <Text
                      style={[
                        styles.timeOptionText,
                        minutes === minute && styles.timeOptionTextSelected
                      ]}
                    >
                      {minute}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
          
          {/* AM/PM */}
          <View style={styles.timeColumn}>
            <Text style={styles.timeLabel}>AM/PM</Text>
            <View style={styles.amPmContainer}>
              <TouchableOpacity
                style={[
                  styles.amPmOption,
                  period === 'AM' && styles.amPmOptionSelected
                ]}
                onPress={() => setPeriod('AM')}
              >
                <Text
                  style={[
                    styles.amPmOptionText,
                    period === 'AM' && styles.amPmOptionTextSelected
                  ]}
                >
                  AM
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.amPmOption,
                  period === 'PM' && styles.amPmOptionSelected
                ]}
                onPress={() => setPeriod('PM')}
              >
                <Text
                  style={[
                    styles.amPmOptionText,
                    period === 'PM' && styles.amPmOptionTextSelected
                  ]}
                >
                  PM
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.calendarFooter}>
          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={confirm}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const DateTimePicker = ({
  mode = 'date', // 'date', 'time', or 'datetime'
  value,
  onChange,
  placeholder,
  label,
  error
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [dateValue, setDateValue] = useState(value);
  const [timeValue, setTimeValue] = useState({
    hours: '12',
    minutes: '00',
    period: 'AM'
  });
  const [pickerMode, setPickerMode] = useState(mode === 'datetime' ? 'date' : mode);
  
  useEffect(() => {
    if (value && value instanceof Date) {
      setDateValue(value);
      
      // Extract time from date
      const hours = value.getHours();
      const adjustedHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
      const minutes = value.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      
      setTimeValue({
        hours: adjustedHours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        period
      });
    }
  }, [value]);
  
  const handleSelectDate = (date) => {
    setDateValue(date);
    
    if (mode === 'datetime') {
      // After date selection, automatically switch to time selection
      setPickerMode('time');
    } else {
      // For date only, close the picker and trigger onChange
      setShowPicker(false);
      onChange(date);
    }
  };
  
  const handleSelectTime = (time) => {
    setTimeValue(time);
    setShowPicker(false);
    
    // Create date object with selected time
    const newDate = dateValue ? new Date(dateValue) : new Date();
    const hours = time.period === 'PM' && time.hours !== '12'
      ? parseInt(time.hours) + 12
      : time.period === 'AM' && time.hours === '12'
        ? 0
        : parseInt(time.hours);
    
    newDate.setHours(hours, parseInt(time.minutes));
    onChange(newDate);
  };
  
  const formatDate = (date) => {
    if (!date) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  };
  
  const formatTime = (time) => {
    if (!time) return '';
    return `${time.hours}:${time.minutes} ${time.period}`;
  };
  
  const formatDateTime = () => {
    if (!dateValue) return '';
    
    if (mode === 'date') {
      return formatDate(dateValue);
    } else if (mode === 'time') {
      return formatTime(timeValue);
    } else {
      return `${formatDate(dateValue)} at ${formatTime(timeValue)}`;
    }
  };
  
  const openPicker = () => {
    // For datetime, always start with date selection
    if (mode === 'datetime') {
      setPickerMode('date');
    }
    setShowPicker(true);
  };
  
  const renderPickerContent = () => {
    if (pickerMode === 'date') {
      return (
        <Calendar
          selectedDate={dateValue}
          onSelectDate={handleSelectDate}
          onClose={() => setShowPicker(false)}
        />
      );
    } else if (pickerMode === 'time') {
      return (
        <TimePicker
          selectedTime={timeValue}
          onSelectTime={handleSelectTime}
          onClose={() => setShowPicker(false)}
        />
      );
    }
  };
  
  const getIconName = () => {
    if (mode === 'date') return 'calendar-outline';
    if (mode === 'time') return 'time-outline';
    return 'calendar-outline'; // datetime
  };
  
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity
        style={[
          styles.pickerButton,
          error && styles.pickerButtonError,
          formatDateTime() && styles.pickerButtonSelected
        ]}
        onPress={openPicker}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={getIconName()} 
          size={20} 
          color={formatDateTime() ? "#FF6B00" : "#888888"} 
          style={styles.pickerIcon}
        />
        
        <Text
          style={[
            styles.pickerText,
            !formatDateTime() && styles.placeholderText,
            formatDateTime() && styles.selectedText
          ]}
        >
          {formatDateTime() || placeholder || `Select ${mode}`}
        </Text>
        
        <Ionicons 
          name="chevron-down" 
          size={18} 
          color={formatDateTime() ? "#FF6B00" : "#888888"} 
        />
      </TouchableOpacity>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      <Modal
        visible={showPicker}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          {renderPickerContent()}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    height: 56,
    paddingHorizontal: 16,
  },
  pickerButtonError: {
    borderColor: '#FF4444',
    backgroundColor: 'rgba(255, 68, 68, 0.05)',
  },
  pickerButtonSelected: {
    borderColor: 'rgba(255, 107, 0, 0.3)',
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
  },
  pickerIcon: {
    marginRight: 12,
  },
  pickerText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  placeholderText: {
    color: '#666666',
  },
  errorText: {
    color: '#FF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  calendarContainer: {
    width: width * 0.9,
    maxWidth: 360,
    borderRadius: 16,
    overflow: 'hidden',
  },
  calendarContent: {
    padding: 16,
    borderRadius: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 4,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  monthButton: {
    padding: 8,
  },
  monthText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  calendarDaysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  calendarDayHeader: {
    width: '14.28%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarDayHeaderText: {
    color: '#AAAAAA',
    fontSize: 14,
  },
  calendarDay: {
    width: '14.28%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarDaySelected: {
    backgroundColor: '#FF6B00',
    borderRadius: 20,
  },
  calendarDayText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  calendarDayTextSelected: {
    fontWeight: 'bold',
  },
  calendarFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 16,
    alignItems: 'flex-end',
  },
  confirmButton: {
    backgroundColor: '#FF6B00',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 107, 0, 0.5)',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  // Time picker styles
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 16,
  },
  timeColumn: {
    alignItems: 'center',
    width: 80,
  },
  timeLabel: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 8,
  },
  timeScrollViewContainer: {
    height: 220,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  timeScrollView: {
    height: 200,
  },
  timeOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  timeOptionSelected: {
    backgroundColor: 'rgba(255, 107, 0, 0.2)',
  },
  timeOptionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  timeOptionTextSelected: {
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  timeSeparator: {
    justifyContent: 'center',
    marginTop: 35,
    paddingHorizontal: 10,
  },
  timeSeparatorText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  amPmContainer: {
    marginTop: 10,
  },
  amPmOption: {
    width: 60,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 8,
  },
  amPmOptionSelected: {
    backgroundColor: 'rgba(255, 107, 0, 0.2)',
  },
  amPmOptionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  amPmOptionTextSelected: {
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#FF6B00',
    fontWeight: '500',
  },
});

export default DateTimePicker; 