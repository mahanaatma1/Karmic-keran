import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { COLORS, FONT, SPACING } from '../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';

const ServiceFormModal = ({
  visible,
  onClose,
  onSave,
  service
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (service) {
      setTitle(service.title);
      setDescription(service.description);
      setPrice(service.price.toString());
    } else {
      resetForm();
    }
  }, [service, visible]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setErrors({});
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Service name is required';
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!price.trim()) {
      newErrors.price = 'Price is required';
      isValid = false;
    } else if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      newErrors.price = 'Price must be a valid positive number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      const serviceData = {
        id: service ? service.id : Date.now(),
        title,
        description,
        price: parseFloat(price),
        active: service ? service.active : true
      };

      onSave(serviceData);
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {service ? 'Edit Service' : 'Add New Service'}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <Ionicons name="close" size={24} color={COLORS.primaryText} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.formContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Service Name</Text>
              <TextInput
                style={[styles.textInput, errors.title && styles.inputError]}
                placeholder="Enter service name"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor={COLORS.secondaryText}
              />
              {errors.title && (
                <Text style={styles.errorText}>{errors.title}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.textArea, errors.description && styles.inputError]}
                placeholder="Enter service description"
                value={description}
                onChangeText={setDescription}
                placeholderTextColor={COLORS.secondaryText}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
              />
              {errors.description && (
                <Text style={styles.errorText}>{errors.description}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Price (£)</Text>
              <TextInput
                style={[styles.textInput, errors.price && styles.inputError]}
                placeholder="0.00"
                value={price}
                onChangeText={setPrice}
                keyboardType="decimal-pad"
                placeholderTextColor={COLORS.secondaryText}
              />
              {errors.price && (
                <Text style={styles.errorText}>{errors.price}</Text>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Save Service</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingBottom: Platform.OS === 'ios' ? 34 : 24, // Extra padding for iPhone X+ bottom area
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  modalTitle: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
  },
  closeButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: SPACING.m,
  },
  inputGroup: {
    marginBottom: SPACING.m,
  },
  inputLabel: {
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.medium,
    color: COLORS.primaryText,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: FONT.size.m,
    color: COLORS.primaryText,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  textArea: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: FONT.size.m,
    color: COLORS.primaryText,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    minHeight: 120,
  },
  inputError: {
    borderColor: '#FF5252',
  },
  errorText: {
    color: '#FF5252',
    fontSize: FONT.size.xs,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.m,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.primaryText,
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.medium,
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
    padding: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.medium,
  },
});

export default ServiceFormModal; 