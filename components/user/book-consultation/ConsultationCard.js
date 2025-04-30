import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ConsultationCard = ({ 
  id,
  title, 
  subtitle, 
  description, 
  features, 
  duration, 
  price, 
  image 
}) => {
  const router = useRouter();

  const handleBookNow = () => {
    router.push({
      pathname: '/consultation-detail',
      params: { id, title, subtitle, description, duration, price }
    });
  };

  return (
    <View style={styles.card}>
      <Image 
        source={image} 
        style={styles.cardImage} 
        resizeMode="cover" 
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={[styles.cardSubtitle, { color: '#FF6B00' }]}>{subtitle}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
        
        <View style={styles.featuresList}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <FontAwesome name="circle" size={8} color="#FF6B00" style={styles.bulletPoint} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.durationPrice}>
          <Text style={styles.durationText}>Duration: {duration} minutes</Text>
          <Text style={styles.priceText}>Price: £{price}</Text>
        </View>
        
        <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
    marginBottom: 15,
  },
  featuresList: {
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bulletPoint: {
    marginTop: 5,
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#555555',
    flex: 1,
  },
  durationPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  durationText: {
    fontSize: 14,
    color: '#555555',
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  bookButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConsultationCard; 