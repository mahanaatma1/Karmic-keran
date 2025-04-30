import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT, SHADOW, SIZES } from '../../constants/Theme';

const ServiceRow = ({ service, booking, share, isHighlighted }) => {
  return (
    <View style={[styles.serviceRow, isHighlighted && styles.highlightedRow]}>
      <View style={styles.serviceNameContainer}>
        {isHighlighted && <View style={styles.highlightDot} />}
        <Text 
          style={[
            styles.serviceName, 
            isHighlighted && styles.highlightedText
          ]}
        >
          {service}
        </Text>
      </View>
      <Text style={styles.bookingText}>{booking}</Text>
      <Text style={styles.shareText}>{share}</Text>
    </View>
  );
};

const PopularServiceCard = () => {
  // Mock data
  const services = [
    { name: 'Personal Reading', bookings: 4, share: '80%', isPopular: true },
    { name: 'Career & Business Astrology', bookings: 1, share: '20%' },
    { name: 'Love & Relationship Compatibility', bookings: 0, share: '0%' },
    { name: 'In-Depth Life Reading', bookings: 0, share: '0%' },
  ];
  
  const popularService = services.find(service => service.isPopular);
  
  return (
    <View style={styles.container}>
      {/* Popular Service Header */}
      <View style={styles.popularServiceHeader}>
        <View style={styles.iconContainer}>
          <Text style={styles.starIcon}>⭐</Text>
        </View>
        <View>
          <Text style={styles.mostPopularLabel}>Most Popular Service</Text>
          <Text style={styles.popularServiceName}>{popularService?.name}</Text>
        </View>
      </View>
      
      {/* Services Table */}
      <View style={styles.tableContainer}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>SERVICE</Text>
          <Text style={[styles.headerCell, styles.centerText]}>BOOKINGS</Text>
          <Text style={[styles.headerCell, styles.centerText]}>SHARE</Text>
        </View>
        
        {/* Table Rows */}
        {services.map((service, index) => (
          <ServiceRow
            key={index}
            service={service.name}
            booking={service.bookings}
            share={service.share}
            isHighlighted={service.isPopular}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.l,
    ...SHADOW.small,
    overflow: 'hidden',
  },
  popularServiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.m,
    backgroundColor: COLORS.lightBackground,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  iconContainer: {
    marginRight: SPACING.m,
  },
  starIcon: {
    fontSize: 24,
  },
  mostPopularLabel: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
  },
  popularServiceName: {
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
  },
  tableContainer: {
    padding: SPACING.m,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: SPACING.s,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  headerCell: {
    fontSize: FONT.size.xs,
    fontWeight: FONT.weight.medium,
    color: COLORS.secondaryText,
    flex: 1,
  },
  centerText: {
    textAlign: 'center',
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  highlightedRow: {
    backgroundColor: 'rgba(255, 163, 60, 0.05)',
  },
  serviceNameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFA33C',
    marginRight: SPACING.xs,
  },
  serviceName: {
    fontSize: FONT.size.s,
    color: COLORS.primaryText,
  },
  highlightedText: {
    fontWeight: FONT.weight.medium,
  },
  bookingText: {
    flex: 1,
    fontSize: FONT.size.s,
    color: COLORS.primaryText,
    textAlign: 'center',
  },
  shareText: {
    flex: 1,
    fontSize: FONT.size.s,
    color: COLORS.primaryText,
    textAlign: 'center',
  },
});

export default PopularServiceCard; 