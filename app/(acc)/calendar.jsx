import { useUser } from '@clerk/clerk-expo';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';

const CalendarScreen = ({ navigation }) => {
  const [items, setItems] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [eventName, setEventName] = useState('');

  const loadItems = (day) => {
    setTimeout(() => {
      const newItems = { ...items };
      const strTime = timeToString(day.timestamp);
      if (!newItems[strTime]) {
        newItems[strTime] = [];
      }
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text>{item.name}</Text>
      </View>
    );
  };

  const addEvent = () => {
    if (!eventName || !selectedDate) return;

    const newItems = { ...items };
    if (!newItems[selectedDate]) {
      newItems[selectedDate] = [];
    }
    // Add the new event
    newItems[selectedDate].push({ name: eventName });
    
    // Update the items state
    setItems(newItems);
    setEventName('');  // Clear the input field
    setModalVisible(false); // Close the modal
  };

  const openModal = (date) => {
    setSelectedDate(date);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <>
        <Agenda
          items={items}
          loadItemsForMonth={loadItems}
          selected={new Date().toISOString().split('T')[0]}
          renderItem={renderItem}
          onDayPress={(day) => openModal(day.dateString)} // Open modal on date press
        />

        {/* Modal for adding new events */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <TextInput
              placeholder="Event Name"
              value={eventName}
              onChangeText={setEventName}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={addEvent} // Call addEvent on button press
            >
              <Text style={styles.buttonText}>Add Event</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </>
    </SafeAreaView>
  );
};

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const styles = StyleSheet.create({
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CalendarScreen;