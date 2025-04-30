import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  const router = useRouter();
  
  const handleLogout = () => {
    router.replace('/auth-screen');
  };

  const navigateTo = (route) => {
    router.push(`/(user)/(profile)/${route}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>john.doe@example.com</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="person-outline" size={24} color="#FF7D7D" />
          <Text style={styles.menuItemText}>Account Information</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" style={{marginLeft: 'auto'}} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigateTo('settings')}
        >
          <Ionicons name="settings-outline" size={24} color="#FF7D7D" />
          <Text style={styles.menuItemText}>Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" style={{marginLeft: 'auto'}} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigateTo('queries')}
        >
          <Ionicons name="help-circle-outline" size={24} color="#FF7D7D" />
          <Text style={styles.menuItemText}>My Queries</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" style={{marginLeft: 'auto'}} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/(user)/my-consultations')}
        >
          <Ionicons name="chatbubble-outline" size={24} color="#FF7D7D" />
          <Text style={styles.menuItemText}>My Consultations</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" style={{marginLeft: 'auto'}} />
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#FF7D7D" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#FFF7ED',
    borderBottomWidth: 1,
    borderBottomColor: '#FFE4CA',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#FFE4CA',
  },
  profileName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#333',
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  divider: {
    height: 8,
    backgroundColor: '#F5F5F5',
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FF7D7D',
    marginLeft: 15,
  },
}); 