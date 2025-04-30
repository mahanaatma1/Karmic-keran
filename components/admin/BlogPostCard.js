import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { COLORS, SPACING, FONT, SHADOW, SIZES } from '../../constants/Theme';

const BlogPostCard = ({ post, onEdit, onDelete, onPreview, onToggleActive }) => {
  return (
    <View style={styles.card}>
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.image} />
      )}
      
      <View style={styles.cardContent}>
        <Text style={styles.title}>{post.title}</Text>
        
        <View style={styles.metaInfo}>
          <View style={styles.metaItem}>
            <Ionicons name="bookmark-outline" size={14} color={COLORS.secondaryText} />
            <Text style={styles.metaText}>{post.category}</Text>
          </View>
          
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color={COLORS.secondaryText} />
            <Text style={styles.metaText}>{post.readTime} read</Text>
          </View>
          
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={14} color={COLORS.secondaryText} />
            <Text style={styles.metaText}>{post.date}</Text>
          </View>
        </View>
        
        <View style={styles.authorInfo}>
          <Text style={styles.authorText}>Written and published by {post.author}</Text>
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onPreview(post)}
          >
            <Ionicons name="eye-outline" size={20} color={COLORS.primaryText} />
            <Text style={styles.actionText}>Preview</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onEdit(post)}
          >
            <Feather name="edit" size={20} color={COLORS.primary} />
            <Text style={[styles.actionText, { color: COLORS.primary }]}>Edit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onDelete(post)}
          >
            <Ionicons name="trash-outline" size={20} color="#F44336" />
            <Text style={[styles.actionText, { color: "#F44336" }]}>Delete</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.statusButton,
            { backgroundColor: post.isActive ? '#4CAF50' : COLORS.lightBackground }
          ]}
          onPress={() => onToggleActive(post)}
        >
          <Ionicons 
            name={post.isActive ? "power" : "power-outline"} 
            size={16} 
            color={post.isActive ? COLORS.white : COLORS.secondaryText} 
          />
          <Text 
            style={[
              styles.statusText,
              { color: post.isActive ? COLORS.white : COLORS.secondaryText }
            ]}
          >
            {post.isActive ? 'Active' : 'Inactive'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.l,
    overflow: 'hidden',
    ...SHADOW.small,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: SPACING.m,
  },
  title: {
    fontSize: FONT.size.l,
    fontWeight: FONT.weight.bold,
    color: COLORS.primaryText,
    marginBottom: SPACING.s,
  },
  metaInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.s,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.m,
    marginBottom: SPACING.xs,
  },
  metaText: {
    fontSize: FONT.size.xs,
    color: COLORS.secondaryText,
    marginLeft: 4,
  },
  authorInfo: {
    marginBottom: SPACING.m,
  },
  authorText: {
    fontSize: FONT.size.xs,
    color: COLORS.secondaryText,
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.divider,
    paddingVertical: SPACING.s,
    marginBottom: SPACING.s,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.xs,
  },
  actionText: {
    fontSize: FONT.size.s,
    marginLeft: 4,
    color: COLORS.primaryText,
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.s,
    borderRadius: SIZES.radiusSmall,
    marginTop: SPACING.xs,
  },
  statusText: {
    fontSize: FONT.size.s,
    fontWeight: FONT.weight.medium,
    marginLeft: SPACING.xs,
  },
});

export default BlogPostCard; 