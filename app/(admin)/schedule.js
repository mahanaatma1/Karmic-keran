import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { COLORS, SPACING, FONT } from '../../constants/Theme';

// Import the modular components
import WelcomeSection from '../../components/admin/schedule/WelcomeSection';
import ConsultationCard from '../../components/admin/schedule/ConsultationCard';
import OverviewMetrics from '../../components/admin/schedule/OverviewMetrics';
import DailySchedule from '../../components/admin/schedule/DailySchedule';

export default function ScheduleScreen() {
  // Sample data for the next consultation
  const nextConsultation = {
    clientName: "Tushar Kumar",
    clientInitials: "TU",
    date: "Fri 25 April, 2025",
    time: "2:30 pm - 3:30 pm",
    duration: "60m",
    serviceType: "Personal Reading",
    paymentStatus: "Paid",
    amount: "£39",
    meetingLink: "https://meet.google.com/vkc-tuiy-uep",
    timeLeft: {
      days: "03",
      hours: "11",
      minutes: "12"
    }
  };

  // Sample data for overview metrics
  const metrics = {
    booked: 3,
    completed: 1,
    upcoming: 2
  };

  const handleJoinVideoCall = () => {
    Alert.alert("Joining Video Call", "Opening video call link...");
    // In a real app, you would open the video call link here
  };

  const handleViewCharts = () => {
    Alert.alert("View Charts", "Opening Jatak's Kundali Charts...");
    // In a real app, you would navigate to the charts screen
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Welcome section with hands icon */}
      <View style={styles.welcomeWrapper}>
        <WelcomeSection 
          greeting="Good Morning,"
          name="Karmic Keran"
        />
      </View>

      {/* Next Consultation Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Next Consultation</Text>
          <Text style={styles.smallText}>Coming up next</Text>
        </View>

        {/* Updated Consultation Card with integrated countdown */}
        <ConsultationCard 
          consultation={nextConsultation}
          onJoinCall={handleJoinVideoCall}
          onViewCharts={handleViewCharts}
          showCountdown={true}
        />
      </View>

      {/* Today's Overview Section */}
      <View style={styles.sectionContainer}>
        <OverviewMetrics metrics={metrics} />
      </View>

      {/* Today's Schedule Section */}
      <View style={styles.sectionContainer}>
        <DailySchedule />
      </View>

      {/* Bottom spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  welcomeWrapper: {
    marginHorizontal: SPACING.m,
    marginTop: SPACING.m,
  },
  sectionContainer: {
    marginHorizontal: SPACING.m,
    marginBottom: SPACING.xl,
    marginTop: SPACING.m,
  },
  sectionHeader: {
    marginBottom: SPACING.s,
  },
  sectionTitle: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
  },
  smallText: {
    fontSize: FONT.size.xs,
    color: COLORS.secondaryText,
  },
  bottomSpacing: {
    height: 40,
  },
}); 