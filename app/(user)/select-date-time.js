import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  TextInput,
  Platform,
  Modal
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

// Calendar component for date selection
const Calendar = ({ onSelectDate, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  // Generate years (100 years before current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  
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
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isSelected = selectedDate && 
                         date.getDate() === selectedDate.getDate() && 
                         date.getMonth() === selectedDate.getMonth() && 
                         date.getFullYear() === selectedDate.getFullYear();
      
      days.push(
        <TouchableOpacity
          key={`day-${i}`}
          style={[
            styles.calendarDay,
            isSelected && styles.calendarDaySelected
          ]}
          onPress={() => setSelectedDate(date)}
        >
          <Text style={[
            styles.calendarDayText,
            isSelected && styles.calendarDayTextSelected
          ]}>
            {i}
          </Text>
        </TouchableOpacity>
      );
    }
    
    return days;
  };
  
  const goToPreviousMonth = () => {
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    setCurrentMonth(previousMonth);
  };
  
  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };
  
  const handleSelectMonth = (monthIndex) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(monthIndex);
    setCurrentMonth(newDate);
    setShowMonthPicker(false);
  };
  
  const handleSelectYear = (year) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(year);
    setCurrentMonth(newDate);
    setShowYearPicker(false);
  };
  
  const handleConfirm = () => {
    if (selectedDate) {
      onSelectDate(selectedDate);
    }
    onClose();
  };
  
  return (
    <View style={styles.calendarContainer}>
      <View style={styles.calendarHeader}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <View style={styles.calendarTitleContainer}>
          <TouchableOpacity 
            style={styles.calendarTitleButton}
            onPress={() => {
              setShowMonthPicker(!showMonthPicker);
              setShowYearPicker(false);
            }}
          >
            <Text style={styles.calendarTitle}>
              {monthNames[currentMonth.getMonth()]}
            </Text>
            <Ionicons name="chevron-down" size={16} color="#333" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.calendarTitleButton}
            onPress={() => {
              setShowYearPicker(!showYearPicker);
              setShowMonthPicker(false);
            }}
          >
            <Text style={styles.calendarTitle}>
              {currentMonth.getFullYear()}
            </Text>
            <Ionicons name="chevron-down" size={16} color="#333" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={goToNextMonth}>
          <Ionicons name="chevron-forward" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      {/* Month Selection Dropdown */}
      {showMonthPicker && (
        <View style={styles.calendarDropdown}>
          <ScrollView style={styles.calendarDropdownScroll}>
            {monthNames.map((month, index) => (
              <TouchableOpacity
                key={month}
                style={[
                  styles.calendarDropdownItem,
                  currentMonth.getMonth() === index && styles.calendarDropdownItemSelected
                ]}
                onPress={() => handleSelectMonth(index)}
              >
                <Text style={[
                  styles.calendarDropdownItemText,
                  currentMonth.getMonth() === index && styles.calendarDropdownItemTextSelected
                ]}>
                  {month}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      
      {/* Year Selection Dropdown */}
      {showYearPicker && (
        <View style={styles.calendarDropdown}>
          <ScrollView style={styles.calendarDropdownScroll}>
            {years.map((year) => (
              <TouchableOpacity
                key={year}
                style={[
                  styles.calendarDropdownItem,
                  currentMonth.getFullYear() === year && styles.calendarDropdownItemSelected
                ]}
                onPress={() => handleSelectYear(year)}
              >
                <Text style={[
                  styles.calendarDropdownItemText,
                  currentMonth.getFullYear() === year && styles.calendarDropdownItemTextSelected
                ]}>
                  {year}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      
      <View style={styles.calendarDaysHeader}>
        {daysOfWeek.map((day) => (
          <Text key={day} style={styles.calendarDayHeaderText}>{day}</Text>
        ))}
      </View>
      
      <View style={styles.calendarGrid}>
        {renderDays()}
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

const SelectDateTimeScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id, title, subtitle, duration, price } = params;

  // Form state
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [birthTime, setBirthTime] = useState({ hour: '09', minute: '00', ampm: 'AM' });
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [gender, setGender] = useState('');
  
  // Modal states
  const [showCalendar, setShowCalendar] = useState(false);
  const [showHourPicker, setShowHourPicker] = useState(false);
  const [showMinutePicker, setShowMinutePicker] = useState(false);
  const [showAmPmPicker, setShowAmPmPicker] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
  const ampm = ['AM', 'PM'];
  const genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

  const handleContinue = () => {
    // Navigate to the next step in the booking flow
    router.push({
      pathname: '/payment',
      params: { 
        id, 
        title, 
        subtitle, 
        duration, 
        price,
        fullName,
        birthDate: birthDate ? formatDateForAPI(birthDate) : '',
        birthTime: `${birthTime.hour}:${birthTime.minute} ${birthTime.ampm}`,
        placeOfBirth,
        gender
      }
    });
  };

  const handlePrevious = () => {
    router.back();
  };

  const formatDate = (date) => {
    if (!date) return 'Pick a date';
    
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  };
  
  const formatDateForAPI = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Close all pickers
  const closeAllPickers = () => {
    setShowHourPicker(false);
    setShowMinutePicker(false);
    setShowAmPmPicker(false);
    setShowGenderPicker(false);
    setShowCalendar(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Progress Bar and Basic Info */}
        <View style={styles.bookingSummaryCard}>
          <View style={styles.bookingStepsIndicator}>
            <View style={styles.stepComplete}>
              <FontAwesome name="check" size={14} color="white" />
            </View>
            <View style={styles.stepConnector} />
            <View style={styles.stepActive}>
              <Text style={styles.stepText}>2</Text>
            </View>
            <View style={styles.stepConnector} />
            <View style={styles.stepInactive}>
              <Text style={styles.stepTextInactive}>3</Text>
            </View>
          </View>

          <View style={styles.consultationHeaderContainer}>
            <Image 
              source={require('../../assets/images/icon.png')} 
              style={styles.consultationThumbnail} 
            />
            <View style={styles.consultationHeaderDetails}>
              <Text style={styles.consultationTitle}>{title}</Text>
              <Text style={styles.consultationSubtitle}>{subtitle}</Text>
              <Text style={styles.consultationDuration}>{duration} minutes</Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Birth Details for prediction</Text>

            {/* Form Fields */}
            <TextInput
              style={styles.textInput}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />

            {/* Date of Birth */}
            <TouchableOpacity 
              style={styles.datePickerButton}
              onPress={() => {
                closeAllPickers();
                setShowCalendar(true);
              }}
            >
              <Ionicons name="calendar-outline" size={22} color="#666" style={styles.inputIcon} />
              <Text style={styles.datePickerText}>
                {birthDate ? formatDate(birthDate) : 'Pick a date'}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#666" />
            </TouchableOpacity>

            {/* Time of Birth */}
            <View style={styles.timePickerContainer}>
              <TouchableOpacity 
                style={styles.timePickerButton}
                onPress={() => {
                  closeAllPickers();
                  setShowHourPicker(!showHourPicker);
                }}
              >
                <Text style={styles.timePickerText}>{birthTime.hour}</Text>
                <Ionicons name="chevron-down" size={16} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.timePickerButton}
                onPress={() => {
                  closeAllPickers();
                  setShowMinutePicker(!showMinutePicker);
                }}
              >
                <Text style={styles.timePickerText}>{birthTime.minute}</Text>
                <Ionicons name="chevron-down" size={16} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.timePickerButton}
                onPress={() => {
                  closeAllPickers();
                  setShowAmPmPicker(!showAmPmPicker);
                }}
              >
                <Text style={styles.timePickerText}>{birthTime.ampm}</Text>
                <Ionicons name="chevron-down" size={16} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Hour Picker Dropdown */}
            {showHourPicker && (
              <View style={styles.pickerDropdown}>
                <ScrollView style={{ maxHeight: 150 }}>
                  {hours.map((hour) => (
                    <TouchableOpacity
                      key={hour}
                      style={styles.pickerItem}
                      onPress={() => {
                        setBirthTime({...birthTime, hour});
                        setShowHourPicker(false);
                      }}
                    >
                      <Text style={[
                        styles.pickerItemText,
                        birthTime.hour === hour && styles.pickerItemTextSelected
                      ]}>
                        {hour}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Minute Picker Dropdown */}
            {showMinutePicker && (
              <View style={styles.pickerDropdown}>
                <ScrollView style={{ maxHeight: 150 }}>
                  {minutes.map((minute) => (
                    <TouchableOpacity
                      key={minute}
                      style={styles.pickerItem}
                      onPress={() => {
                        setBirthTime({...birthTime, minute});
                        setShowMinutePicker(false);
                      }}
                    >
                      <Text style={[
                        styles.pickerItemText,
                        birthTime.minute === minute && styles.pickerItemTextSelected
                      ]}>
                        {minute}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* AM/PM Picker Dropdown */}
            {showAmPmPicker && (
              <View style={styles.pickerDropdown}>
                {ampm.map((period) => (
                  <TouchableOpacity
                    key={period}
                    style={styles.pickerItem}
                    onPress={() => {
                      setBirthTime({...birthTime, ampm: period});
                      setShowAmPmPicker(false);
                    }}
                  >
                    <Text style={[
                      styles.pickerItemText,
                      birthTime.ampm === period && styles.pickerItemTextSelected
                    ]}>
                      {period}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Place of Birth */}
            <TextInput
              style={styles.textInput}
              placeholder="Place of Birth"
              value={placeOfBirth}
              onChangeText={setPlaceOfBirth}
            />

            {/* Gender Selection */}
            <TouchableOpacity 
              style={styles.genderPicker}
              onPress={() => {
                closeAllPickers();
                setShowGenderPicker(!showGenderPicker);
              }}
            >
              <Text style={styles.genderPickerText}>
                {gender || 'Select Gender'}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#666" />
            </TouchableOpacity>

            {/* Gender Picker Dropdown */}
            {showGenderPicker && (
              <View style={styles.pickerDropdown}>
                {genderOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.pickerItem}
                    onPress={() => {
                      setGender(option);
                      setShowGenderPicker(false);
                    }}
                  >
                    <Text style={[
                      styles.pickerItemText,
                      gender === option && styles.pickerItemTextSelected
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
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
                style={styles.continueButton}
                onPress={handleContinue}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.termsText}>
              By proceeding, you agree to our terms and conditions
            </Text>
          </View>
        </View>

        {/* Calendar Modal */}
        <Modal
          visible={showCalendar}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Calendar 
                onSelectDate={(date) => setBirthDate(date)}
                onClose={() => setShowCalendar(false)}
              />
            </View>
          </View>
        </Modal>
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
  stepInactive: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EEEEEE',
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
  stepTextInactive: {
    color: '#888888',
    fontWeight: 'bold',
  },
  consultationHeaderContainer: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  consultationThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  consultationHeaderDetails: {
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
  formContainer: {
    padding: 15,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  datePickerButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  datePickerText: {
    fontSize: 16,
    color: '#666666',
    flex: 1,
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  timePickerButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '30%',
  },
  timePickerText: {
    fontSize: 16,
    color: '#666666',
  },
  genderPicker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  genderPickerText: {
    fontSize: 16,
    color: '#666666',
  },
  pickerDropdown: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    maxHeight: 150,
    zIndex: 1000,
  },
  pickerItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  pickerItemText: {
    fontSize: 16,
    color: '#666666',
  },
  pickerItemTextSelected: {
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 15,
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
  continueButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#888888',
    marginTop: 10,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 340,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  // Calendar styles
  calendarContainer: {
    padding: 15,
    backgroundColor: 'white',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  calendarTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  calendarTitleButton: {
    flexDirection: 'row', 
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#F0F0F0',
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 5,
  },
  calendarDaysHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  calendarDayHeaderText: {
    flex: 1,
    textAlign: 'center',
    color: '#666',
    fontWeight: '500',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    color: '#333',
    fontSize: 15,
  },
  calendarDayTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  calendarActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  calendarButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginLeft: 10,
  },
  calendarButtonTextCancel: {
    color: '#666',
    fontSize: 15,
    fontWeight: '500',
  },
  calendarButtonTextConfirm: {
    color: '#FF6B00',
    fontSize: 15,
    fontWeight: 'bold',
  },
  calendarDropdown: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    marginBottom: 15,
    marginTop: -15,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 70,
    left: 15,
    right: 15,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  calendarDropdownScroll: {
    maxHeight: 200,
  },
  calendarDropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  calendarDropdownItemSelected: {
    backgroundColor: '#FFEEE5',
  },
  calendarDropdownItemText: {
    fontSize: 16,
    color: '#666666',
  },
  calendarDropdownItemTextSelected: {
    color: '#FF6B00',
    fontWeight: 'bold',
  },
});

export default SelectDateTimeScreen; 