import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(true); // For typing indicator
  const scrollViewRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { text: 'Hello, Farmer! 👩‍🌾👨‍🌾\nI’m your virtual assistant, here to help you keep your crops and animals healthy. 🌾🌿\nWhether you’re worried about strange spots on your plants or your livestock showing unusual signs, I can assist in diagnosing potential diseases.',
          isBot: true }
      ]);
    }, 2000); // Simulate a typing delay

    return () => clearTimeout(timer);
  }, []);

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
          <View key={index} style={[styles.messageBubble, message.isBot ? styles.botMessage : styles.userMessage]}>
            <Text style={[styles.messageText, message.isBot ? styles.botMessageText : styles.userMessageText]}>
              {message.text}
            </Text>
          </View>
        ))}
        {isTyping && (
          <View style={styles.typingIndicator}>
            <Text style={styles.typingText}>Typing</Text>
            <View style={styles.dotContainer}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <MaterialIcons name={input ? "send" : "mic"} size={24} color="white" />
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
    backgroundColor: '#D0EAD0', // Lighter green for bot message
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#4CAF50', // User message background
    alignSelf: 'flex-end',
  },
  messageText: {
    color: '#fff', // Default text color for user messages
  },
  botMessageText: {
    color: '#333', // Dark text for better visibility in bot messages
  },
  userMessageText: {
    color: '#fff', // Text color for user messages
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
    backgroundColor: '#4CAF50', // Send button color
    padding: 10,
    borderRadius: 20,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  typingText: {
    fontSize: 14,
    color: '#4CAF50', // Typing text color
    marginRight: 5,
  },
  dotContainer: {
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50', // Dot color
    marginHorizontal: 2,
  },
});

export default Chatbot;
