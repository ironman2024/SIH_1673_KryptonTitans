import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Client, ID, Storage } from 'react-native-appwrite';

// Appwrite client configuration
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66f45e760006747235eb');

const storage = new Storage(client);

// Container component similar to the one in your web app
const Container = ({ children }) => {
    return <View style={styles.container}>{children}</View>;
};

const Community = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const selectImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
      if (!selectedImage) {
          alert('Please select an image first!');
          return;
      }
  
      const uriParts = selectedImage.split('/');
      const fileName = uriParts[uriParts.length - 1];
  
      try {
          const response = await fetch(selectedImage);  // Fetch the selected image URI
          const blob = await response.blob();  // Convert image to a blob
  
          console.log('Starting upload...');
          
          // Log details about the file being uploaded
          console.log('File Name:', fileName);
          console.log('Blob Type:', blob.type);
          console.log('Blob Size:', blob.size);
  
          const uploadResponse = await storage.createFile(
              '66f465130001e7674299', // Replace with your actual bucket ID
              ID.unique(),
              blob
          );
  
          console.log('Upload Response:', uploadResponse); // Log successful response
          setUploadStatus('Image uploaded successfully!');
      } catch (error) {
          console.error('Error during upload:', error); // Log detailed error
          setUploadStatus('Failed to upload image.');
      }
  };

    return (
        <Container>
            <View style={styles.content}>
                <Text style={styles.title}>Community Screen</Text>

                <TouchableOpacity onPress={selectImage} style={styles.button}>
                    <Text style={styles.buttonText}>Select Image</Text>
                </TouchableOpacity>

                {selectedImage && (
                    <Image
                        source={{ uri: selectedImage }}
                        style={styles.imagePreview}
                    />
                )}

                <TouchableOpacity onPress={uploadImage} style={styles.uploadButton}>
                    <Text style={styles.buttonText}>Upload Image</Text>
                </TouchableOpacity>

                {uploadStatus && (
                    <Text style={styles.uploadStatus(uploadStatus)}>{uploadStatus}</Text>
                )}
            </View>
        </Container>
    );
};

// Styles for centering the content and adding layout
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Center vertically
        alignItems: 'center',     // Center horizontally
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    content: {
        alignItems: 'center',
        width: '100%',
        maxWidth: 400, // To prevent content from being too wide on large screens
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    imagePreview: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    uploadButton: {
        backgroundColor: '#2ecc71',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    uploadStatus: (status) => ({
        color: status.includes('Successful') ? 'green' : 'red',
        fontSize: 16,
        marginTop: 10,
    }),
});

export default Community;
