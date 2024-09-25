import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const CalendarScreen = ({ navigation }) => {
  const [diseases, setDiseases] = useState([
    { id: '1', name: 'Panama Disease', date: '1st Jun 2022', affectedTime: 'Affected 2 years ago' },
    { id: '2', name: 'Apple Scab', date: '26th Feb 2021', affectedTime: 'Affected 2 years ago' },
    { id: '3', name: 'Lumpy Skin Disease', date: '1 May 2023', affectedTime: 'Affected 3 months ago' },
    { id: '4', name: 'Clostridial Diseases', date: '4th Oct 2023', affectedTime: 'Affected 1 year ago' },
    { id: '5', name: 'Brown Spot Rice', date: '17 Apr 2023', affectedTime: 'Affected 5 months ago' }
  ]);

  const renderDiseaseItem = ({ item }) => (
<TouchableOpacity style={styles.item} onPress={() => console.log('Entire row clicked')}>
  <View style={styles.itemLeft}>
    <Ionicons name="alert-circle-outline" size={28} color="#4CAF50" />
    <View style={styles.itemTextContainer}>
      <Text style={styles.diseaseName}>{item.name}</Text>
      <Text style={styles.diseaseDate}>{item.date}</Text>
      <Text style={styles.diseaseAffected}>{item.affectedTime}</Text>
    </View>
  </View>

  {/* Separate TouchableOpacity for chevron icon */}
  <TouchableOpacity onPress={() => navigation.navigate('DiseaseDetail', { disease: item })}>
    <Ionicons name="chevron-forward-outline" size={24} color="#888" />
  </TouchableOpacity>
</TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Disease Tracker</Text>
        <FlatList
          data={diseases}
          renderItem={renderDiseaseItem}
          keyExtractor={(item) => item.id}
          style={styles.diseaseList}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('addDisease')}>
          <Ionicons name="add-circle-outline" size={28} color="#FFF" />
          <Text style={styles.addButtonText}>Add New Disease</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginVertical: 20,
  },
  diseaseList: {
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTextContainer: {
    marginLeft: 10,
  },
  diseaseName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  diseaseDate: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'Poppins-Regular',
  },
  diseaseAffected: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginTop: 20,
  },
  addButtonText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFF',
    marginLeft: 8,
  },
});

export default CalendarScreen;