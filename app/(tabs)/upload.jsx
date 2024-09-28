import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const ImageUploader = () => {
  const [imageUri, setImageUri] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Function to ask for permissions and select image from the library
  const selectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Function to upload image and get prediction
  const uploadImage = async () => {
    if (!imageUri) {
      alert('Please select an image first');
      return;
    }

    setLoading(true);

    let localUri = imageUri;
    let filename = localUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    const formData = new FormData();
    formData.append('image', {
      uri: localUri,
      name: filename,
      type: type,
    });

    try {
      const response = await axios.post('http://192.168.82.121:5000/classify_image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPrediction(response.data.result);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('An error occurred while uploading the image');
    } finally {
      setLoading(false);
    }
  };

  // Function to reset the uploads
  const onRefresh = () => {
    setRefreshing(true);
    setImageUri(null);
    setPrediction('');
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.container} 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.headerText}>Upload Image</Text>

        <View style={styles.imageUploadContainer}>
          <TouchableOpacity onPress={selectImage} style={styles.uploadButton}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
            ) : (
              <Ionicons name="camera-outline" size={100} color="#B3B3B3" />
            )}
          </TouchableOpacity>
          <Text style={styles.instructionsText}>Select a photo of the crop to analyze.</Text>
          <TouchableOpacity style={styles.uploadImageButton} onPress={uploadImage} disabled={loading}>
            {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.uploadImageButtonText}>Upload Image</Text>}
          </TouchableOpacity>
        </View>

        {prediction && <Text style={styles.result}>Prediction: {prediction}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light background for a clean look
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  imageUploadContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  uploadButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#53B175',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  uploadedImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  instructionsText: {
    marginVertical: 10,
    color: '#666',
    textAlign: 'center',
  },
  uploadImageButton: {
    backgroundColor: '#53B175', // Button color
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadImageButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ImageUploader;
