import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const NavigationOptions = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.navOption}
        onPress={() => handleNavigation('/my-consultations')}
      >
        <Text style={styles.navOptionText}>My Consultations</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navOption}
        onPress={() => handleNavigation('/self-discovery')}
      >
        <Text style={styles.navOptionText}>Self Discovery</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navOption}
        onPress={() => handleNavigation('/ask-question')}
      >
        <Text style={styles.navOptionText}>Ask a Question</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  navOption: {
    paddingVertical: 10,
  },
  navOptionText: {
    color: '#FF6B00',
    fontWeight: '500',
  },
});

export default NavigationOptions; 