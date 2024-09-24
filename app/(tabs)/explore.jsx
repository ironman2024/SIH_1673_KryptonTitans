import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput, Modal, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Sample disease categories (use real data in production)
const categories = [
  { id: '1', name: 'Cereals', image: require('../../assets/images/cereals.jpeg'), details: 'Common diseases in cereals include rust, smut, and leaf blight. These can reduce yield and grain quality if left untreated.' },
  { id: '2', name: 'Cows Disease', image: require('../../assets/images/cowsdisease.jpg'), details: 'Cattle diseases include mastitis, foot-and-mouth disease, and anthrax. Early detection and treatment can prevent outbreaks.' },
  { id: '3', name: 'Sheep Diseases', image: require('../../assets/images/sheepdisease.jpg'), details: 'Sheep are prone to diseases such as foot rot, blue tongue, and sheep scab. These diseases can affect wool quality and animal health.' },
  { id: '4', name: 'Fruit Diseases', image: require('../../assets/images/fruitdiseases.jpeg'), details: 'Fruit crops can be affected by diseases like powdery mildew, citrus canker, and fire blight. These diseases can spoil harvests.' },
  { id: '5', name: 'Poultry Diseases', image: require('../../assets/images/poultry.png'), details: 'Poultry are vulnerable to diseases such as avian influenza, Newcastle disease, and coccidiosis. Proper biosecurity can prevent them.' },
  { id: '6', name: 'Soil Health', image: require('../../assets/images/soil.jpg'), details: 'Soil health is critical to crop success. Issues like soil-borne diseases (e.g., nematodes, fungi) can degrade soil quality over time.' },
  { id: '7', name: 'Insect Pests', image: require('../../assets/images/insect.png'), details: 'Insect pests like aphids, whiteflies, and weevils damage crops by sucking sap and spreading disease. Proper pest management is key.' },
  { id: '8', name: 'Tree Diseases', image: require('../../assets/images/tree.jpg'), details: 'Trees can be affected by diseases such as Dutch elm disease, sudden oak death, and root rot. Tree health impacts forest and fruit production.' },
];

const categoryColors = {
  'Cereals': '#FFEB3B',  // Yellow
  'Cows Disease': '#FFCDD2',  // Light Red
  'Sheep Diseases': '#BBDEFB',  // Light Blue
  'Fruit Diseases': '#A5D6A7',  // Light Green
  'Poultry Diseases': '#F8BBD0',  // Pink
  'Soil Health': '#FFECB3',  // Light Yellow
  'Insect Pests': '#FFE0B2',  // Orange
  'Tree Diseases': '#C5E1A5',  // Light Green
};

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data (categories)
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header with Search Bar */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Find Disease</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Disease"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Loading Indicator */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
          </View>
        ) : (
          <>
            {/* Categories */}
            <Text style={styles.sectionTitle}>Disease Categories</Text>
            {filteredCategories.length > 0 ? (
              <FlatList
                data={filteredCategories}
                renderItem={({ item }) => (
                  <TouchableOpacity style={[styles.categoryCard, { backgroundColor: categoryColors[item.name] }]} onPress={() => handleCategoryPress(item)}>
                    <Image source={item.image} style={styles.categoryImage} />
                    <Text style={styles.categoryText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.categoriesList}
              />
            ) : (
              <Text style={styles.noResultsText}>No diseases found for your search</Text>
            )}
          </>
        )}

        {/* Modal for Category Info */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{selectedCategory?.name}</Text>
            <Image source={selectedCategory?.image} style={styles.modalImage} />
            <Text style={styles.modalContent}>
              {selectedCategory?.details}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: '#333',
  },
  categoriesList: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  categoryCard: {
    flex: 1,
    margin: 10,
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
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 15,
    marginBottom: 15,
  },
  modalContent: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  modalCloseButton: {
    fontSize: 16,
    color: '#007BFF',
    marginTop: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Explore;
