import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity
} from 'react-native';
import { COLORS, FONT, SPACING, SIZES } from '../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import ServiceItem from './ServiceItem';

const ServicesAndPricing = ({ 
  services,
  onToggleService,
  onEditService, 
  onAddService
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Service Listing</Text>
          <Text style={styles.subtitle}>Manage your services and their details</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={onAddService}
        >
          <Ionicons name="add" size={20} color={COLORS.white} />
          <Text style={styles.addButtonText}>Add Service</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.sectionTitle}>Your Services</Text>
      
      <View style={styles.servicesContainer}>
        {services.length > 0 ? (
          services.map(service => (
            <ServiceItem 
              key={service.id}
              service={service}
              onToggle={onToggleService}
              onEdit={onEditService}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="document-outline" size={48} color={COLORS.secondaryText} />
            <Text style={styles.emptyStateText}>No services added yet</Text>
            <Text style={styles.emptyStateSubtext}>Create your first service to start accepting bookings</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: SPACING.m,
    borderRadius: 12,
    marginBottom: SPACING.m,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.m,
  },
  title: {
    fontSize: FONT.size.xl,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },
  sectionTitle: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    marginBottom: SPACING.s,
    marginTop: SPACING.xs,
  },
  servicesContainer: {
    width: '100%',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderStyle: 'dashed',
  },
  emptyStateText: {
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.medium,
    color: COLORS.primaryText,
    marginTop: SPACING.m,
    marginBottom: SPACING.xs,
  },
  emptyStateSubtext: {
    fontSize: FONT.size.s,
    color: COLORS.secondaryText,
    textAlign: 'center',
  }
});

export default ServicesAndPricing; 