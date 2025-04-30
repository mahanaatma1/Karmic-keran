import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const ConsultationDetailScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id, title, subtitle, description, duration, price } = params;

  // For demonstration, we'll use a hardcoded feature list
  const features = [
    'Detailed personality analysis',
    'Future predictions and timing',
    'Relationship compatibility insights',
    'Career path guidance',
    'Life purpose revelation'
  ];

  const handleContinue = () => {
    // Navigate to the next step in the booking flow
    router.push({
      pathname: '/select-date-time',
      params: { id, title, subtitle, duration, price }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Consultation Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../../assets/images/icon.png')} 
            style={styles.consultationImage}
            resizeMode="cover"
          />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <FontAwesome name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Consultation Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          
          <Text style={styles.description}>
            Get a comprehensive analysis of your life path, including
            insights into your personality, relationships, career trajectory,
            and spiritual growth. Our expert astrologers will analyze your
            birth chart to reveal hidden opportunities and guide you
            through life's challenges.
          </Text>

          <Text style={styles.sectionTitle}>What You'll Get</Text>
          <View style={styles.featuresList}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <FontAwesome name="circle" size={8} color="#FF6B00" style={styles.bulletPoint} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          <View style={styles.durationPriceContainer}>
            <View style={styles.durationPrice}>
              <Text style={styles.durationPriceLabel}>Duration</Text>
              <Text style={styles.durationPriceValue}>{duration} minutes</Text>
            </View>
            <View style={styles.durationPrice}>
              <Text style={styles.durationPriceLabel}>Price</Text>
              <Text style={styles.durationPriceValue}>£{price}</Text>
            </View>
          </View>
        </View>

        {/* Booking Summary Card */}
        <View style={styles.bookingSummaryCard}>
          <View style={styles.bookingStepsIndicator}>
            <View style={styles.stepActive}>
              <Text style={styles.stepText}>1</Text>
            </View>
            <View style={styles.stepConnector} />
            <View style={styles.stepInactive}>
              <Text style={styles.stepTextInactive}>2</Text>
            </View>
            <View style={styles.stepConnector} />
            <View style={styles.stepInactive}>
              <Text style={styles.stepTextInactive}>3</Text>
            </View>
          </View>

          <View style={styles.bookingSummaryContent}>
            <View style={styles.consultationBrief}>
              <Image 
                source={require('../../../assets/images/icon.png')} 
                style={styles.consultationThumbnail} 
              />
              <View style={styles.consultationBriefDetails}>
                <Text style={styles.consultationBriefTitle}>{title}</Text>
                <Text style={styles.consultationBriefSubtitle}>{subtitle}</Text>
              </View>
              <Text style={styles.consultationDuration}>{duration} minutes</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.priceBreakdown}>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Consultation Fee</Text>
                <Text style={styles.priceValue}>{price}.00</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Platform Fee</Text>
                <Text style={styles.priceValue}>£0.00</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Taxes</Text>
                <Text style={styles.priceValue}>£0.00</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>£{price}.00</Text>
            </View>

            <TouchableOpacity 
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>

            <Text style={styles.termsText}>
              By proceeding, you agree to our terms and conditions
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flexGrow: 1,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 250,
  },
  consultationImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#FF6B00',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#555555',
    lineHeight: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  featuresList: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bulletPoint: {
    marginTop: 6,
    marginRight: 10,
  },
  featureText: {
    fontSize: 16,
    color: '#555555',
    flex: 1,
  },
  durationPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  durationPrice: {
    alignItems: 'center',
  },
  durationPriceLabel: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  durationPriceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  bookingSummaryCard: {
    marginHorizontal: 15,
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  bookingStepsIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#F9F9F9',
  },
  stepActive: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepInactive: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepConnector: {
    width: 50,
    height: 2,
    backgroundColor: '#EEEEEE',
  },
  stepText: {
    color: 'white',
    fontWeight: 'bold',
  },
  stepTextInactive: {
    color: '#888888',
    fontWeight: 'bold',
  },
  bookingSummaryContent: {
    padding: 15,
  },
  consultationBrief: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  consultationThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  consultationBriefDetails: {
    flex: 1,
  },
  consultationBriefTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  consultationBriefSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  consultationDuration: {
    fontSize: 14,
    color: '#888888',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 15,
  },
  priceBreakdown: {
    marginBottom: 5,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 15,
    color: '#666666',
  },
  priceValue: {
    fontSize: 15,
    color: '#333333',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  continueButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#888888',
  },
});

export default ConsultationDetailScreen; 