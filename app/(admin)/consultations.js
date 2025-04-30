import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { COLORS, SPACING } from '../../constants/Theme';

// Import custom components
import ConsultationHeader from '../../components/admin/consultations/ConsultationHeader';
import TabSelector from '../../components/admin/consultations/TabSelector';
import SearchBar from '../../components/admin/consultations/SearchBar';
import ConsultationTable from '../../components/admin/consultations/ConsultationTable';

const ConsultationsScreen = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  
  // Mock data for consultations
  const consultations = [
    {
      id: '#KKRC8PW',
      clientName: 'Tushar Kumar',
      serviceType: 'Personal Reading',
      dateTime: 'Thu 24 April, 2025 at 10:40 pm',
      status: 'Completed',
      amount: '£39.00',
      paymentStatus: 'Paid',
      createdAt: 'Apr 24, 2025'
    },
    {
      id: '#KK6N782',
      clientName: 'Ram',
      serviceType: 'Personal Reading',
      dateTime: 'Thu 24 April, 2025 at 8:30 pm',
      status: 'Completed',
      amount: '£39.00',
      paymentStatus: 'Paid',
      createdAt: 'Apr 24, 2025'
    },
    {
      id: '#KKHJDQK',
      clientName: 'Tushar Kumar',
      serviceType: 'Personal Reading',
      dateTime: 'Mon 28 April, 2025 at 3:45 pm',
      status: 'Upcoming',
      amount: '£39.00',
      paymentStatus: 'Paid',
      createdAt: 'Apr 24, 2025'
    },
    {
      id: '#KKORABW',
      clientName: 'Tushar Kumar',
      serviceType: 'Career & Business Astrology',
      dateTime: 'Thu 24 April, 2025 at 11:15 pm',
      status: 'Completed',
      amount: '£65.00',
      paymentStatus: 'Paid',
      createdAt: 'Apr 24, 2025'
    },
    {
      id: '#KKDYN22',
      clientName: 'Tushar Kumar',
      serviceType: 'Personal Reading',
      dateTime: 'Fri 25 April, 2025 at 2:30 pm',
      status: 'Today',
      amount: '£39.00',
      paymentStatus: 'Paid',
      createdAt: 'Apr 24, 2025'
    }
  ];
  
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };
  
  const handleSearch = (text) => {
    setSearchQuery(text);
  };
  
  const handleDateSelect = () => {
    // In a real app, this would show a date picker and update the selectedDate
    const today = new Date();
    const formattedDate = `${today.getDate()} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][today.getMonth()]} ${today.getFullYear()}`;
    setSelectedDate(formattedDate);
  };

  // Handle action button clicks
  const handleViewKundali = (consultation) => {
    Alert.alert("View Kundali", `Opening Kundali for ${consultation.clientName}`);
  };

  const handleJoinCall = (consultation) => {
    Alert.alert("Join Call", `Joining call with ${consultation.clientName}`);
  };

  const handleMoreDetails = (consultation) => {
    Alert.alert("More Details", `Showing details for consultation ${consultation.id}`);
  };

  // Filter consultations based on active tab
  const getFilteredConsultations = () => {
    if (activeTab === 'all') return consultations;
    if (activeTab === 'today') return consultations.filter(c => c.status === 'Today');
    if (activeTab === 'completed') return consultations.filter(c => c.status === 'Completed');
    return consultations;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header section */}
        <ConsultationHeader />
        
        {/* Tab selector */}
        <TabSelector 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />
        
        {/* Search and date filter */}
        <SearchBar 
          value={searchQuery}
          onChangeText={handleSearch}
          onDateSelect={handleDateSelect}
          selectedDate={selectedDate}
        />
        
        {/* Consultation table with action handlers */}
        <ConsultationTable 
          consultations={getFilteredConsultations()}
          onViewKundali={handleViewKundali}
          onJoinCall={handleJoinCall}
          onMoreDetails={handleMoreDetails}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingVertical: SPACING.m,
    paddingHorizontal: 0,
  },
});

export default ConsultationsScreen;