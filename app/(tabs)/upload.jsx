import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const UploadScreen = () => {
  const [image, setImage] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const handleSubmit = () => {
    if (symptoms.trim()) {
      setUploadMessage('Upload successful!');
      // Add your upload logic here
    } else {
      setUploadMessage('Please enter symptoms.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerText}>Upload</Text>

        <View style={styles.imageUploadContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
            {image ? (
              <Image source={{ uri: image }} style={styles.uploadedImage} />
            ) : (
              <Ionicons name="camera-outline" size={100} color="#B3B3B3" />
            )}
          </TouchableOpacity>
          <Text style={styles.instructionsText}>Click a photo of diseased crop for identifying the disease</Text>
          <TouchableOpacity style={styles.uploadImageButton} onPress={pickImage}>
            <Text style={styles.uploadImageButtonText}>Upload Image</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.symptomsContainer}>
          <Text style={styles.symptomsLabel}>Symptoms</Text>
          <TextInput
            style={styles.symptomsInput}
            placeholder="Describe the symptoms in detail..."
            value={symptoms}
            onChangeText={setSymptoms}
            multiline
          />
          <TouchableOpacity style={styles.uploadSymptomsButton} onPress={handleSubmit}>
            <Text style={styles.uploadSymptomsButtonText}>Submit Symptoms</Text>
          </TouchableOpacity>
          {uploadMessage ? <Text style={styles.uploadMessage}>{uploadMessage}</Text> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'flex-start', // Align items to the left
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30, // Increased font size
    fontWeight: 'bold',
    textAlign: 'left', // Align text to the left
    marginBottom: 20,
    color: '#333333',
  },
  imageUploadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    width: '100%',
  },
  uploadButton: {
    width: 200, // Increased width
    height: 200, // Increased height
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  instructionsText: {
    fontSize: 14,
    color: '#888888',
    marginTop: 15,
    textAlign: 'center',
  },
  uploadImageButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
    elevation: 3,
  },
  uploadImageButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  symptomsContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#F6F6F6',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 30,
  },
  symptomsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  symptomsInput: {
    height: 80,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    color: '#333333',
    textAlignVertical: 'top',
  },
  uploadSymptomsButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    elevation: 3,
  },
  uploadSymptomsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  uploadMessage: {
    marginTop: 10,
    fontSize: 14,
    color: '#4CAF50',
    textAlign: 'center',
  },
});

export default UploadScreen;
