import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as tf from '@tensorflow/tfjs'; // Import TensorFlow.js
import * as tflite from '@tensorflow/tfjs-tflite'; // TensorFlow Lite support
import { decodeJpeg, resizeBilinear, expandDims } from '@tensorflow/tfjs-react-native';
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system'; // To handle file paths

const UploadScreen = () => {
  const [image, setImage] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // Using expo-router

  // Define a basic tokenizer setup
  const wordIndex = {
    'panama': 1,
    'disease': 2,
    'spread': 3,
    'symptoms': 4,
    'banana': 5,
    // Add more mappings here
  };

  // Function to tokenize input symptoms
  const tokenizeSymptoms = (symptomsText) => {
    const words = symptomsText.trim().toLowerCase().split(/\s+/);
    const tokenized = words.map(word => wordIndex[word] || 0); // 0 for unknown words
    return tokenized;
  };

  // Function to pad sequences
  const padSequences = (sequence, maxLength) => {
    while (sequence.length < maxLength) {
      sequence.push(0);
    }
    if (sequence.length > maxLength) {
      sequence = sequence.slice(0, maxLength);
    }
    return sequence;
  };

  // Loading the .tflite model
  useEffect(() => {
    const loadModel = async () => {
      setLoading(true);
      try {
        const modelPath = await FileSystem.downloadAsync(
          require('../assets/model.tflite'), // Ensure your model is in the assets folder
          FileSystem.documentDirectory + 'model.tflite'
        );
        const loadedModel = await tflite.loadTFLiteModel(modelPath.uri);
        setModel(loadedModel);
      } catch (error) {
        console.error('Error loading model:', error);
      } finally {
        setLoading(false);
      }
    };
    loadModel();
  }, []);

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

  // Function to convert image to tensor
  const imageToTensor = async (uri) => {
    const response = await fetch(uri);
    const imageData = await response.arrayBuffer();
    const imageTensor = decodeJpeg(new Uint8Array(imageData));
    
    // Resize image to match model input size, for example (224, 224)
    const resizedImageTensor = resizeBilinear(imageTensor, [224, 224]);
    
    // Add a batch dimension for the model: [1, height, width, 3]
    const expandedTensor = expandDims(resizedImageTensor, 0);
    return expandedTensor;
  };

  const processImage = async () => {
    if (!image) {
      alert('Please upload or take an image.');
      return;
    }

    setLoading(true);
    try {
      const imgTensor = await imageToTensor(image); // Convert image to Tensor
      const prediction = model.predict(imgTensor);  // Run prediction using .tflite model
      const result = await prediction.data();       // Get the result
      router.push({ pathname: '/output', params: { result: result[0] } }); // Navigate to OutputScreen with result
    } catch (error) {
      console.error('Error during prediction:', error);
    } finally {
      setLoading(false);
    }
  };

  const processSymptoms = async () => {
    if (!symptoms.trim()) {
      setUploadMessage('Please enter symptoms.');
      return;
    }

    setLoading(true);
    try {
      // Tokenize and pad symptoms input
      const tokenizedSymptoms = tokenizeSymptoms(symptoms);
      const maxLength = 50; // Set your model's required sequence length
      const paddedSymptoms = padSequences(tokenizedSymptoms, maxLength);

      // Convert to tensor
      const inputTensor = tf.tensor2d([paddedSymptoms], [1, maxLength]);

      // Predict using the model
      const prediction = model.predict(inputTensor);
      const result = await prediction.data();
      router.push({ pathname: '/output', params: { result: result[0] } }); // Navigate to OutputScreen with result
    } catch (error) {
      console.error('Error during prediction:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (image) {
      processImage(); // Process the uploaded image
    } else if (symptoms.trim()) {
      processSymptoms(); // Process the symptoms text input
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerText}>Upload</Text>

        {loading ? <ActivityIndicator size="large" color="#4CAF50" /> : null}

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
  // Styling remains the same
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
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
    width: 200,
    height: 200,
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
