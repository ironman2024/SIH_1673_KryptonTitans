import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getStorage, ref, listAll, uploadBytes } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { initializeApp } from 'firebase/app';
import { useRouter } from 'expo-router';

const firebaseConfig = {
  apiKey: "AIzaSyAT-NI6jaIocQ2XOjSmZwDeNEJyng3BV3I",
  authDomain: "nector-28874.firebaseapp.com",
  projectId: "nector-28874",
  storageBucket: "nector-28874.appspot.com",
  messagingSenderId: "946881652909",
  appId: "1:946881652909:web:e7a5e3ef224061484c3e24",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const Community = () => {
  const [search, setSearch] = useState('');
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [textContent, setTextContent] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    const storageRef = ref(storage, '/');
    try {
      const folderList = await listAll(storageRef);
      const folderNames = folderList.prefixes.map((folder) => folder.name);
      setFolders(folderNames);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching folders:", error);
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchFolders();
    setRefreshing(false);
  };

  const handleImageChange = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Allow all media types
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.assets[0]);
    }
  };

  const handleUpload = async () => {
    if (image && textContent && title) {
      const folderRef = ref(storage, `${title}/`);
      try {
        const response = await fetch(image.uri);
        const blob = await response.blob(); // Convert to blob for upload
        const imageRef = ref(folderRef, image.fileName);
        await uploadBytes(imageRef, blob);
        console.log(`${image.fileName} uploaded successfully.`);
        
        const textBlob = new Blob([textContent], { type: 'text/plain' });
        const textRef = ref(folderRef, 'text_content.txt');
        await uploadBytes(textRef, textBlob);
        console.log("Text content uploaded successfully.");
        Alert.alert("Upload Successful", "Your image and text have been uploaded.");
        setImage(null);
        setTextContent('');
        setTitle('');
        setModalVisible(false);
        fetchFolders();
      } catch (error) {
        console.error("Error uploading:", error);
        Alert.alert("Upload Failed", "There was an issue uploading your content.");
      }
    } else {
      Alert.alert("Please fill all fields and select an image.");
    }
  };

  const handleFolderPress = (folderName) => {
    router.push({
      pathname: '/content',
      params: { folder: folderName },
    });
  };

  // Filter folders based on search input
  const filteredFolders = folders.filter(folder =>
    folder.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#4caf50" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Community Topics"
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={24} color="#4caf50" />
          </TouchableOpacity>
        </View>

        {/* Display Folders */}
        <Text style={styles.folderHeader}>Available Folders</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={filteredFolders}
            keyExtractor={folder => folder}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleFolderPress(item)}>
                <Text style={styles.folderItem}>{item}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.folderList}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}

        {/* Pen Button for Asking Community */}
        <TouchableOpacity
          style={styles.penButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="create" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Modal for Uploading */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Upload to Community</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter title for folder"
            placeholderTextColor="#888"
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
            placeholderTextColor="#888"
            value={textContent}
            onChangeText={setTextContent}
            multiline
          />
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.uploadButtonText}>Upload to Firebase</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.closeModal}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#000',
    padding: 10,
  },
  filterButton: {
    padding: 5,
  },
  folderHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4caf50',
  },
  folderItem: {
    fontSize: 16,
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  folderList: {
    marginBottom: 20,
  },
  penButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#4caf50',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  modalContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4caf50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4caf50',
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
    backgroundColor: '#388e3c',
    paddingVertical: 15,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeModal: {
    color: '#4caf50',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Community;
