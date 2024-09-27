import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import LanguageModal from '../common/LanguageModal'; // Import from common folder
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import '../src/i18n/i18n.config'; // Import i18n config to initialize translations

const Home = () => {
  const [langModalVisible, setLangModalVisible] = useState(false);
  const { t, i18n } = useTranslation();

  // Function to handle language change from LanguageModal
  const onSelectLang = (selectedLang) => {
    const languageCode = selectedLang === 0 ? 'en' : 'hi'; // 0 -> English, 1 -> Hindi
    i18n.changeLanguage(languageCode); // Change language dynamically
  };

  return (
    <SafeAreaView className="h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View>
          <View>
            {/* Use t('key') to translate text */}
            <Text>{t('Hello')}</Text>

            {/* Button to open the language selection modal */}
            <TouchableOpacity
              style={styles.selectLanguageBtn}
              onPress={() => setLangModalVisible(!langModalVisible)}
            >
              <Text>{t('Select Language')}</Text>
            </TouchableOpacity>
          </View>

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

export default Home;

const styles = StyleSheet.create({
  selectLanguageBtn: {
    width: '70%', // Make it a bit wider for better tap area
    height: 50,
    backgroundColor: '#4B68E9', // Primary color
    borderRadius: 25, // Fully rounded button
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000', // Shadow for elevation effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  selectLanguageText: {
    color: '#fff', // White text
    fontSize: 16,
    fontWeight: '600', // Slightly bold text
    textTransform: 'uppercase', // Make text uppercase
  },
});
