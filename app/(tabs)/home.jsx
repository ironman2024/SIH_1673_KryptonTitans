import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@clerk/clerk-expo';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import Weather from './../../components/weather';  // Your existing Weather component

const HomeScreen = () => {
  const { user, isLoaded } = useUser();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const loadLanguagePreference = async () => {
      try {
        // Retrieve the saved language from AsyncStorage
        const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (savedLanguage) {
          i18n.changeLanguage(savedLanguage);
        }
      } catch (err) {
        console.error('Failed to load language preference', err);
      }
    };

    loadLanguagePreference();
  }, []);

  if (!isLoaded) {
    return null; // or a loading spinner
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.welcomeText}>
          {t('Welcome')}, {user?.fullName}
        </Text>

        {/* Top Section: Location */}
        <TopSection />

        {/* Weather Update Section */}
        <Weather />

        {/* Crop Alerts Section */}
        <CropAlerts />

        {/* Spreading Diseases Section */}
        <SectionHeader title="Spreading Diseases" />
        <DiseaseCardScroll />

        {/* Farming Tips Section */}
        <SectionHeader title="Farming Tips" />
        <FarmingTips />

        {/* Contact Helpline Section */}
        <ContactHelpline />
      </ScrollView>

      {/* Floating Chatbot Icon */}
      <TouchableOpacity
        style={styles.chatbotButton}
        onPress={() => router.push('/chatbot')}  // Route to chatbot
      >
        <Ionicons name="chatbubbles" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Top Section: Location and Icon
const TopSection = () => (
  <View style={styles.topSectionContainer}>
    <Ionicons name="location-outline" size={28} color="#4CAF50" style={styles.locationIcon} />
    <Text style={styles.locationText}>Pune, Maharashtra</Text>
  </View>
);

// Crop Alerts Component
const CropAlerts = () => (
  <View style={styles.alertContainer}>
    <Ionicons name="alert-circle-outline" size={28} color="#E53935" />
    <View style={styles.alertTextContainer}>
      <Text style={styles.alertTitle}>Crop Alerts</Text>
      <Text style={styles.alertDetails}>Blight disease detected in your region</Text>
    </View>
  </View>
);

// Section Header Component
const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity activeOpacity={0.7}>
      <Text style={styles.seeAllText}>See all</Text>
    </TouchableOpacity>
  </View>
);

// Disease Card Scroll Component
const DiseaseCardScroll = () => (
  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.diseaseCardScroll}>
    <DiseaseCard
      icon="bug-outline"
      imageUri="https://www.apsnet.org/edcenter/disandpath/fungalasco/pdlessons/PublishingImages/AppleScab01sm.jpg"
      title="Apple Scab"
      subtitle="A fungal infection affecting apple trees."
      description="Apple scab is caused by a fungus that affects the leaves, fruits, and flowers of apple trees, leading to dark lesions."
      color="#FF6F00"
    />
    <DiseaseCard
      icon="leaf-outline"
      imageUri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTha6BOe-NeS7HWl1UawWt08uHZHz2RZpXuaA&s"
      title="Panama Disease"
      subtitle="A soil-borne fungal disease."
      description="This disease affects bananas and causes wilting, often leading to the death of the plants."
      color="#D32F2F"
    />
  </ScrollView>
);

// Disease Card Component
const DiseaseCard = ({ icon, imageUri, title, subtitle, description, color }) => (
  <TouchableOpacity style={[styles.diseaseCard, { borderColor: color }]}>
    <View style={styles.diseaseHeader}>
      <Ionicons name={icon} size={24} color={color} />
      <Text style={[styles.diseaseTitle, { color }]}>{title}</Text>
    </View>
    <Image source={{ uri: imageUri }} style={styles.diseaseImage} />
    <Text style={styles.diseaseSubtitle}>{subtitle}</Text>
    <Text style={styles.diseaseDescription}>{description}</Text>
    <TouchableOpacity style={styles.readMoreButton}>
      <Text style={[styles.readMoreText, { color }]}>Read more</Text>
      <Ionicons name="arrow-forward-circle-outline" size={20} color={color} />
    </TouchableOpacity>
  </TouchableOpacity>
);

// Farming Tips Component
const FarmingTips = () => (
  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.tipsScroll}>
    <TipCard
      icon="water-outline"
      title="Watering Schedule"
      description="Optimal times to water crops for best results."
      color="#4CAF50"
    />
    <TipCard
      icon="leaf-outline"
      title="Soil Health"
      description="Maintain balanced soil nutrients for healthy crops."
      color="#8BC34A"
    />
    <TipCard
      icon="bug-outline"
      title="Pest Control"
      description="Use natural remedies to manage pests."
      color="#FF9800"
    />
  </ScrollView>
);

// Tip Card Component
const TipCard = ({ icon, title, description, color }) => (
  <View style={[styles.tipCard, { backgroundColor: color }]}>
    <Ionicons name={icon} size={24} color="#FFF" />
    <Text style={styles.tipTitle}>{title}</Text>
    <Text style={styles.tipDescription}>{description}</Text>
  </View>
);

// Contact Helpline Component
const ContactHelpline = () => (
  <View style={styles.contactContainer}>
    <Ionicons name="call-outline" size={28} color="#4CAF50" />
    <Text style={styles.contactText}>Contact Expert for Help</Text>
  </View>
);

// Add your styles below
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 20,
    textAlign: 'center',
    color: '#4CAF50',
  },
  topSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 16,
    borderRadius: 12,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  locationIcon: {
    marginRight: 8,
  },
  locationText: {
    fontSize: 18,
    color: '#333',
  },
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3F3',
    padding: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  alertTextContainer: {
    marginLeft: 10,
  },
  alertTitle: {
    fontSize: 16,
    color: '#E53935',
  },
  alertDetails: {
    fontSize: 14,
    color: '#333',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#333',
  },
  seeAllText: {
    color: '#4CAF50',
    fontSize: 14,
  },
  diseaseCardScroll: {
    marginVertical: 12,
  },
  diseaseCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: 250,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  diseaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  diseaseTitle: {
    fontSize: 16,
    marginLeft: 8,
  },
  diseaseImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  diseaseSubtitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  diseaseDescription: {
    fontSize: 12,
    color: '#777',
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  readMoreText: {
    fontSize: 14,
    marginRight: 4,
  },
  tipsScroll: {
    marginVertical: 16,
  },
  tipCard: {
    padding: 16,
    borderRadius: 12,
    marginRight: 16,
    width: 180,
  },
  tipTitle: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 8,
  },
  tipDescription: {
    fontSize: 14,
    color: '#FFF',
    marginTop: 4,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F8E9',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  chatbotButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 50,
    elevation: 5,
  },
});

export default HomeScreen;
