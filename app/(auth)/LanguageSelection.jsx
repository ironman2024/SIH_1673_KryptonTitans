import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView,Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import '../../src/i18n/i18n.config';
import LanguageModal from '../../common/LanguageModal';

const LanguageSelection = () => {
  const [langModalVisible, setLangModalVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const router = useRouter();

  // Handle language change from LanguageModal
  const onSelectLang = async (selectedLang) => {
    const languageCode = selectedLang === 0 ? 'en' : 'hi';
    i18n.changeLanguage(languageCode);
    
    try {
      // Save the selected language to AsyncStorage
      await AsyncStorage.setItem('selectedLanguage', languageCode);
    } catch (err) {
      console.error('Failed to save language preference', err);
    }
  };

  const handleNextPress = () => {
    router.replace('/LoginScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ height: '100%' }}>
        <View>
        <Image
        
            source={require('./../../assets/images/logotext.png')}
            style={{
              width: 300,
              height: 150,
              alignSelf: 'center',
              marginBottom: 20,
              marginTop:250
            }}
            resizeMode="contain"
          />
           {/* Button to open LanguageModal */}
           <TouchableOpacity
            style={styles.selectLanguageBtn}
            onPress={() => setLangModalVisible(!langModalVisible)}
          >
            <Text style={styles.selectLanguageText}>{t('Change Language')}</Text>
          </TouchableOpacity>
          
          


          {/* Next button for redirection */}
          <TouchableOpacity style={styles.buttonText} onPress={handleNextPress}>
            <Text
            style={{
              textAlign:'center',
              color:'#FAF7F0'
             
            }}>{t('Sign Up')}</Text>
          </TouchableOpacity>

         

          {/* Language Modal */}
          <LanguageModal
            langModalVisible={langModalVisible}
            setLangModalVisible={setLangModalVisible}
            onSelectLang={onSelectLang}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#53B175',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  userText: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#1A4D2E',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#347928',
    padding: 15,
    borderRadius: 90,
    
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
    elevation: 5,
    
  },
  selectLanguageBtn: {
    width: '70%',
    height: 50,
    backgroundColor: '#FAF7F0',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: '15%',
  },
  selectLanguageText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    color:'#181C14'
  },
});

export default LanguageSelection;