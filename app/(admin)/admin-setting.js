import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, ScrollView } from 'react-native';
import { COLORS, SPACING, FONT } from '../../constants/Theme';
import { useAuth } from '../../context/AuthContext';

// Import modular components
import AdminTabBar from '../../components/admin/AdminTabBar';
import BufferTimeSettings from '../../components/admin/BufferTimeSettings';
import TimezoneSettings from '../../components/admin/TimezoneSettings';
import AvailabilitySettings from '../../components/admin/AvailabilitySettings';
import ServicesAndPricing from '../../components/admin/ServicesAndPricing';
import ServiceFormModal from '../../components/admin/ServiceFormModal';
import DayOffSettings from '../../components/admin/DayOffSettings';
import DateRangeFormModal from '../../components/admin/DateRangeFormModal';

export default function AdminSettingsScreen() {
  const { user } = useAuth();
  
  // State for active tab
  const [activeTab, setActiveTab] = useState('consultation');
  
  // State for buffer time
  const [bufferTime, setBufferTime] = useState('15');
  
  // State for timezone
  const [timezone, setTimezone] = useState('UK');
  
  // States for time slots
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, startTime: '10:00', startPeriod: 'AM', endTime: '13:00', endPeriod: 'PM' },
    { id: 2, startTime: '16:00', startPeriod: 'PM', endTime: '20:00', endPeriod: 'PM' },
  ]);
  
  // State for 12-hour format toggle
  const [use12HourFormat, setUse12HourFormat] = useState(true);
  
  // State for available booking times
  const [availableBookings, setAvailableBookings] = useState([
    { id: 1, startTime: '10:00 AM', endTime: '04:00 PM', active: true },
    { id: 2, startTime: '04:00 PM', endTime: '08:00 PM', active: true },
  ]);
  
  // State for services and service form modal
  const [services, setServices] = useState([
    { 
      id: 1, 
      title: 'Personal Reading', 
      description: 'Get a comprehensive analysis of your life path, including insights into your personality, strengths, weaknesses, and potential future directions.',
      price: 39.00,
      active: true
    },
    { 
      id: 2, 
      title: 'Career & Business Astrology', 
      description: 'Get expert astrological guidance for your career decisions and business ventures. We\'ll analyze your chart to identify optimal timing for key moves.',
      price: 65.00,
      active: true
    },
  ]);
  
  // State for date ranges and date range form modal
  const [dateRanges, setDateRanges] = useState([
    {
      dateRange: "Apr 23, 2025 - Apr 25, 2025",
      type: "Available",
      status: "Past",
      duration: "2 days"
    },
    {
      dateRange: "Apr 26, 2025 - Apr 26, 2025",
      type: "DayOff",
      status: "Past",
      duration: "1 days"
    },
  ]);
  
  const [serviceModalVisible, setServiceModalVisible] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  
  const [dateRangeModalVisible, setDateRangeModalVisible] = useState(false);
  const [currentDateRange, setCurrentDateRange] = useState(null);
  
  // Function to remove a time slot
  const removeTimeSlot = (id) => {
    setTimeSlots(timeSlots.filter(slot => slot.id !== id));
  };
  
  // Function to add a new time slot
  const addTimeSlot = () => {
    const newId = timeSlots.length > 0 ? Math.max(...timeSlots.map(slot => slot.id)) + 1 : 1;
    setTimeSlots([...timeSlots, { id: newId, startTime: '09:00', startPeriod: 'AM', endTime: '17:00', endPeriod: 'PM' }]);
  };
  
  // Function to update time slot start time
  const updateStartTime = (id, time) => {
    setTimeSlots(timeSlots.map(slot => 
      slot.id === id ? { ...slot, startTime: time } : slot
    ));
  };
  
  // Function to update time slot end time
  const updateEndTime = (id, time) => {
    setTimeSlots(timeSlots.map(slot => 
      slot.id === id ? { ...slot, endTime: time } : slot
    ));
  };
  
  // Function to update time slot start period (AM/PM)
  const updateStartPeriod = (id, period) => {
    setTimeSlots(timeSlots.map(slot => 
      slot.id === id ? { ...slot, startPeriod: period } : slot
    ));
  };
  
  // Function to update time slot end period (AM/PM)
  const updateEndPeriod = (id, period) => {
    setTimeSlots(timeSlots.map(slot => 
      slot.id === id ? { ...slot, endPeriod: period } : slot
    ));
  };
  
  // Function to toggle booking availability
  const toggleBookingAvailability = (id, value) => {
    setAvailableBookings(availableBookings.map(booking => 
      booking.id === id ? { ...booking, active: value } : booking
    ));
  };
  
  // Function to toggle service status
  const toggleServiceStatus = (id, value) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, active: value } : service
    ));
  };
  
  // Function to open service edit modal
  const handleEditService = (id) => {
    const serviceToEdit = services.find(service => service.id === id);
    setCurrentService(serviceToEdit);
    setServiceModalVisible(true);
  };
  
  // Function to open service add modal
  const handleAddService = () => {
    setCurrentService(null);
    setServiceModalVisible(true);
  };
  
  // Function to save service
  const handleSaveService = (serviceData) => {
    if (serviceData.id && services.some(s => s.id === serviceData.id)) {
      // Update existing service
      setServices(services.map(service => 
        service.id === serviceData.id ? serviceData : service
      ));
    } else {
      // Add new service
      setServices([...services, serviceData]);
    }
    setServiceModalVisible(false);
  };

  // Function to add new date range
  const handleAddDateRange = () => {
    setCurrentDateRange(null);
    setDateRangeModalVisible(true);
  };
  
  // Function to save date range
  const handleSaveDateRange = (dateRangeData) => {
    setDateRanges([...dateRanges, dateRangeData]);
    setDateRangeModalVisible(false);
  };
  
  // Handlers for save actions
  const handleBufferTimeSave = () => {
    console.log('Buffer time saved:', bufferTime);
  };
  
  const handleTimezoneSave = () => {
    console.log('Timezone settings saved:', timezone, timeSlots);
  };
  
  const handleAvailabilitySave = () => {
    console.log('Availability settings saved:', availableBookings);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Settings</Text>
        <Text style={styles.subtitle}>Manage your consultation slots, services, and availability</Text>
      </View>
      
      {/* Tab bar for switching between settings sections */}
      <AdminTabBar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      {/* Content container with ScrollView for scrolling */}
      <ScrollView style={styles.contentContainer} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'consultation' && (
          <View style={styles.settingsContainer}>
            <BufferTimeSettings 
              bufferTime={bufferTime}
              setBufferTime={setBufferTime}
              onSave={handleBufferTimeSave}
            />
            
            <TimezoneSettings 
              timezone={timezone}
              setTimezone={setTimezone}
              use12HourFormat={use12HourFormat}
              setUse12HourFormat={setUse12HourFormat}
              timeSlots={timeSlots}
              onAddTimeSlot={addTimeSlot}
              onRemoveTimeSlot={removeTimeSlot}
              onUpdateStartTime={updateStartTime}
              onUpdateEndTime={updateEndTime}
              onUpdateStartPeriod={updateStartPeriod}
              onUpdateEndPeriod={updateEndPeriod}
              onSave={handleTimezoneSave}
            />
            
            <AvailabilitySettings 
              availableBookings={availableBookings}
              onToggleAvailability={toggleBookingAvailability}
              onSave={handleAvailabilitySave}
            />
          </View>
        )}
        
        {activeTab === 'services' && (
          <View style={styles.settingsContainer}>
            <ServicesAndPricing 
              services={services}
              onToggleService={toggleServiceStatus}
              onEditService={handleEditService}
              onAddService={handleAddService}
            />
          </View>
        )}
        
        {activeTab === 'dayoff' && (
          <View style={styles.settingsContainer}>
            <DayOffSettings 
              dateRanges={dateRanges}
              onAddDateRange={handleAddDateRange}
            />
          </View>
        )}
      </ScrollView>
      
      {/* Modals */}
      {serviceModalVisible && (
        <ServiceFormModal
          visible={serviceModalVisible}
          onClose={() => setServiceModalVisible(false)}
          onSave={handleSaveService}
          service={currentService}
        />
      )}
      
      {dateRangeModalVisible && (
        <DateRangeFormModal
          visible={dateRangeModalVisible}
          onClose={() => setDateRangeModalVisible(false)}
          onSave={handleSaveDateRange}
          dateRange={currentDateRange}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.m,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  title: {
    fontSize: FONT.size.xl,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    marginBottom: SPACING.xs,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  settingsContainer: {
    padding: SPACING.m,
  },
}); 