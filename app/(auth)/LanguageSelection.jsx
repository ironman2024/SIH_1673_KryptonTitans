import { useUser } from '@clerk/clerk-expo';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router'; // Import useRouter for redirection
import '../../src/i18n/i18n.config'; // Import i18n config
import LanguageModal from '../../common/LanguageModal'; // Import LanguageModal

const LanguageSelection = () => {
  const { user } = useUser();
  const [langModalVisible, setLangModalVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const router = useRouter(); // Initialize the router

  // Handle language change from LanguageModal
  const onSelectLang = (selectedLang) => {
    const languageCode = selectedLang === 0 ? 'en' : 'hi'; // 0 -> English, 1 -> Hindi
    i18n.changeLanguage(languageCode); // Change language dynamically
  };

  // Handle "Next" button press to navigate to the Home screen
  const handleNextPress = () => {
    router.replace('/home'); // Redirect to the Home screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ height: '100%' }}>
        <View>
          <Text style={styles.welcomeText}>{t('Welcome')}</Text>
          <Text style={styles.userText}>{user?.fullName}</Text>

          {/* Next button for redirection */}
          <TouchableOpacity style={styles.buttonText} onPress={handleNextPress}>
            <Text>{t('Next')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.selectLanguageBtn}
            onPress={() => setLangModalVisible(!langModalVisible)}
          >
            <Text style={styles.selectLanguageText}>{t('Change Language')}</Text>
          </TouchableOpacity>

          {/* Language selection modal */}
          <LanguageModal
            langModalVisible={langModalVisible}
            setLangModalVisible={setLangModalVisible}
            onSelectLang={onSelectLang} // Pass the handler to LanguageModal
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
    borderRadius: 5,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
    elevation: 5,
  },
  selectLanguageBtn: {
    width: '70%',
    height: 50,
    backgroundColor: '#4B68E9',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
  },
});

export default LanguageSelection;
