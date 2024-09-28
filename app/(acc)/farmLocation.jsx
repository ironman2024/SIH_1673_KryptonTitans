import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the back icon
import { useRouter } from 'expo-router'; // Use useRouter for navigation

export default function FarmLocation() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 37,
    longitude: -122,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const router = useRouter(); // Initialize router

  const userLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      if (!location || !location.coords) {
        alert('Failed to get location');
        return;
      }

      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <>
      {/* Container for the map and back button */}
      <View style={styles.container}>
        {/* Back button in top-left corner */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/(tabs)/account')} // Navigate to account.jsx
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        {/* Map */}
        <MapView style={styles.map} region={mapRegion}>
          <Marker coordinate={mapRegion} title="Marker" key="user-location" />
        </MapView>
      </View>

      {/* Floating Button container */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.locationButton} onPress={userLocation}>
          <Text style={styles.buttonText}>GET MY LOCATION</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 40, // Adjust based on your app's header size
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50', // Green background for the button
    padding: 10,
    borderRadius: 5,
    zIndex: 10, // Ensure the button is on top of the map
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30, // This value adjusts how much the button hovers upwards
    left: 0,
    right: 0,
    alignItems: 'center', // Center the button horizontally
  },
  locationButton: {
    backgroundColor: '#3269e5', // Button color
    borderRadius: 20, // Rounded corners
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    elevation: 3, // Shadow on Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 2, // Shadow radius for iOS
  },
  buttonText: {
    color: 'white', // Button text color
    fontWeight: 'bold', // Text weight
    textAlign: 'center', // Center the text
  },
});