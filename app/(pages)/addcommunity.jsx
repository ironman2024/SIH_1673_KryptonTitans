import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router'; // Import useRouter

// Firebase client-side config (public)
const firebaseConfig = {
  apiKey: "AIzaSyAT-NI6jaIocQ2XOjSmZwDeNEJyng3BV3I",
  authDomain: "nector-28874.firebaseapp.com",
  projectId: "nector-28874",
  storageBucket: "nector-28874.appspot.com",
  messagingSenderId: "946881652909",
  appId: "1:946881652909:web:e7a5e3ef224061484c3e24",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const UploadToFirebase = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [textContent, setTextContent] = useState('');
  const router = useRouter(); // Initialize the router

  const handleImageChange = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    
    if (!result.cancelled) {
      setImage(result.assets[0]);
    }
  };

  const handleUpload = async () => {
    if (image && textContent && title) {
      const folderRef = ref(storage, `${title}/`);

      try {
        // Upload Image
        const imageRef = ref(folderRef, image.fileName);
        await uploadBytes(imageRef, image.uri);
        console.log(`${image.fileName} uploaded successfully.`);

        // Upload Raw Text as Blob
        const textBlob = new Blob([textContent], { type: 'text/plain' });
        const textRef = ref(folderRef, 'text_content.txt');
        await uploadBytes(textRef, textBlob);
        console.log("Text content uploaded successfully.");

        Alert.alert("Upload Successful", "Your image and text have been uploaded.");

        // Reset state after upload
        setImage(null);
        setTextContent('');
        setTitle('');

        // Navigate back to Community screen
        router.push('/community'); // Change the route as needed
      } catch (error) {
        console.error("Error uploading:", error);
        Alert.alert("Upload Failed", "There was an issue uploading your content.");
      }
    } else {
      Alert.alert("Please fill all fields and select an image.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Upload to Community</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title for folder"
        value={title}
        onChangeText={setTitle}
      />
      <TouchableOpacity style={styles.button} onPress={handleImageChange}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>
      {image && (
        <View style={styles.imagePreview}>
          <Image source={{ uri: image.uri }} style={styles.image} />
          <Text style={styles.imageName}>{image.fileName}</Text>
        </View>
      )}
      <TextInput
        style={styles.textArea}
        placeholder="Enter text content"
        value={textContent}
        onChangeText={setTextContent}
        multiline
      />
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Text style={styles.uploadButtonText}>Upload to Firebase</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imagePreview: {
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  imageName: {
    color: '#555',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    height: 100,
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UploadToFirebase;
