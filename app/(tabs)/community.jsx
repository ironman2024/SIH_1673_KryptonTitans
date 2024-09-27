import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getStorage, ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';
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
  const [posts, setPosts] = useState([]); // Now storing post data (image + title)
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [textContent, setTextContent] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch the posts with images and titles from Firebase storage
  const fetchPosts = async () => {
    const storageRef = ref(storage, '/');
    try {
      const result = await listAll(storageRef);
      const postData = await Promise.all(
        result.prefixes.map(async (folderRef) => {
          try {
            // List all files in the folder
            const folderContents = await listAll(ref(storage, folderRef.fullPath));
  
            // Find the first image file (e.g., .jpg, .png)
            const imageFile = folderContents.items.find(item => {
              return item.name.endsWith('.jpg') || item.name.endsWith('.png') || item.name.endsWith('.jpeg');
            });
  
            if (imageFile) {
              // Get the download URL of the found image
              const imageUrl = await getDownloadURL(imageFile);
              return {
                title: folderRef.name, // Use folder name as the title
                imageUrl, // Fetched image URL
              };
            } else {
              console.warn(`No image found in folder: ${folderRef.name}`);
              return null; // No image found in the folder, return null
            }
          } catch (error) {
            console.error(`Error processing folder ${folderRef.name}:`, error);
            return null; // Return null in case of any error
          }
        })
      );
      
      // Filter out null values (folders without images)
      const validPosts = postData.filter(post => post !== null);
      
      setPosts(validPosts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const handleImageChange = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
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
        const blob = await response.blob();
        const imageRef = ref(folderRef, image.fileName);
        await uploadBytes(imageRef, blob);
        
        const textBlob = new Blob([textContent], { type: 'text/plain' });
        const textRef = ref(folderRef, 'text_content.txt');
        await uploadBytes(textRef, textBlob);
        
        Alert.alert("Upload Successful", "Your image and text have been uploaded.");
        setImage(null);
        setTextContent('');
        setTitle('');
        setModalVisible(false);
        fetchPosts();
      } catch (error) {
        console.error("Error uploading:", error);
        Alert.alert("Upload Failed", "There was an issue uploading your content.");
      }
    } else {
      Alert.alert("Please fill all fields and select an image.");
    }
  };

  const handlePostPress = (title) => {
    router.push({
      pathname: '/content',
      params: { folder: title },
    });
  };

  // Filter posts based on search input
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
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

        {/* Display Posts */}
        <Text style={styles.folderHeader}>Community Posts</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={filteredPosts}
            keyExtractor={post => post.title}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePostPress(item.title)}>
                <View style={styles.postContainer}>
                  <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
                  <Text style={styles.postTitle}>{item.title}</Text>
                </View>
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
            placeholder="Enter title for post"
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
  postContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  postImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  folderList: {
    paddingBottom: 100,
  },
  penButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#4caf50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: '#000',
  },
  textArea: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    color: '#000',
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  uploadButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  uploadButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  closeModal: {
    textAlign: 'center',
    color: '#4caf50',
    marginTop: 20,
  },
  imagePreview: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  imageName: {
    marginTop: 10,
    fontSize: 14,
    color: '#888',
  },
});

export default Community;
