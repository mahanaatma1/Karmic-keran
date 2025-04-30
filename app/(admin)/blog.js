import { View, Text, StyleSheet } from 'react-native';

export default function Blog() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blog Management</Text>
      <Text style={styles.subtitle}>Create and manage your blog posts</Text>
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