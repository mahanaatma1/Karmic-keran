import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const QuestionForm = ({ question, setQuestion, error }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <FontAwesome name="question-circle" size={20} color="#FF6B00" />
        <Text style={styles.title}>Your Question</Text>
      </View>
      
      <TextInput
        style={[styles.textArea, error && styles.textAreaError]}
        placeholder="Type your detailed question here... The more specific you are, the better guidance you'll receive."
        multiline
        numberOfLines={6}
        textAlignVertical="top"
        value={question}
        onChangeText={setQuestion}
      />
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      <View style={styles.tipContainer}>
        <FontAwesome name="lightbulb-o" size={16} color="#FF6B00" />
        <Text style={styles.tipText}>
          For meaningful guidance, provide context and be specific about your situation and concerns.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    height: 150,
  },
  textAreaError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
  tipContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF5EE',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'flex-start',
  },
  tipText: {
    color: '#666666',
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
});

export default QuestionForm; 