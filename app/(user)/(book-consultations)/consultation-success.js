import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ConsultationSuccessScreen = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/(user)');
  };

  const handleViewAppointments = () => {
    router.push('/(user)/(my-consultation)/my-consultations');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.content}>
        <View style={styles.successIconContainer}>
          <Ionicons name="checkmark-circle" size={100} color="#4CAF50" />
        </View>
        
        <Text style={styles.title}>Booking Successful!</Text>
        
        <Text style={styles.message}>
          Your consultation has been successfully booked. You will receive a confirmation email shortly.
        </Text>
        
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>What's Next?</Text>
          
          <View style={styles.detailItem}>
            <Ionicons name="mail-outline" size={24} color="#FF6B00" />
            <Text style={styles.detailText}>Check your email for booking confirmation</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={24} color="#FF6B00" />
            <Text style={styles.detailText}>Add appointment to your calendar</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={24} color="#FF6B00" />
            <Text style={styles.detailText}>Be online 5 minutes before scheduled time</Text>
          </View>
        </View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
            <Ionicons name="home-outline" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.appointmentsButton} onPress={handleViewAppointments}>
            <Ionicons name="calendar-outline" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>My Appointments</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailText: {
    fontSize: 16,
    color: '#555555',
    marginLeft: 10,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  homeButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
  },
  appointmentsButton: {
    backgroundColor: '#666666',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default ConsultationSuccessScreen; 