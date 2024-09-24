import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Top Section: Location and Carrot Icon */}
        <View style={styles.topSection}>
          <Ionicons name="ios-carrot" size={28} color="#4CAF50" />
          <Text style={styles.locationText}>Kolhapur, Maharashtra</Text>
        </View>

        {/* Weather Update Section */}
        <WeatherUpdate />

        {/* Search Bar with Voice Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" />
          <TextInput
            placeholder="Search Disease"
            style={styles.searchInput}
            placeholderTextColor="#888"
          />
          <TouchableOpacity>
            <Ionicons name="mic-outline" size={20} color="#4CAF50" />
          </TouchableOpacity>
        </View>

        {/* Crop Alerts Section */}
        <CropAlerts />

        {/* Spreading Diseases Section */}
        <SectionHeader title="Spreading Diseases" />
        <DiseaseCardScroll />

        {/* More Disease Section */}
        <SectionHeader title="More Diseases" />
        <SmallDiseaseCardScroll />

        {/* Farming Tips Section */}
        <SectionHeader title="Farming Tips" />
        <FarmingTips />

        {/* Contact Helpline Section */}
        <ContactHelpline />
      </ScrollView>
    </SafeAreaView>
  );
};

// Weather Update Component
const WeatherUpdate = () => (
  <View style={styles.weatherContainer}>
    <Ionicons name="cloud-outline" size={28} color="#4CAF50" />
    <View>
      <Text style={styles.weatherText}>Weather Today</Text>
      <Text style={styles.weatherDetails}>Sunny, 28°C</Text>
    </View>
  </View>
);

// Crop Alerts Component
const CropAlerts = () => (
  <View style={styles.alertSection}>
    <Ionicons name="alert-circle-outline" size={28} color="#E53935" />
    <View>
      <Text style={styles.alertTitle}>Crop Alerts</Text>
      <Text style={styles.alertDetails}>Blight disease detected in your region</Text>
    </View>
  </View>
);

// Section Header Component
const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity>
      <Text style={styles.seeAllText}>See all</Text>
    </TouchableOpacity>
  </View>
);

// Disease Card Scroll Component
const DiseaseCardScroll = () => (
  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.diseaseCardScroll}>
    <DiseaseCard
      imageUri="https://www.apsnet.org/edcenter/disandpath/fungalasco/pdlessons/PublishingImages/AppleScab01sm.jpg"
      title="Apple Scab"
      subtitle="Fungal infection caused by..."
    />
    <DiseaseCard
      imageUri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTha6BOe-NeS7HWl1UawWt08uHZHz2RZpXuaA&s"
      title="Panama Disease"
      subtitle="Wilting disease caused by fungus..."
    />
  </ScrollView>
);

// Disease Card Component
const DiseaseCard = ({ imageUri, title, subtitle }) => (
  <TouchableOpacity style={styles.diseaseCard}>
    <Image source={{ uri: imageUri }} style={styles.diseaseImage} />
    <Text style={styles.diseaseTitle}>{title}</Text>
    <Text style={styles.diseaseSubtitle}>{subtitle}</Text>
    <TouchableOpacity style={styles.readMoreButton}>
      <Text style={styles.readMoreText}>Read more</Text>
      <Ionicons name="add-circle" size={20} color="#4CAF50" />
    </TouchableOpacity>
  </TouchableOpacity>
);

// Small Disease Card Scroll Component
const SmallDiseaseCardScroll = () => (
  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.diseaseCardScroll}>
    <SmallDiseaseCard imageUri="https://example.com/pulses-image.png" title="Pulses" />
    <SmallDiseaseCard imageUri="https://example.com/rice-image.png" title="Rice" />
    <SmallDiseaseCard imageUri="https://example.com/okra-image.png" title="Okra" />
  </ScrollView>
);

// Small Disease Card Component
const SmallDiseaseCard = ({ imageUri, title }) => (
  <TouchableOpacity style={styles.smallDiseaseCard}>
    <Image source={{ uri: imageUri }} style={styles.smallDiseaseImage} />
    <Text style={styles.smallDiseaseTitle}>{title}</Text>
  </TouchableOpacity>
);

// Farming Tips Component
const FarmingTips = () => (
  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
    <View style={styles.tipsCard}>
      <Text style={styles.tipsTitle}>Watering Schedule</Text>
      <Text style={styles.tipsSubtitle}>Optimal times to water crops...</Text>
    </View>
    <View style={styles.tipsCard}>
      <Text style={styles.tipsTitle}>Soil Health</Text>
      <Text style={styles.tipsSubtitle}>Keep your soil nutrients balanced...</Text>
    </View>
    <View style={styles.tipsCard}>
      <Text style={styles.tipsTitle}>Pest Control</Text>
      <Text style={styles.tipsSubtitle}>Natural remedies for pest control...</Text>
    </View>
  </ScrollView>
);

// Contact Helpline Component
const ContactHelpline = () => (
  <View style={styles.contactContainer}>
    <Ionicons name="call-outline" size={28} color="#4CAF50" />
    <Text style={styles.contactText}>Contact Expert for Help</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 20, // Adding padding to the bottom for better visibility
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 18,
    color: '#333',
    fontFamily: 'Poppins-SemiBold',
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 10,
    marginVertical: 20,
  },
  weatherText: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 10,
  },
  weatherDetails: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'Poppins-Regular',
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  alertSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3F3',
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
  },
  alertTitle: {
    fontSize: 16,
    color: '#E53935',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 10,
  },
  alertDetails: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins-Regular',
    marginLeft: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#333',
    fontFamily: 'Poppins-SemiBold',
  },
  seeAllText: {
    color: '#4CAF50',
    fontFamily: 'Poppins-SemiBold',
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
    width: 200,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  diseaseImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  diseaseTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginVertical: 8,
  },
  diseaseSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#888',
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  readMoreText: {
    fontSize: 14,
    color: '#4CAF50',
    marginRight: 4,
    fontFamily: 'Poppins-Regular',
  },
  smallDiseaseCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 8,
    marginRight: 16,
    width: 100,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  smallDiseaseImage: {
    width: '100%',
    height: 60,
    borderRadius: 5,
  },
  smallDiseaseTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    textAlign: 'center',
  },
  tipsCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 12,
    marginRight: 16,
    width: 150,
    alignItems: 'center',
  },
  tipsTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  tipsSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#888',
    textAlign: 'center',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 10,
    marginVertical: 20,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 10,
  },
});

export default HomeScreen;
