// components/LanguageSwitcher.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = ({ style }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={toggleLanguage} activeOpacity={0.7}>
      <View style={styles.row}>
        <Text style={[styles.langText, language === 'en' && styles.activeLang]}>EN</Text>
        <View style={[styles.track, language === 'ta' && styles.trackActive]}>
          <View style={[styles.thumb, language === 'ta' && styles.thumbActive]} />
        </View>
        <Text style={[styles.langText, language === 'ta' && styles.activeLang]}>த</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 25,
    margin: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  langText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
  },
  activeLang: {
    color: '#FF6A00',
  },
  track: {
    width: 36,
    height: 18,
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
    padding: 2,
  },
  trackActive: {
    backgroundColor: '#FF6A00',
  },
  thumb: {
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: '#FFF',
  },
  thumbActive: {
    transform: [{ translateX: 18 }],
  },
});

export default LanguageSwitcher;