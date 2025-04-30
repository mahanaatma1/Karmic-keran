import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput,
  TouchableOpacity 
} from 'react-native';
import { COLORS, FONT, SPACING, SIZES } from '../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';

const BufferTimeSettings = ({ bufferTime, setBufferTime, onSave }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <Ionicons name="time-outline" size={24} color={COLORS.primary} style={styles.icon} />
          <View>
            <Text style={styles.sectionTitle}>Buffer Time Settings</Text>
            <Text style={styles.sectionSubtitle}>Set time gaps between consultations</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.contentBox}>
        <View style={styles.settingContainer}>
          <Text style={styles.settingLabel}>Set Buffer Time</Text>
          <Text style={styles.settingDescription}>
            Add automatic time gaps between consultations. For example, if a consultation ends at 1:00 PM and buffer time is 15 minutes, the next available slot will start at 1:15 PM.
          </Text>
          
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Time in minutes:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={bufferTime}
                onChangeText={setBufferTime}
                keyboardType="numeric"
                placeholder="15"
                placeholderTextColor={COLORS.secondaryText}
              />
              <Text style={styles.inputSuffix}>minutes</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} style={styles.infoIcon} />
          <Text style={styles.infoText}>
            <Text style={styles.infoTitle}>How it works: </Text>
            When enabled, buffer time will be automatically added after each consultation. This ensures you have adequate preparation time between sessions and helps maintain a comfortable schedule.
          </Text>
        </View>
        
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    marginBottom: SPACING.m,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.m,
    backgroundColor: '#F8F9FF',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: SPACING.s,
  },
  sectionTitle: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
  },
  sectionSubtitle: {
    fontSize: FONT.size.xs,
    color: COLORS.secondaryText,
  },
  contentBox: {
    padding: SPACING.m,
  },
  settingContainer: {
    marginBottom: SPACING.m,
  },
  settingLabel: {
    fontSize: FONT.size.m,
    fontWeight: FONT.weight.medium,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  settingDescription: {
    fontSize: FONT.size.xs,
    color: COLORS.secondaryText,
    marginBottom: SPACING.m,
    lineHeight: 18,
  },
  inputWrapper: {
    marginTop: SPACING.s,
  },
  inputLabel: {
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.medium,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.m,
    height: 48,
    backgroundColor: '#FAFAFA',
  },
  input: {
    flex: 1,
    fontSize: FONT.size.m,
    color: COLORS.primaryText,
  },
  inputSuffix: {
    fontSize: FONT.size.m,
    color: COLORS.secondaryText,
    marginLeft: SPACING.xs,
  },
  infoBox: {
    backgroundColor: '#F8F9FF',
    borderRadius: 8,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    borderWidth: 1,
    borderColor: '#E8ECFD',
    flexDirection: 'row',
  },
  infoIcon: {
    marginRight: SPACING.xs,
    marginTop: 2,
  },
  infoTitle: {
    fontWeight: FONT.weight.medium,
  },
  infoText: {
    flex: 1,
    fontSize: FONT.size.xs,
    color: COLORS.secondaryText,
    lineHeight: 18,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: SPACING.m,
    alignItems: 'center',
    marginTop: SPACING.s,
  },
  saveButtonText: {
    color: COLORS.white,
    fontWeight: FONT.weight.medium,
    fontSize: FONT.size.m,
  },
});

export default BufferTimeSettings; 