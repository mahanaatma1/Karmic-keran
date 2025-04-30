import React from 'react';
import { View, StyleSheet } from 'react-native';
import ConsultationCard from './ConsultationCard';

const ConsultationList = ({ consultations }) => {
  return (
    <View style={styles.container}>
      {consultations.map(consultation => (
        <ConsultationCard
          key={consultation.id}
          title={consultation.title}
          subtitle={consultation.subtitle}
          description={consultation.description}
          features={consultation.features}
          duration={consultation.duration}
          price={consultation.price}
          image={consultation.image}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: 15,
  },
});

export default ConsultationList; 