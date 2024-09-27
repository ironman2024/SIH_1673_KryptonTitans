import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { useRoute, useNavigation } from '@react-navigation/native';

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

const Content = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { folder } = route.params; // Get the folder name from route params
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // State to manage the selected image for modal

  useEffect(() => {
    fetchFolderContent(folder);
  }, [folder]);

  const fetchFolderContent = async (folderName) => {
    const folderRef = ref(storage, folderName);

    try {
      const fileList = await listAll(folderRef);
      const fetchedData = await Promise.all(
        fileList.items.map(async (item) => {
          const url = await getDownloadURL(item);
          const isImage = item.name.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/i);
          const content = isImage ? await fetchTextContent(folderName) : ''; // Fetch content if it's an image

          return {
            id: item.name,
            url,
            isImage,
            content,
          };
        })
      );
      setData(fetchedData.filter(item => item.isImage || item.content)); // Filter out items without image or content
    } catch (error) {
      console.error("Error fetching folder content:", error);
      setError('Failed to load content.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTextContent = async (folderName) => {
    // Fetch the content of the text_content.txt file
    const textFileRef = ref(storage, `${folderName}/text_content.txt`);

    try {
      const url = await getDownloadURL(textFileRef);
      const response = await fetch(url);
      const text = await response.text();
      return text; // Return the text content
    } catch (error) {
      console.error("Error fetching text content:", error);
      return ''; // Return empty if unable to fetch
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedImage(item.url)} activeOpacity={0.7}>
      {item.isImage ? (
        <View style={styles.card}>
          <Image source={{ uri: item.url }} style={styles.cardImage} />
          <View style={styles.cardContentWrapper}>
            <Text style={styles.cardTitle}>{folder}</Text>
            {item.content && <Text style={styles.cardContent}>{item.content}</Text>}
          </View>
        </View>
      ) : (
        <Text style={styles.cardTitle}>{item.id}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4caf50" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Folders</Text>
      </TouchableOpacity>

      {/* Modal for full-size image */}
      {selectedImage && (
        <Modal
          transparent={true}
          visible={!!selectedImage}
          onRequestClose={() => setSelectedImage(null)}
        >
          <View style={styles.modalContainer}>
            <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" />
            <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedImage(null)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardContentWrapper: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  cardContent: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  list: {
    paddingBottom: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#4caf50',
    borderRadius: 25, // Make the button more round
    alignItems: 'center',
    elevation: 3, // Add shadow to the button
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  fullImage: {
    width: '100%',
    height: '80%',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 3,
  },
  closeButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default Content;
