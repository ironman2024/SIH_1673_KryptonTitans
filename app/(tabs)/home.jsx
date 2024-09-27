import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { useTranslation } from 'react-i18next';  // Import useTranslation hook

const HomeScreen = () => {
  const { user, isLoaded } = useUser();
  const { t } = useTranslation();  // Initialize the translation hook

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
        

        {/* Crop Alerts Section */}
        <CropAlerts />

        {/* Spreading Diseases Section */}
        <SectionHeader title={t('spreadingDiseases')} /> 
        {/* <DiseaseCardScroll /> */}

        {/* Farming Tips Section */}
        <SectionHeader title={t('farmingTips')} />
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
const TopSection = () => {
  const { t } = useTranslation();  // Translation hook

  return (
    <View style={styles.topSectionContainer}>
      <Ionicons name="location-outline" size={28} color="#4CAF50" style={styles.locationIcon} />
      <Text style={styles.locationText}>{t('location')}: Pune, Maharashtra</Text>
    </View>
  );
};

// Weather Update Component

// Crop Alerts Component
const CropAlerts = () => {
  const { t } = useTranslation();  // Translation hook

  return (
    <View style={styles.alertContainer}>
      <Ionicons name="alert-circle-outline" size={28} color="#E53935" />
      <View style={styles.alertTextContainer}>
        <Text style={styles.alertTitle}>{t('cropAlerts')}</Text>
        <Text style={styles.alertDetails}>{t('blightDiseaseDetected')}</Text>
      </View>
    </View>
  );
};

// Section Header Component
const SectionHeader = ({ title }) => {
  const { t } = useTranslation(); // Ensure translation is available here
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.seeAllText}>{t('seeAll')}</Text>
      </TouchableOpacity>
    </View>
  );
};

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

// Farming Tips Component
const FarmingTips = () => (
  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.tipsScroll}>
    {/* <TipCard
      icon="water-outline"
      title={t('wateringSchedule')}  
      description={t('optimalWateringTimes')}  
      color="#4CAF50"
    />
    <TipCard
      icon="leaf-outline"
      title={t('soilHealth')}  
      description={t('balancedSoilNutrients')}  
      color="#8BC34A"
    />
    <TipCard
      icon="bug-outline"
      title={t('pestControl')}  
      description={t('naturalPestRemedies')}  
      color="#FF9800"
    /> */}
  </ScrollView>
);

// Contact Helpline Component
const ContactHelpline = () => {
  const { t } = useTranslation();  // Translation hook

  return (
    <View style={styles.contactContainer}>
      <Ionicons name="call-outline" size={28} color="#4CAF50" />
      <Text style={styles.contactText}>{t('contactExpertForHelp')}</Text>
    </View>
  );
};

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
    color: '#4caf50',
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
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  weatherTextContainer: {
    marginLeft: 10,
  },
  weatherText: {
    fontSize: 18,
    color: '#333',
  },
  weatherDetails: {
    fontSize: 14,
    color: '#888',
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
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
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
    borderRadius: 50,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
});

export default HomeScreen;
