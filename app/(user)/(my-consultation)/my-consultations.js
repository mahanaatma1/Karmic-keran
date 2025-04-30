import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Modal, Alert } from 'react-native';
import { COLORS, SPACING } from '../../../constants/Theme';
import {
  ConsultationHeader,
  FilterTabs,
  SearchFilter,
  ConsultationDetail,
  ConsultationDetailList,
  consultationData
} from '../../../components/user/my-consultations';

export default function MyConsultationsScreen() {
  const [consultations, setConsultations] = useState([]);
  const [filteredConsultations, setFilteredConsultations] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Load initial data
  useEffect(() => {
    // In a real app, this would fetch from an API
    setConsultations(consultationData);
  }, []);

  // Filter consultations based on active tab and search query
  useEffect(() => {
    let filtered = [...consultations];
    
    // Apply tab filter
    if (activeTab === 1) { // Today
      filtered = filtered.filter(item => item.status.toLowerCase() === 'today');
    } else if (activeTab === 2) { // Completed
      filtered = filtered.filter(item => item.status.toLowerCase() === 'completed');
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.id.toLowerCase().includes(query) ||
        item.client.toLowerCase().includes(query) ||
        item.service.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query)
      );
    }
    
    setFilteredConsultations(filtered);
  }, [consultations, activeTab, searchQuery]);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const handleDatePress = () => {
    // In a real app, this would show a date picker
    console.log('Show date picker');
  };

  const handleViewKundali = (consultation) => {
    Alert.alert("View Kundali", `Viewing kundali for ${consultation.client}`);
  };

  const handleJoinCall = (consultation) => {
    Alert.alert("Join Call", `Joining call for ${consultation.client}'s ${consultation.service} session`);
  };

  const handleViewDetails = (consultation) => {
    setSelectedConsultation(consultation);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedConsultation(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ConsultationHeader 
        title="Consultations" 
        subtitle="Manage and track all your consultation bookings in one place"
      />
      
      <FilterTabs 
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onDatePress={handleDatePress}
      />
      
      <ConsultationDetailList
        consultations={filteredConsultations}
        onViewKundali={handleViewKundali}
        onJoinCall={handleJoinCall}
        onViewDetails={handleViewDetails}
      />
      
      {/* Consultation Detail Modal */}
      <Modal
        visible={showDetailModal}
        animationType="slide"
        transparent={false}
      >
        {selectedConsultation && (
          <ConsultationDetail
            consultation={selectedConsultation}
            onClose={closeDetailModal}
          />
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
  },
}); 