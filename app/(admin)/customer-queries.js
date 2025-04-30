import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, FONT } from '../../constants/Theme';

// Import custom components
import CustomerQueryCard from '../../components/admin/CustomerQueryCard';
import CustomerQueryTable from '../../components/admin/CustomerQueryTable';
import QuerySearchFilter from '../../components/admin/QuerySearchFilter';
import Pagination from '../../components/admin/Pagination';

export default function CustomerQueriesScreen() {
  const [viewType, setViewType] = useState('card'); // 'card' or 'table'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(20);
  
  // Mock data for customer queries
  const customerQueries = [
    {
      id: 1,
      name: 'Tushar Kumar',
      email: 'tusharkumar28380@gmail.com',
      dateOfBirth: 'January 4, 2025',
      timeOfBirth: '09:00 AM',
      placeOfBirth: 'Delhi, India',
      gender: 'Male',
      category: 'Health & Wellness',
      question: 'dragbnfmbvnd vs x/vxgevv xlvhghgbqbd',
      answer: '',
      rating: '---'
    },
    {
      id: 2,
      name: 'Tushar Kumar',
      email: 'tusharkumar182736@gmail.com',
      dateOfBirth: 'Invalid Date',
      timeOfBirth: '09:00 AM',
      placeOfBirth: 'Delhi, India',
      gender: 'Male',
      category: 'Health & Wellness',
      question: 'e/nr/rgbfnvhgnvetvgekifsf ebwvskvege',
      answer: '',
      rating: '---'
    },
    {
      id: 3,
      name: 'Venkat',
      email: 'venkatarannireddyvenky@gmail.com',
      dateOfBirth: 'April 10, 2025',
      timeOfBirth: '09:00 AM',
      placeOfBirth: 'Delhi, India',
      gender: 'Other',
      category: 'Travel & Relocation',
      question: 'joxjoipwjcpwcooeuccwouogcwecxcwgcoeii',
      answer: '',
      rating: '---'
    },
    {
      id: 4,
      name: 'Venkat',
      email: 'venkatarannireddyvenky@gmail.com',
      dateOfBirth: 'April 11, 2025',
      timeOfBirth: '09:00 AM',
      placeOfBirth: 'Delhi, India',
      gender: 'Other',
      category: 'Career & Business',
      question: 'hfvqohfskkgq rc nwo8 oxnvoucogweojucpowucgecwcsge',
      answer: '',
      rating: '---'
    },
    {
      id: 5,
      name: 'Tushar Kumar',
      email: 'xyzuvw172635@gmail.com',
      dateOfBirth: 'August 4, 2025',
      timeOfBirth: '09:00 AM',
      placeOfBirth: 'Lakhisarai, Bihar, India',
      gender: 'Male',
      category: 'Health & Wellness',
      question: 'dn gkdzbrvd vis cvnf tsx !zbf',
      answer: '',
      rating: '---'
    },
    {
      id: 6,
      name: 'Ram',
      email: 'venkatarannireddyvenky@gmail.com',
      dateOfBirth: 'April 10, 2025',
      timeOfBirth: '02:00 AM',
      placeOfBirth: 'Gudatur, Prakasam, Andhra Pradesh, 523357, India',
      gender: 'Male',
      category: 'Career & Business',
      question: 'Hello world welcome to astro',
      answer: '',
      rating: '---'
    }
  ];

  // Handle date selection
  const handleDateSelect = () => {
    // In a real app, this would show a date picker and update the selectedDate
    const today = new Date();
    const formattedDate = `${today.getDate()} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][today.getMonth()]} ${today.getFullYear()}`;
    setSelectedDate(formattedDate);
  };

  // Handle view kundali button
  const handleViewKundali = (query) => {
    console.log('View Kundali for', query.name);
  };

  // Handle write answer button
  const handleWriteAnswer = (query) => {
    console.log('Write answer for', query.name);
  };

  // Handle search input change
  const handleSearchChange = (text) => {
    setSearchQuery(text);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle view type change
  const handleViewTypeChange = (type) => {
    setViewType(type);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Customer Queries</Text>
        <Text style={styles.subtitle}>
          View and manage customer astrological queries. Track and respond to questions from
          users, monitor query status, and provide expert astrological guidance.
        </Text>
      </View>

      {/* Search and filter component */}
      <QuerySearchFilter
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        viewType={viewType}
        onViewTypeChange={handleViewTypeChange}
      />

      {/* Card or Table View */}
      {viewType === 'card' ? (
        <View style={styles.cardsContainer}>
          {customerQueries.map((query) => (
            <CustomerQueryCard
              key={query.id}
              query={query}
              onWriteAnswer={handleWriteAnswer}
              onViewKundali={handleViewKundali}
            />
          ))}
        </View>
      ) : (
        <CustomerQueryTable
          queries={customerQueries}
          onWriteAnswer={handleWriteAnswer}
          onViewKundali={handleViewKundali}
        />
      )}

      {/* Pagination component */}
      <Pagination
        currentPage={currentPage}
        totalPages={1}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={() => {}}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.l,
  },
  title: {
    fontSize: FONT.size.xl,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    textAlign: 'center',
    marginBottom: SPACING.s,
  },
  subtitle: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    textAlign: 'center',
    marginBottom: SPACING.l,
  },
  cardsContainer: {
    paddingHorizontal: SPACING.l,
  },
}); 