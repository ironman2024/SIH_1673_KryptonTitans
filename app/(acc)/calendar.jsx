import React, { useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Import the useRouter hook

const CalendarScreen = () => {
  const [items, setItems] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [eventName, setEventName] = useState('');
  const inputRef = useRef(null);
  const router = useRouter(); // Initialize the router

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const loadItems = useCallback((day) => {
    const newItems = { ...items };
    const strTime = timeToString(day.timestamp);
    if (!newItems[strTime]) {
      newItems[strTime] = [];
    }
    setItems(newItems);
  }, [items]);

  const renderItem = useCallback((item) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
    </View>
  ), []);

  const addEvent = () => {
    if (!eventName.trim()) {
      Alert.alert('Invalid Input', 'Please enter a valid event name.');
      return;
    }
    if (!selectedDate) {
      Alert.alert('Invalid Date', 'Please select a valid date.');
      return;
    }

    const newItems = { ...items };
    if (!newItems[selectedDate]) {
      newItems[selectedDate] = [];
    }
    newItems[selectedDate].push({ name: eventName });
    setItems(newItems);
    setEventName('');
    setModalVisible(false);
  };

  const getFilteredItems = useCallback(() => {
    const filteredItems = {};
    Object.keys(items).forEach((key) => {
      if (items[key].length > 0) {
        filteredItems[key] = items[key];
      }
    });
    return filteredItems;
  }, [items]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calendar</Text>
      </View>

      {/* Agenda */}
      <Agenda
        items={getFilteredItems()}
        loadItemsForMonth={loadItems}
        selected={new Date().toISOString().split('T')[0]}
        renderItem={renderItem}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        renderEmptyData={() => <View style={styles.emptyDate}><Text>No Events</Text></View>}
        theme={{
          selectedDayBackgroundColor: '#4CAF50',
          dotColor: '#4CAF50',
          todayTextColor: '#4CAF50',
        }}
      />

      {/* Add Event Button */}
      <TouchableOpacity
        style={styles.addEventButton}
        onPress={() => {
          setModalVisible(true);
          setTimeout(() => inputRef.current?.focus(), 300);
        }}
        accessibilityLabel="Add Event Button"
      >
        <Text style={styles.addEventButtonText}>Add Event for {selectedDate || "Select a Date"}</Text>
      </TouchableOpacity>

      {/* Go Back Button (Navigates to Account screen) */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/(tabs)/account')} // Use router to navigate to account screen
        accessibilityLabel="Go Back"
      >
        <Ionicons name="arrow-back" size={24} color="white" style={styles.backButtonIcon} />
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>

      {/* Modal for Adding Event */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add New Event</Text>
            <TextInput
              ref={inputRef}
              placeholder="Event Name"
              value={eventName}
              onChangeText={setEventName}
              style={styles.input}
              testID="eventNameInput"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={addEvent}
                accessibilityLabel="Add Event"
              >
                <Text style={styles.buttonText}>Add Event</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
                accessibilityLabel="Cancel Button"
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#4CAF50',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  addEventButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    margin: 16,
  },
  addEventButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
  backButtonIcon: {
    marginRight: 8,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyDate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
});

export default CalendarScreen;
