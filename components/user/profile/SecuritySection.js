import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SecuritySection = ({ 
  onChangePassword,
  connectedAccounts = [
    { provider: 'Google', email: 'tusharkumar182736@gmail.com', isConnected: true }
  ]
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Security & Connected Accounts</Text>
      
      <View style={styles.passwordSection}>
        <Text style={styles.subsectionTitle}>Password</Text>
        <Text style={styles.helperText}>Change your password to keep your account secure</Text>
        
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={onChangePassword}
        >
          <Text style={styles.actionButtonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.connectedAccountsSection}>
        <Text style={styles.subsectionTitle}>Connected Accounts</Text>
        <Text style={styles.helperText}>Manage your connected social accounts for easy login</Text>
        
        {connectedAccounts.map((account, index) => (
          <View key={index} style={styles.accountItem}>
            <View style={styles.accountDetails}>
              <View style={styles.accountLogo}>
                {account.provider === 'Google' && (
                  <Ionicons name="logo-google" size={20} color="#4285F4" />
                )}
              </View>
              <View>
                <Text style={styles.providerName}>
                  {account.provider} 
                  {account.isConnected && (
                    <Text style={styles.connectedText}> • Connected</Text>
                  )}
                </Text>
                <Text style={styles.accountEmail}>Connected to {account.email}</Text>
              </View>
            </View>
            
            <View style={styles.connectionStatus}>
              {!account.isConnected && (
                <TouchableOpacity style={styles.connectButton}>
                  <Text style={styles.connectButtonText}>Connect</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 20,
  },
  passwordSection: {
    marginBottom: 20,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 5,
  },
  helperText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
  },
  actionButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#555555',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 20,
  },
  connectedAccountsSection: {
    
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
  },
  accountDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountLogo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  providerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
  },
  accountEmail: {
    fontSize: 13,
    color: '#666666',
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    marginRight: 5,
  },
  connectedText: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: 'normal',
  },
  connectButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  connectButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#555555',
  },
});

export default SecuritySection; 