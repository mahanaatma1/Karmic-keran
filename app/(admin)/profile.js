import { View, Text, StyleSheet, Image } from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg' }}
          style={styles.profileImage}
        />
        <Text style={styles.title}>Admin Profile</Text>
        <Text style={styles.subtitle}>Karmic Kiran Administration</Text>
      </View>
      
      <View style={styles.logoContainer}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/3377405/pexels-photo-3377405.jpeg' }}
          style={styles.logo}
        />
        <Text style={styles.logoText}>Karmic Kiran</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Name:</Text>
        <Text style={styles.infoValue}>Admin User</Text>
        
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoValue}>admin@karmickiran.com</Text>
        
        <Text style={styles.infoLabel}>Role:</Text>
        <Text style={styles.infoValue}>Administrator</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7ED',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
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
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#FFE4CA',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  logoText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FF7D7D',
  },
  infoContainer: {
    padding: 20,
  },
  infoLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#666666',
    marginBottom: 4,
  },
  infoValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#333333',
    marginBottom: 16,
  },
});