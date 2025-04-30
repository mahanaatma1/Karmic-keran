import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { COLORS, SPACING } from '../../constants/Theme';

// Import custom components
import BlogHeaderBanner from '../../components/admin/post-blog/BlogHeaderBanner';
import BlogPostCard from '../../components/admin/post-blog/BlogPostCard';
import BlogEditorModal from '../../components/admin/post-blog/BlogEditorModal';
import PublishedArticlesHeader from '../../components/admin/post-blog/PublishedArticlesHeader';

export default function PostBlogScreen() {
  const [editorVisible, setEditorVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  
  // Sample blog posts data
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: 'The 12 Zodiac Signs - Cosmic Insights!',
      category: 'Zodiac Signs',
      readTime: '18 min',
      date: 'April 15, 2025',
      author: 'KARMIC',
      content: 'Detailed description of all zodiac signs and their meanings...',
      isActive: true,
      image: 'https://example.com/zodiac-signs.jpg' // This would be a real image URL in production
    }
  ]);

  // Handle creating a new blog post
  const handleCreateBlog = () => {
    setCurrentPost(null); // Reset current post (create mode)
    setEditorVisible(true);
  };

  // Handle editing an existing blog post
  const handleEditBlog = (post) => {
    setCurrentPost(post);
    setEditorVisible(true);
  };

  // Handle saving a blog post (create or update)
  const handleSaveBlog = (blogPost) => {
    if (currentPost) {
      // Update existing post
      setBlogPosts(blogPosts.map(post => 
        post.id === blogPost.id ? blogPost : post
      ));
    } else {
      // Add new post
      setBlogPosts([blogPost, ...blogPosts]);
    }
  };

  // Handle deleting a blog post
  const handleDeleteBlog = (post) => {
    Alert.alert(
      'Delete Blog Post',
      `Are you sure you want to delete "${post.title}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setBlogPosts(blogPosts.filter(p => p.id !== post.id));
          }
        }
      ]
    );
  };

  // Handle toggling a blog post's active status
  const handleToggleActive = (post) => {
    setBlogPosts(blogPosts.map(p => 
      p.id === post.id ? { ...p, isActive: !p.isActive } : p
    ));
  };

  // Handle previewing a blog post
  const handlePreviewBlog = (post) => {
    // In a real app, this would navigate to a preview screen
    Alert.alert(
      'Preview Blog',
      `Previewing "${post.title}"`,
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header Banner with Write Blog Button */}
        <BlogHeaderBanner onWriteBlog={handleCreateBlog} />
        
        {/* Published Articles Section */}
        <PublishedArticlesHeader />
        
        {/* Blog Posts List */}
        <View style={styles.blogPostsContainer}>
          {blogPosts.map((post) => (
            <BlogPostCard
              key={post.id}
              post={post}
              onEdit={handleEditBlog}
              onDelete={handleDeleteBlog}
              onPreview={handlePreviewBlog}
              onToggleActive={handleToggleActive}
            />
          ))}
        </View>
      </View>
      
      {/* Blog Editor Modal */}
      <BlogEditorModal
        visible={editorVisible}
        onClose={() => setEditorVisible(false)}
        onSave={handleSaveBlog}
        initialData={currentPost}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.l,
  },
  blogPostsContainer: {
    marginBottom: SPACING.xl,
  }
}); 
