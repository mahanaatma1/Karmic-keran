import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT } from '../constants/Theme';
import LogoSvg from '../assets/kk-logo.svg';

export default function Logo({ size = 'medium', color = COLORS.goldenOrange }) {
  const logoSize = size === 'small' ? 45 : size === 'medium' ? 70 : 100;
  
  // Attempt to use SVG logo
  try {
    return (
      <LogoSvg 
        width={logoSize} 
        height={logoSize * 0.43} 
        style={styles.logo}
      />
    );
  } catch (error) {
    // Fallback to text logo if SVG doesn't work
    const fontSize = size === 'small' ? FONT.size.l : size === 'medium' ? FONT.size.xl : FONT.size.xxl;
  return (
    <View style={[styles.container, { width: logoSize, height: logoSize, backgroundColor: color }]}>
      <Text style={[styles.text, { fontSize }]}>KK</Text>
    </View>
  );
  }
}

export function HeaderLogo() {
  return (
    <View style={styles.headerContainer}>
      <Logo size="small" color={COLORS.goldenOrange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  text: {
    color: COLORS.white,
    fontWeight: FONT.weight.bold,
  },
  logo: {
    // Remove the alignSelf: 'center' style to allow the parent container to control alignment
  },
  headerContainer: {
    marginLeft: 16,
  }
});