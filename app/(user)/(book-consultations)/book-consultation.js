import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import components from the proper directory structure
import Header from '../../../components/user/book-consultation/Header';
import ConsultationList from '../../../components/user/book-consultation/ConsultationList';
import { consultationsData } from '../../../components/user/book-consultation/consultationsData';

const BookConsultation = () => {
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Header />
        <ConsultationList consultations={consultationsData} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: 0,
    paddingBottom: 30,
  },
});

export default BookConsultation;
