import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { COLORS, SPACING, FONT, SIZES, SHADOW } from '../../../constants/Theme';

export default function ConsultationTable({ consultations, onViewKundali, onJoinCall, onMoreDetails }) {
  const [viewType, setViewType] = useState('card'); // 'card' or 'table'

  // Status color mapping
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'completed': return COLORS.success;
      case 'upcoming': return COLORS.primary;
      case 'today': return COLORS.warning;
      case 'cancelled': return COLORS.error;
      default: return COLORS.secondaryText;
    }
  };

  // Render a single consultation card
  const renderCard = ({ item, index }) => {
    const statusColor = getStatusColor(item.status);
    
    return (
      <View style={styles.card}>
        {/* Status indicator */}
        <View style={[styles.statusIndicator, { backgroundColor: statusColor }]} />
        
        {/* Card header with client info */}
        <View style={styles.cardHeader}>
          <View style={styles.clientInfoContainer}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {item.clientName.substring(0, 2).toUpperCase()}
              </Text>
            </View>
            <View>
              <Text style={styles.clientName}>{item.clientName}</Text>
              <Text style={styles.consultationId}>ID: {item.id}</Text>
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: `${statusColor}15` }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>
        
        {/* Card details */}
        <View style={styles.cardDetails}>
          {/* Service Type */}
          <View style={styles.detailRow}>
            <View style={styles.detailIconContainer}>
              <Ionicons name="star-outline" size={20} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.detailLabel}>Service</Text>
              <Text style={styles.detailValue}>{item.serviceType}</Text>
            </View>
          </View>
          
          {/* Date & Time */}
          <View style={styles.detailRow}>
            <View style={styles.detailIconContainer}>
              <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.detailLabel}>Date & Time</Text>
              <Text style={styles.detailValue}>{item.dateTime}</Text>
            </View>
          </View>
          
          {/* Payment */}
          <View style={styles.detailRow}>
            <View style={styles.detailIconContainer}>
              <MaterialIcons name="payment" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.paymentDetail}>
              <Text style={styles.detailLabel}>Amount</Text>
              <View style={styles.paymentContainer}>
                <Text style={styles.amountText}>{item.amount}</Text>
                <View style={[
                  styles.paymentBadge, 
                  { backgroundColor: item.paymentStatus.toLowerCase() === 'paid' ? `${COLORS.success}15` : `${COLORS.warning}15` }
                ]}>
                  <Text style={[
                    styles.paymentBadgeText, 
                    { color: item.paymentStatus.toLowerCase() === 'paid' ? COLORS.success : COLORS.warning }
                  ]}>
                    {item.paymentStatus}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        
        {/* Action buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.kundaliButton]}
            onPress={() => onViewKundali && onViewKundali(item)}
          >
            <MaterialIcons name="description" size={18} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>View Kundali</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.joinCallButton]}
            onPress={() => onJoinCall && onJoinCall(item)}
          >
            <Ionicons name="videocam-outline" size={18} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Join Call</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.detailsButton]}
            onPress={() => onMoreDetails && onMoreDetails(item)}
          >
            <Feather name="more-horizontal" size={18} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Table columns definition
  const columns = [
    { id: 'sno', label: 'S.No', width: 40, flex: 0.5 },
    { id: 'id', label: 'ID', width: 80, flex: 1 },
    { id: 'client', label: 'Client', width: 120, flex: 2 },
    { id: 'service', label: 'Service', width: 120, flex: 2 },
    { id: 'datetime', label: 'Date & Time', width: 150, flex: 2 },
    { id: 'status', label: 'Status', width: 80, flex: 1 },
    { id: 'amount', label: 'Amount', width: 80, flex: 1 },
    { id: 'actions', label: 'Actions', width: 120, flex: 2 },
  ];
  
  // Render table header
  const renderTableHeader = () => (
    <View style={styles.tableRow}>
      {columns.map((column, index) => (
        <View 
          key={column.id} 
          style={[
            styles.cell, 
            styles.headerCell, 
            { width: column.width, flex: column.flex }
          ]}
        >
          <Text style={styles.headerCellText}>{column.label}</Text>
        </View>
      ))}
    </View>
  );
  
  // Render a single table row
  const renderTableRow = ({ item, index }) => {
    const statusColor = getStatusColor(item.status);
    
    return (
      <View style={styles.tableRow}>
        {/* S.No */}
        <View style={[styles.cell, { width: columns[0].width, flex: columns[0].flex }]}>
          <Text style={styles.cellText}>{index + 1}</Text>
        </View>
        
        {/* ID */}
        <View style={[styles.cell, { width: columns[1].width, flex: columns[1].flex }]}>
          <Text style={styles.cellText}>{item.id}</Text>
        </View>
        
        {/* Client */}
        <View style={[styles.cell, { width: columns[2].width, flex: columns[2].flex }]}>
          <Text style={styles.cellText}>{item.clientName}</Text>
        </View>
        
        {/* Service */}
        <View style={[styles.cell, { width: columns[3].width, flex: columns[3].flex }]}>
          <Text style={styles.cellText}>{item.serviceType}</Text>
        </View>
        
        {/* Date & Time */}
        <View style={[styles.cell, { width: columns[4].width, flex: columns[4].flex }]}>
          <Text style={styles.cellText}>{item.dateTime}</Text>
        </View>
        
        {/* Status */}
        <View style={[styles.cell, { width: columns[5].width, flex: columns[5].flex }]}>
          <View style={[styles.tableStatusBadge, { backgroundColor: `${statusColor}15` }]}>
            <Text style={[styles.tableStatusText, { color: statusColor }]}>{item.status}</Text>
          </View>
        </View>
        
        {/* Amount */}
        <View style={[styles.cell, { width: columns[6].width, flex: columns[6].flex }]}>
          <Text style={styles.cellText}>{item.amount}</Text>
        </View>
        
        {/* Actions */}
        <View style={[styles.cell, { width: columns[7].width, flex: columns[7].flex }]}>
          <View style={styles.tableActions}>
            <TouchableOpacity 
              style={styles.tableActionButton}
              onPress={() => onViewKundali && onViewKundali(item)}
            >
              <MaterialIcons name="description" size={16} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.tableActionButton}
              onPress={() => onJoinCall && onJoinCall(item)}
            >
              <Ionicons name="videocam-outline" size={16} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.tableActionButton}
              onPress={() => onMoreDetails && onMoreDetails(item)}
            >
              <Feather name="more-horizontal" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* View toggle buttons */}
      <View style={styles.viewToggle}>
        <TouchableOpacity 
          style={[styles.toggleButton, viewType === 'card' && styles.activeToggle]}
          onPress={() => setViewType('card')}
        >
          <Ionicons 
            name="grid-outline" 
            size={20} 
            color={viewType === 'card' ? COLORS.primary : COLORS.secondaryText} 
          />
          <Text style={[
            styles.toggleText, 
            viewType === 'card' && { color: COLORS.primary }
          ]}>
            Card View
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.toggleButton, viewType === 'table' && styles.activeToggle]}
          onPress={() => setViewType('table')}
        >
          <Ionicons 
            name="list-outline" 
            size={20} 
            color={viewType === 'table' ? COLORS.primary : COLORS.secondaryText} 
          />
          <Text style={[
            styles.toggleText, 
            viewType === 'table' && { color: COLORS.primary }
          ]}>
            Table View
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Card view */}
      {viewType === 'card' && (
        <FlatList
          data={consultations}
          renderItem={renderCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.cardListContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
      
      {/* Table view */}
      {viewType === 'table' && (
        <View style={styles.tableContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            <View style={styles.tableWrapper}>
              {renderTableHeader()}
              <FlatList
                data={consultations}
                renderItem={renderTableRow}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.tableListContainer}
                showsVerticalScrollIndicator={true}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: SPACING.l,
    marginVertical: SPACING.m,
  },
  
  // View toggle
  viewToggle: {
    flexDirection: 'row',
    marginBottom: SPACING.m,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    ...SHADOW.small,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.s,
    borderRadius: SIZES.radiusSmall,
  },
  activeToggle: {
    backgroundColor: `${COLORS.primary}15`,
  },
  toggleText: {
    marginLeft: SPACING.xs,
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.medium,
    color: COLORS.secondaryText,
  },
  
  // Card styles
  cardListContainer: {
    paddingBottom: SPACING.l,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.m,
    overflow: 'hidden',
    ...SHADOW.small,
    position: 'relative',
  },
  statusIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  clientInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.s,
  },
  avatarText: {
    color: COLORS.primary,
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.bold,
  },
  clientName: {
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
  },
  consultationId: {
    fontSize: FONT.size.xs,
    color: COLORS.secondaryText,
  },
  statusBadge: {
    paddingHorizontal: SPACING.s,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: FONT.size.xs,
    fontWeight: FONT.weight.medium,
  },
  
  // Card details
  cardDetails: {
    padding: SPACING.m,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  detailIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.lightBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.s,
  },
  detailLabel: {
    fontSize: FONT.size.xs,
    color: COLORS.secondaryText,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: FONT.size.s,
    color: COLORS.primaryText,
    fontWeight: FONT.weight.medium,
  },
  paymentDetail: {
    flex: 1,
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    fontSize: FONT.size.s,
    color: COLORS.primaryText,
    fontWeight: FONT.weight.bold,
    marginRight: SPACING.s,
  },
  paymentBadge: {
    paddingHorizontal: SPACING.s,
    paddingVertical: 2,
    borderRadius: 12,
  },
  paymentBadgeText: {
    fontSize: FONT.size.xs,
    fontWeight: FONT.weight.medium,
  },
  
  // Action buttons
  actionButtons: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.s,
  },
  kundaliButton: {
    backgroundColor: '#FFA500',
  },
  joinCallButton: {
    backgroundColor: COLORS.primary,
  },
  detailsButton: {
    backgroundColor: COLORS.secondaryText,
  },
  actionButtonText: {
    color: COLORS.white,
    marginLeft: SPACING.xs,
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.medium,
  },
  
  // Table styles
  tableContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    ...SHADOW.small,
    flex: 1,
  },
  tableWrapper: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tableListContainer: {
    paddingBottom: SPACING.m,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
  },
  cell: {
    padding: SPACING.s,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerCell: {
    backgroundColor: COLORS.lightBackground,
  },
  headerCellText: {
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.bold,
    color: COLORS.secondaryText,
  },
  cellText: {
    fontSize: FONT.size.s,
    color: COLORS.primaryText,
  },
  tableStatusBadge: {
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  tableStatusText: {
    fontSize: FONT.size.xs,
    fontWeight: FONT.weight.medium,
  },
  tableActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableActionButton: {
    padding: SPACING.xs,
    marginRight: SPACING.xs,
    backgroundColor: COLORS.lightBackground,
    borderRadius: SIZES.radiusSmall,
  },
}); 