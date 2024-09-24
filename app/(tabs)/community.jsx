import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const data = [
  {
    id: '1',
    title: 'Panama Disease Cure',
    description: 'The most effective tool against Panama disease is the development of banana plants resistant to Fusarium.',
    contributions: 104,
    image: 'https://example.com/path-to-panama-disease-cure-image', // Replace with actual image URL
  },
  {
    id: '2',
    title: 'Panama Disease Spread in Kokan',
    description: 'Soil-borne fungal disease that spreads through the movement of infected plants, soil, water, and equipment.',
    contributions: 79,
    image: 'https://example.com/path-to-panama-disease-spread-image', // Replace with actual image URL
  },
  {
    id: '3',
    title: 'Panama Disease Symptoms',
    description: 'Key symptoms of Panama disease affecting banana plants.',
    contributions: 56,
    image: 'https://example.com/path-to-panama-disease-symptoms-image', // Replace with actual image URL
  },
  {
    id: '4',
    title: 'Soil Health Management',
    description: 'Best practices to improve and maintain soil fertility for long-term crop sustainability.',
    contributions: 88,
    image: 'https://example.com/path-to-soil-health-management-image', // Replace with actual image URL
  },
  {
    id: '5',
    title: 'Organic Farming Techniques',
    description: 'Exploring methods to adopt sustainable and eco-friendly farming without synthetic fertilizers or pesticides.',
    contributions: 120,
    image: 'https://example.com/path-to-organic-farming-image', // Replace with actual image URL
  },
  {
    id: '6',
    title: 'Integrated Pest Management (IPM)',
    description: 'Strategies for managing pests using biological control, cultural practices, and minimal use of chemicals.',
    contributions: 67,
    image: 'https://example.com/path-to-ipm-image', // Replace with actual image URL
  },
  {
    id: '7',
    title: 'Water Conservation in Agriculture',
    description: 'Techniques to optimize water use for irrigation and reduce water waste in farming operations.',
    contributions: 142,
    image: 'https://example.com/path-to-water-conservation-image', // Replace with actual image URL
  },
  {
    id: '8',
    title: 'Climate-Resilient Crops',
    description: 'Discussion on developing and planting crop varieties that can withstand extreme weather conditions.',
    contributions: 98,
    image: 'https://example.com/path-to-climate-resilient-crops-image', // Replace with actual image URL
  },
  {
    id: '9',
    title: 'Regenerative Agriculture',
    description: 'Exploring farming practices that regenerate topsoil, increase biodiversity, and improve water cycles.',
    contributions: 76,
    image: 'https://example.com/path-to-regenerative-agriculture-image', // Replace with actual image URL
  },
  {
    id: '10',
    title: 'Crop Rotation for Disease Prevention',
    description: 'How to implement crop rotation strategies to minimize plant disease outbreaks and improve soil health.',
    contributions: 65,
    image: 'https://example.com/path-to-crop-rotation-image', // Replace with actual image URL
  },
  {
    id: '11',
    title: 'Agroforestry Practices',
    description: 'Incorporating trees into agricultural systems to improve biodiversity and increase yields.',
    contributions: 81,
    image: 'https://example.com/path-to-agroforestry-image', // Replace with actual image URL
  },
  {
    id: '12',
    title: 'Greenhouse Farming Innovations',
    description: 'Latest advancements in greenhouse farming to improve crop yields and protect from environmental factors.',
    contributions: 110,
    image: 'https://example.com/path-to-greenhouse-farming-image', // Replace with actual image URL
  },
];

const Community = () => {
  const [search, setSearch] = useState('');

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.cardFooter}>
          <Text style={styles.contributions}>{item.contributions} Contributions</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Community Topics"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        {/* FlatList for rendering cards */}
        <FlatList
          data={data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))}
          keyExtractor={item => item.id}
          renderItem={renderCard}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: '#333',
  },
  filterButton: {
    padding: 6,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 4, // Add shadow for iOS
    shadowColor: '#000', // Android shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    resizeMode: 'cover',
  },
  cardContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contributions: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Community;
