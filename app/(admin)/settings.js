import { View, Text, StyleSheet } from 'react-native';

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Settings</Text>
      <Text style={styles.subtitle}>Manage your account and application settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF7ED',
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#FF7D7D',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666666',
  },
}); 