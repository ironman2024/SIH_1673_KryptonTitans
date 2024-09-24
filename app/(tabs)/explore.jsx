import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Sample disease categories (replace image paths with actual images in your assets)
const categories = [
  { id: '1', name: 'Cereals', image: require('../../assets/images/logo-small.png') },
  { id: '2', name: 'Cows Disease', image: require('../../assets/images/logo-small.png') },
  { id: '3', name: 'Sheep Diseases', image: require('../../assets/images/logo-small.png') },
  { id: '4', name: 'Spices', image: require('../../assets/images/logo-small.png') },
  { id: '5', name: 'Poultry Diseases', image: require('../../assets/images/logo-small.png') },
  { id: '6', name: 'Soil Health', image: require('../../assets/images/logo-small.png') },
  { id: '7', name: 'Insect Pests', image: require('../../assets/images/logo-small.png') },
  { id: '8', name: 'Tree Diseases', image: require('../../assets/images/logo-small.png') },
  { id: '9', name: 'Fruits and Vegetables', image: require('../../assets/images/logo-small.png') },
];

const Explore = () => {

  // Render a single category card
  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard} onPress={() => handleCategoryPress(item)}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Handle category press event (to detect disease)
  const handleCategoryPress = (category) => {
    console.log(`Detecting diseases in ${category.name}`);
    // Navigate to a detailed disease detection screen for this category
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Find Disease</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Disease"
            placeholderTextColor="#999"
          />
        </View>

        {/* Categories */}
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.categoriesList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
  },
  searchInput: {
    marginTop: 12,
    padding: 12,
    width: '100%',
    backgroundColor: '#F1F3F4',
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  categoriesList: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  categoryCard: {
    flex: 1,
    margin: 10,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  categoryImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  categoryText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
  },
});

export default Explore;
