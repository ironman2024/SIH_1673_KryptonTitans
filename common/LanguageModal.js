import { View, Text, Modal, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image, } from 'react-native';
import React, { useState } from 'react';
const { height, width } = Dimensions.get('window');

const LanguageModal = ({ langModalVisible, setLangModalVisible, onSelectLang }) => {
  const [selectedLang, setSelectedLang] = useState(0);
  const [languages, setLanguages] = useState([
    { name: 'English', selected: true },
    { name: 'हिन्दी', selected: false },
  ]);

  const onSelect = (index) => {
    const updatedLanguages = languages.map((item, ind) => ({
      ...item,
      selected: index === ind,
    }));

    setSelectedLang(index);
    setLanguages(updatedLanguages);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={langModalVisible}
      onRequestClose={() => setLangModalVisible(!langModalVisible)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Select Language</Text>
          <View style={{ width: '100%' }}>
            <FlatList
              data={languages}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[
                    styles.languageItem,
                    { borderColor: item.selected ? 'blue' : 'black' },
                  ]}
                  onPress={() => onSelect(index)}
                >
                  <Image
                    source={item.selected
                      ? require('../assets/images/selected.png')
                      : require('../assets/images/non_selected.png')}
                    style={[styles.icon, { tintColor: item.selected ? 'blue' : 'black' }]}
                  />
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 18,
                      color: item.selected ? 'blue' : 'black',
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={styles.btns}>
            <TouchableOpacity
              style={styles.btn1}
              onPress={() => setLangModalVisible(false)}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn2}
              onPress={() => {
                setLangModalVisible(false);
                onSelectLang(selectedLang); // Pass the selected language to the parent
              }}
            >
              <Text style={{ color: '#fff' }}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LanguageModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  modalView: {
    margin: 20,
    width: width - 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  languageItem: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    marginTop: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  btns: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  btn1: {
    width: '40%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn2: {
    width: '40%',
    height: 50,
    backgroundColor: '#4B68E9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Rounded border added
  },
});
