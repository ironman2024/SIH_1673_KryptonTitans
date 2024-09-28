import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Dimensions, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { GoogleGenerativeAI } from '@google/generative-ai';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiKey = 'AIzaSyCzVTZTdKLUrq_K80TANwfPmGHMBQ0yNqM'; // Secure this in your app

const AIChatbot = () => {
  const [messages, setMessages] = useState([]); // Start with an empty chat history
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef();
  const navigation = useNavigation();

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: `System Instructions for AI Chatbot...`,
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
  };

  const runAI = async (userInput) => {
    const chatSession = model.startChat({
      generationConfig,
      history: messages.map(msg => ({
        role: msg.role,
        parts: msg.parts,  // Ensure we use the parts array here
      })),
    });

    const result = await chatSession.sendMessage(userInput);
    return result.response.text();
  };

  const handleSend = async () => {
    if (input.trim()) {
      // Add user message to chat history
      const userMessage = {
        role: 'user',
        parts: [{ text: input }], // Wrap input in a parts array
        isBot: false,
      };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
  
      setIsTyping(true);
  
      // Call the AI to get the bot's response
      const botResponse = await runAI(input);
  
      // Remove '**' from the response
      const sanitizedResponse = botResponse.replace(/\*\*/g, '');
  
      // Add the sanitized response to chat history
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          parts: [{ text: sanitizedResponse }], // Ensure the bot response is in a parts array
          isBot: true,
        },
      ]);
  
      setIsTyping(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {/* Back Arrow as a rounded button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Messages Area */}
        <ScrollView
          style={styles.messageContainer}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 80 }}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          {messages.map((message, index) => (
            <View key={index} style={[styles.messageBubble, message.isBot ? styles.botMessage : styles.userMessage]}>
              <Text style={[styles.messageText, message.isBot ? styles.botMessageText : styles.userMessageText]}>
                {message.parts[0].text} {/* Display the message text from the parts array */}
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

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask about your crops or livestock..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <MaterialIcons name={input ? "send" : "mic"} size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    backgroundColor: '#D0EAD0',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#4CAF50',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: '#fff',
  },
  botMessageText: {
    color: '#333',
  },
  userMessageText: {
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
    backgroundColor: '#4CAF50',
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
    color: '#4CAF50',
    marginRight: 5,
  },
  dotContainer: {
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginHorizontal: 2,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    backgroundColor: '#D0EAD0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default AIChatbot;
