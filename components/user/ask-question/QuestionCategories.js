import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const categories = [
  {
    id: 'career',
    title: 'Career & Business',
    icon: <FontAwesome5 name="briefcase" size={24} color="#FF6B00" />,
  },
  {
    id: 'love',
    title: 'Love & Relationships',
    icon: <FontAwesome name="heart" size={24} color="#FF6B00" />,
  },
  {
    id: 'health',
    title: 'Health & Wellness',
    icon: <FontAwesome5 name="heartbeat" size={24} color="#FF6B00" />,
  },
  {
    id: 'money',
    title: 'Money & Finance',
    icon: <FontAwesome5 name="money-bill-wave" size={24} color="#FF6B00" />,
  },
  {
    id: 'family',
    title: 'Family & Children',
    icon: <FontAwesome5 name="child" size={24} color="#FF6B00" />,
  },
  {
    id: 'education',
    title: 'Education & Learning',
    icon: <FontAwesome5 name="graduation-cap" size={24} color="#FF6B00" />,
  },
  {
    id: 'spiritual',
    title: 'Spiritual Growth',
    icon: <FontAwesome5 name="om" size={24} color="#FF6B00" />,
  },
  {
    id: 'travel',
    title: 'Travel & Relocation',
    icon: <FontAwesome5 name="plane" size={24} color="#FF6B00" />,
  },
  {
    id: 'general',
    title: 'General Guidance',
    icon: <MaterialCommunityIcons name="meditation" size={24} color="#FF6B00" />,
  },
];

const QuestionCategories = ({ selectedCategory, onSelectCategory }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Question Category</Text>
      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategory,
            ]}
            onPress={() => onSelectCategory(category.id)}
          >
            <View style={styles.categoryContent}>
              {category.icon}
              <Text style={styles.categoryText}>{category.title}</Text>
            </View>
            {selectedCategory === category.id && (
              <View style={styles.checkMark}>
                <Ionicons name="checkmark-circle" size={18} color="#FF6B00" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333333',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  selectedCategory: {
    borderColor: '#FF6B00',
    backgroundColor: '#FFF5EE',
  },
  categoryContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  categoryText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  checkMark: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default QuestionCategories; 