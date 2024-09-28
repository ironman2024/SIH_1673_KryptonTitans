import { useUser } from '@clerk/clerk-expo';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';  
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Account() {
  const router = useRouter();  
  const { user, isLoaded } = useUser();
  const { i18n } = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = async (lang) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
    await AsyncStorage.setItem('selectedLanguage', lang);
    setModalVisible(false); // Close modal after selecting language
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: user?.imageUrl }} 
          style={styles.profileImage}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{user?.fullName}</Text>
          <Text style={styles.profilePhone}>{user.emailAddresses[0].emailAddress}</Text>
        </View>
        <TouchableOpacity>
          <Icon name="edit" size={20} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Change Language Option */}
      <TouchableOpacity style={styles.menuItem} onPress={() => setModalVisible(true)}>
        <Icon name="language" size={24} color="#000" />
        <Text style={styles.menuText}>Change Language</Text>
      </TouchableOpacity>

      {/* Farm Location Option */}
      <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/farmLocation')}>
        <Icon name="place" size={24} color="#000" />
        <Text style={styles.menuText}>Farm Location</Text>
      </TouchableOpacity>

      {/* Other menu options */}
      <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/calendar')}>
        <Icon name="calendar-today" size={24} color="#000" />
        <Text style={styles.menuText}>Calendar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/notifications')}>
        <Icon name="notifications" size={24} color="#000" />
        <Text style={styles.menuText}>Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/help')}>
        <Icon name="help" size={24} color="#000" />
        <Text style={styles.menuText}>Help</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/about')}>
        <Icon name="info" size={24} color="#000" />
        <Text style={styles.menuText}>About</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => alert('Logged Out')}>
        <Icon name="logout" size={24} color="#fff" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* Language Change Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <TouchableOpacity 
              style={[styles.languageButton, selectedLanguage === 'en' && styles.selectedLanguageButton]}
              onPress={() => changeLanguage('en')}
            >
              <Text style={styles.languageText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.languageButton, selectedLanguage === 'hi' && styles.selectedLanguageButton]}
              onPress={() => changeLanguage('hi')}
            >
              <Text style={styles.languageText}>Hindi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profilePhone: {
    fontSize: 14,
    color: '#666',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  menuText: {
    marginLeft: 20,
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#4CAF50',
  },
  languageButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
    marginVertical: 12,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  selectedLanguageButton: {
    backgroundColor: '#4CAF50',
  },
  languageText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 25,
  },
  closeButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
