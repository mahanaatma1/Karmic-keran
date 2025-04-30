import { View, Text, StyleSheet } from 'react-native';

export default function Queries() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Queries</Text>
      <Text style={styles.subtitle}>You have no queries yet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF7ED',
    justifyContent: 'center',
    alignItems: 'center',
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