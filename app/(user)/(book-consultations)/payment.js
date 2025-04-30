import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const AppointmentScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id, title, subtitle, duration, price, fullName, birthDate, birthTime, placeOfBirth, gender } = params;

  // State for the timezone, date and time slot selection
  const [selectedTimezone, setSelectedTimezone] = useState('UK');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Dummy data for available dates and time slots
  const availableDates = [
    { id: 1, date: 'April 29, 2025' },
    { id: 2, date: 'April 30, 2025' },
    { id: 3, date: 'May 1, 2025' },
    { id: 4, date: 'May 2, 2025' },
    { id: 5, date: 'May 3, 2025' },
    { id: 6, date: 'May 4, 2025' },
    { id: 7, date: 'May 5, 2025' },
  ];

  // Time slots are dependent on the selected date
  const getTimeSlots = (date) => {
    // In a real app, this would be fetched from an API based on the date
    const timeSlots = [
      { id: 1, time: '10:00 am' },
      { id: 2, time: '11:15 am' },
      { id: 3, time: '4:00 pm' },
      { id: 4, time: '5:15 pm' },
      { id: 5, time: '6:30 pm' },
      { id: 6, time: '2:06 am' },
    ];
    return timeSlots;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null); // Reset time slot selection when date changes
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handlePrevious = () => {
    router.back();
  };

  const handleBookConsultation = () => {
    // In a real app, this would make an API call to book the consultation
    // For now, just navigate to a success page or back to home
    router.push('/(user)/(book-consultations)/consultation-success');
  };

  const handlePaymentComplete = () => {
    // In a real app, process payment here
    // Then navigate to success screen
    router.push('/(user)/(book-consultations)/consultation-success');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.bookingSummaryCard}>
          {/* Progress Bar */}
          <View style={styles.bookingStepsIndicator}>
            <View style={styles.stepComplete}>
              <Ionicons name="checkmark" size={18} color="white" />
            </View>
            <View style={styles.stepConnector} />
            <View style={styles.stepComplete}>
              <Ionicons name="checkmark" size={18} color="white" />
            </View>
            <View style={styles.stepConnector} />
            <View style={styles.stepActive}>
              <Text style={styles.stepText}>3</Text>
            </View>
          </View>

          {/* Consultation Details */}
          <View style={styles.consultationHeaderContainer}>
            <Image
              source={require('../../../assets/images/icon.png')}
              style={styles.consultationThumbnail}
            />
            <View style={styles.consultationDetails}>
              <Text style={styles.consultationTitle}>{title}</Text>
              <Text style={styles.consultationSubtitle}>{subtitle}</Text>
              <Text style={styles.consultationDuration}>{duration} minutes</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Timezone Selection */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              Select your timezone for scheduling the consultation
            </Text>
            <View style={styles.timezoneSelector}>
              <TouchableOpacity
                style={[
                  styles.timezoneOption,
                  selectedTimezone === 'UK' && styles.selectedTimezoneOption,
                ]}
                onPress={() => setSelectedTimezone('UK')}
              >
                <Text style={styles.timezoneText}>
                  🇬🇧 UK
                </Text>
              </TouchableOpacity>
              {/* Add more timezone options if needed */}
            </View>
          </View>

          <View style={styles.divider} />

          {/* Date Selection */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Please select date and time slot</Text>
            <View style={styles.dateSelection}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {availableDates.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.dateOption,
                      selectedDate === item.date && styles.selectedDateOption,
                    ]}
                    onPress={() => handleDateSelect(item.date)}
                  >
                    <Text
                      style={[
                        styles.dateText,
                        selectedDate === item.date && styles.selectedDateText,
                      ]}
                    >
                      {item.date}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          {/* Time Slot Selection */}
          {selectedDate && (
            <View style={styles.sectionContainer}>
              <Text style={styles.slotTitle}>
                Available slots for selected date{' '}
                <Text style={styles.highlightedText}>{selectedDate}</Text>
              </Text>
              <View style={styles.timeSlotGrid}>
                {getTimeSlots(selectedDate).map((slot) => (
                  <TouchableOpacity
                    key={slot.id}
                    style={[
                      styles.timeSlotOption,
                      selectedTimeSlot === slot.time && styles.selectedTimeSlotOption,
                    ]}
                    onPress={() => handleTimeSlotSelect(slot.time)}
                  >
                    <Text
                      style={[
                        styles.timeSlotText,
                        selectedTimeSlot === slot.time && styles.selectedTimeSlotText,
                      ]}
                    >
                      {slot.time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Navigation Buttons */}
          <View style={styles.navigationButtons}>
            <TouchableOpacity
              style={styles.previousButton}
              onPress={handlePrevious}
            >
              <Text style={styles.previousButtonText}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.bookButton,
                (!selectedDate || !selectedTimeSlot) && styles.disabledButton,
              ]}
              onPress={handleBookConsultation}
              disabled={!selectedDate || !selectedTimeSlot}
            >
              <Text style={styles.bookButtonText}>Book Consultation</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.payButton}
            onPress={handlePaymentComplete}
          >
            <Text style={styles.payButtonText}>Complete Payment</Text>
          </TouchableOpacity>

          <Text style={styles.termsText}>
            By proceeding, you agree to our terms and conditions
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollView: {
    flexGrow: 1,
    padding: 15,
  },
  bookingSummaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  bookingStepsIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#F9F9F9',
  },
  stepComplete: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepActive: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepConnector: {
    width: 50,
    height: 2,
    backgroundColor: '#EEEEEE',
  },
  stepText: {
    color: 'white',
    fontWeight: 'bold',
  },
  consultationHeaderContainer: {
    flexDirection: 'row',
    padding: 15,
  },
  consultationThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  consultationDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  consultationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  consultationSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  consultationDuration: {
    fontSize: 14,
    color: '#888888',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginHorizontal: 15,
  },
  sectionContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  timezoneSelector: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  timezoneOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    marginRight: 10,
  },
  selectedTimezoneOption: {
    borderColor: '#FF6B00',
    backgroundColor: '#FFF5EE',
  },
  timezoneText: {
    fontSize: 16,
    color: '#333333',
  },
  dateSelection: {
    marginBottom: 15,
  },
  dateOption: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  selectedDateOption: {
    borderColor: '#FF6B00',
    backgroundColor: '#FF6B00',
  },
  dateText: {
    fontSize: 16,
    color: '#333333',
  },
  selectedDateText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  slotTitle: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 15,
  },
  highlightedText: {
    fontWeight: 'bold',
    color: '#FF6B00',
  },
  timeSlotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  timeSlotOption: {
    width: '31%',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    marginRight: '2%',
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  selectedTimeSlotOption: {
    borderColor: '#FF6B00',
    backgroundColor: '#FF6B00',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#333333',
  },
  selectedTimeSlotText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  previousButton: {
    backgroundColor: '#EEEEEE',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  previousButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#888888',
    marginBottom: 15,
  },
});

export default AppointmentScreen; 