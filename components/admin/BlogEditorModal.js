import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT, SHADOW, SIZES } from '../../constants/Theme';

const BlogEditorModal = ({ 
  visible, 
  onClose, 
  onSave, 
  initialData = null 
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [readTime, setReadTime] = useState('');
  
  // Initialize form with data if editing an existing post
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setContent(initialData.content || '');
      setCategory(initialData.category || '');
      setReadTime(initialData.readTime?.replace(' min', '') || '');
    } else {
      // Reset form when creating a new post
      setTitle('');
      setContent('');
      setCategory('');
      setReadTime('');
    }
  }, [initialData, visible]);
  
  const handleSubmit = () => {
    // Validate form
    if (!title.trim() || !content.trim() || !category.trim() || !readTime.trim()) {
      // In a real app, you would show validation errors
      alert('Please fill in all required fields');
      return;
    }
    
    // Create blog post object
    const blogPost = {
      id: initialData?.id || Date.now(), // Use existing ID or create new one
      title,
      content,
      category,
      readTime: `${readTime} min`,
      date: initialData?.date || new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      author: initialData?.author || 'KARMIC', // Default author
      isActive: initialData?.isActive || true,
      image: initialData?.image || null
    };
    
    onSave(blogPost);
    onClose();
  };
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
          >
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    {initialData ? 'Edit Blog Post' : 'Create New Blog Post'}
                  </Text>
                  <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color={COLORS.primaryText} />
                  </TouchableOpacity>
                </View>
                
                <ScrollView style={styles.formContainer}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Title</Text>
                    <TextInput
                      style={styles.input}
                      value={title}
                      onChangeText={setTitle}
                      placeholder="Enter blog title"
                      placeholderTextColor={COLORS.secondaryText}
                    />
                  </View>
                  
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Category</Text>
                    <TextInput
                      style={styles.input}
                      value={category}
                      onChangeText={setCategory}
                      placeholder="E.g., Zodiac Signs, Astrology"
                      placeholderTextColor={COLORS.secondaryText}
                    />
                  </View>
                  
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Read Time (minutes)</Text>
                    <TextInput
                      style={styles.input}
                      value={readTime}
                      onChangeText={setReadTime}
                      placeholder="E.g., 5"
                      keyboardType="numeric"
                      placeholderTextColor={COLORS.secondaryText}
                    />
                  </View>
                  
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Content</Text>
                    <TextInput
                      style={[styles.input, styles.contentInput]}
                      value={content}
                      onChangeText={setContent}
                      placeholder="Write your blog content here..."
                      placeholderTextColor={COLORS.secondaryText}
                      multiline
                      textAlignVertical="top"
                    />
                  </View>
                </ScrollView>
                
                <View style={styles.modalFooter}>
                  <TouchableOpacity 
                    style={[styles.button, styles.cancelButton]} 
                    onPress={onClose}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.button, styles.saveButton]} 
                    onPress={handleSubmit}
                  >
                    <Text style={[styles.buttonText, styles.saveButtonText]}>
                      {initialData ? 'Update' : 'Publish'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    ...SHADOW.medium,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  modalTitle: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
  },
  closeButton: {
    padding: SPACING.xs,
  },
  formContainer: {
    maxHeight: '100%',
    padding: SPACING.m,
  },
  inputGroup: {
    marginBottom: SPACING.m,
  },
  inputLabel: {
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.medium,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radiusSmall,
    padding: SPACING.m,
    fontSize: FONT.size.m,
    color: COLORS.primaryText,
  },
  contentInput: {
    minHeight: 150,
    maxHeight: 300,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: SPACING.m,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  button: {
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.l,
    borderRadius: SIZES.radiusSmall,
    marginLeft: SPACING.s,
  },
  cancelButton: {
    backgroundColor: COLORS.lightBackground,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.medium,
    color: COLORS.secondaryText,
  },
  saveButtonText: {
    color: COLORS.white,
  },
});

export default BlogEditorModal; 