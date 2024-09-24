import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Account({ navigation }) {

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} // Placeholder profile picture
          style={styles.profileImage}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>Varun Damle</Text>
          <Text style={styles.profilePhone}>+91-8080659456</Text>
        </View>
        <TouchableOpacity>
          <Icon name="edit" size={20} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Settings Options */}
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Details')}>
        <Icon name="person" size={24} color="#000" />
        <Text style={styles.menuText}>My Details</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('FarmLocation')}>
        <Icon name="place" size={24} color="#000" />
        <Text style={styles.menuText}>Farm Location</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Calendar')}>
        <Icon name="calendar-today" size={24} color="#000" />
        <Text style={styles.menuText}>Calendar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Notifications')}>
        <Icon name="notifications" size={24} color="#000" />
        <Text style={styles.menuText}>Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Help')}>
        <Icon name="help" size={24} color="#000" />
        <Text style={styles.menuText}>Help</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('About')}>
        <Icon name="info" size={24} color="#000" />
        <Text style={styles.menuText}>About</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Contributions')}>
        <Icon name="wifi" size={24} color="#000" />
        <Text style={styles.menuText}>Your Contributions</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => alert('Logged Out')}>
        <Icon name="logout" size={24} color="#fff" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profilePhone: {
    fontSize: 14,
    color: '#666',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  menuText: {
    marginLeft: 20,
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 10,
  },
  logoutText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
});