import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Animated, KeyboardAvoidingView, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello, Farmer! 👩‍🌾👨‍🌾\nI’m your virtual assistant, here to help you keep your crops and animals healthy. 🌾🌿\nWhether you’re worried about strange spots on your plants or your livestock showing unusual signs, I can assist in diagnosing potential diseases.', isBot: true }
  ]);
  const [input, setInput] = useState('');
  const scrollViewRef = useRef();
  const fadeAnim = useRef(new Animated.Value(0)).current; // For fade-in animation

  useEffect(() => {
    // Fade-in animation when bot messages appear
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isBot: false }]);
      setInput('');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView
        style={styles.messageContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {messages.map((message, index) => (
          <Animated.View key={index} style={{ opacity: fadeAnim }}>
            <View style={[styles.messageBubble, message.isBot ? styles.botMessage : styles.userMessage]}>
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          </Animated.View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <MaterialIcons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    maxWidth: Dimensions.get('window').width * 0.75,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  botMessage: {
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 20,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 20,
  },
});

export default Chatbot;