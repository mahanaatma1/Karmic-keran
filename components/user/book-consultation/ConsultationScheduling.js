import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator 
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { COLORS, FONTS } from '../../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

// Mock data for available time slots
const getAvailableTimeSlots = (date) => {
  // In a real app, this would come from an API call
  return [
    { id: 1, time: '09:00 AM', available: true },
    { id: 2, time: '10:00 AM', available: true },
    { id: 3, time: '11:00 AM', available: false },
    { id: 4, time: '12:00 PM', available: true },
    { id: 5, time: '02:00 PM', available: true },
    { id: 6, time: '03:00 PM', available: false },
    { id: 7, time: '04:00 PM', available: true },
    { id: 8, time: '05:00 PM', available: true },
  ];
};

const ConsultationScheduling = ({ onContinue }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Generate available dates (next 14 days)
  useEffect(() => {
    setIsLoading(true);
    const dates = [];
    const currentDate = moment();
    
    // Add dates for the next 14 days
    for (let i = 0; i < 14; i++) {
      const date = moment(currentDate).add(i, 'days');
      // Skip Sundays (or any other day you want to exclude)
      if (date.day() !== 0) {
        dates.push({
          date: date,
          formattedDate: date.format('YYYY-MM-DD'),
          day: date.format('ddd'),
          dayNumber: date.format('DD'),
          month: date.format('MMM'),
        });
      }
    }
    
    setAvailableDates(dates);
    setIsLoading(false);
    
    // Set first date as default
    if (dates.length > 0) {
      handleDateSelect(dates[0]);
    }
  }, []);

  // Generate available time slots for the selected date
  const generateTimeSlots = (selectedDate) => {
    // In a real app, you might fetch available slots from an API
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    const intervalMinutes = 30;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += intervalMinutes) {
        // Skip lunch break (12:00 - 13:00)
        if (!(hour === 12 && minute === 0)) {
          const time = moment().set({
            hour: hour,
            minute: minute,
            second: 0,
            millisecond: 0
          });
          
          slots.push({
            time: time,
            formattedTime: time.format('hh:mm A'),
            available: Math.random() > 0.3 // Randomly set some slots as unavailable for demo
          });
        }
      }
    }
    
    setAvailableTimeSlots(slots);
  };

  // Handle date selection
  const handleDateSelect = (dateObj) => {
    setSelectedDate(dateObj);
    setSelectedTime(null);
    generateTimeSlots(dateObj);
  };

  // Handle time selection
  const handleTimeSelect = (timeObj) => {
    if (timeObj.available) {
      setSelectedTime(timeObj);
    }
  };

  // Handle continue to next step
  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      onContinue(selectedDate, selectedTime);
    }
  };

  const getMarkedDates = () => {
    const today = new Date();
    const markedDates = {};
    
    if (selectedDate) {
      markedDates[selectedDate] = {
        selected: true,
        selectedColor: COLORS.primary
      };
    }
    
    return markedDates;
  };

  // Render date picker
  const renderDatePicker = () => {
    return (
      <View style={styles.datePickerContainer}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateScroll}
        >
          {availableDates.map((dateObj, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateItem,
                selectedDate?.formattedDate === dateObj.formattedDate && styles.selectedDateItem
              ]}
              onPress={() => handleDateSelect(dateObj)}
            >
              <Text style={[
                styles.dayText,
                selectedDate?.formattedDate === dateObj.formattedDate && styles.selectedDateText
              ]}>
                {dateObj.day}
              </Text>
              <Text style={[
                styles.dateText,
                selectedDate?.formattedDate === dateObj.formattedDate && styles.selectedDateText
              ]}>
                {dateObj.dayNumber}
              </Text>
              <Text style={[
                styles.monthText,
                selectedDate?.formattedDate === dateObj.formattedDate && styles.selectedDateText
              ]}>
                {dateObj.month}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  // Render time slot picker
  const renderTimeSlotPicker = () => {
    return (
      <View style={styles.timePickerContainer}>
        <Text style={styles.sectionTitle}>Select Time</Text>
        <View style={styles.timeSlotsGrid}>
          {availableTimeSlots.map((timeObj, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeSlot,
                !timeObj.available && styles.unavailableTimeSlot,
                selectedTime?.formattedTime === timeObj.formattedTime && styles.selectedTimeSlot
              ]}
              onPress={() => handleTimeSelect(timeObj)}
              disabled={!timeObj.available}
            >
              <Text style={[
                styles.timeText,
                !timeObj.available && styles.unavailableTimeText,
                selectedTime?.formattedTime === timeObj.formattedTime && styles.selectedTimeText
              ]}>
                {timeObj.formattedTime}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  // Render continue button
  const renderContinueButton = () => {
    const isEnabled = selectedDate && selectedTime;
    
    return (
      <TouchableOpacity
        style={[
          styles.continueButton,
          !isEnabled && styles.disabledButton
        ]}
        onPress={handleContinue}
        disabled={!isEnabled}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
        <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading available slots...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderDatePicker()}
        {renderTimeSlotPicker()}
      </ScrollView>
      <View style={styles.footer}>
        {renderContinueButton()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    ...FONTS.body3,
    color: COLORS.darkGray,
    marginTop: 10,
  },
  datePickerContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  sectionTitle: {
    ...FONTS.h4,
    color: COLORS.black,
    marginBottom: 12,
  },
  dateScroll: {
    paddingBottom: 8,
  },
  dateItem: {
    width: 60,
    height: 80,
    borderRadius: 10,
    backgroundColor: COLORS.lightGray,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  selectedDateItem: {
    backgroundColor: COLORS.primary,
  },
  dayText: {
    ...FONTS.body4,
    color: COLORS.darkGray,
  },
  dateText: {
    ...FONTS.h3,
    color: COLORS.black,
    marginVertical: 4,
  },
  monthText: {
    ...FONTS.body4,
    color: COLORS.darkGray,
  },
  selectedDateText: {
    color: COLORS.white,
  },
  timePickerContainer: {
    padding: 16,
  },
  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    width: '31%',
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  selectedTimeSlot: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  unavailableTimeSlot: {
    backgroundColor: '#F8F8F8',
    borderColor: '#EEEEEE',
  },
  timeText: {
    ...FONTS.body4,
    color: COLORS.black,
  },
  selectedTimeText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  unavailableTimeText: {
    color: COLORS.darkGray,
    textDecorationLine: 'line-through',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: COLORS.lightGray,
  },
  continueButtonText: {
    ...FONTS.body3,
    fontWeight: 'bold',
    color: COLORS.white,
    marginRight: 8,
  },
});

export default ConsultationScheduling; 