import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Switch,
  Platform
} from 'react-native';
import { COLORS, FONT, SPACING, SIZES } from '../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';

const ServiceItem = ({ 
  service, 
  onToggle, 
  onEdit 
}) => {
  return (
    <View style={styles.serviceItemContainer}>
      <View style={styles.serviceHeader}>
        <View style={styles.titleContainer}>
          <Text style={styles.serviceTitle}>{service.title}</Text>
          <View style={[styles.statusIndicator, service.active ? styles.statusActive : styles.statusInactive]} />
        </View>
        <Switch
          value={service.active}
          onValueChange={(value) => onToggle(service.id, value)}
          trackColor={{ false: COLORS.border, true: COLORS.primary }}
          thumbColor={Platform.OS === 'ios' ? undefined : COLORS.white}
          ios_backgroundColor={COLORS.border}
          style={styles.toggle}
        />
      </View>
      
      <Text style={styles.serviceDescription}>
        {service.description}
      </Text>
      
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceValue}>£{service.price.toFixed(2)}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => onEdit(service.id)}
        >
          <Ionicons name="pencil" size={16} color={COLORS.white} />
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  serviceItemContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryText,
    marginRight: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusActive: {
    backgroundColor: '#4CAF50', // Green for active
  },
  statusInactive: {
    backgroundColor: '#9E9E9E', // Gray for inactive
  },
  toggle: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  serviceDescription: {
    fontSize: 14,
    color: COLORS.secondaryText,
    lineHeight: 20,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: 'column',
  },
  priceLabel: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  editButtonText: {
    color: COLORS.white,
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 6,
  },
});

export default ServiceItem; 