import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT, SIZES } from '../../constants/Theme';

const BlogHeaderBanner = ({ onWriteBlog }) => {
  return (
    <LinearGradient
      colors={['#FF7D7D', '#FFA33C', '#FFAB4C']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.banner}
    >
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Write and publish your blog from here</Text>
          <Text style={styles.subtitle}>
            Explore insights, stories, and updates curated to inform and inspire you.
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.writeButton}
          onPress={onWriteBlog}
        >
          <Ionicons name="add" size={18} color={COLORS.primaryText} />
          <Text style={styles.writeButtonText}>Write a Blog</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  banner: {
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    marginBottom: SPACING.l,
  },
  contentContainer: {
    padding: SPACING.l,
  },
  textContainer: {
    marginBottom: SPACING.m,
  },
  title: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.white,
    marginBottom: SPACING.s,
  },
  subtitle: {
    fontSize: FONT.size.s,
    color: COLORS.white,
    opacity: 0.9,
  },
  writeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    borderRadius: SIZES.radius,
    alignSelf: 'flex-start',
  },
  writeButtonText: {
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.medium,
    color: COLORS.primaryText,
    marginLeft: SPACING.xs,
  },
});

export default BlogHeaderBanner; 