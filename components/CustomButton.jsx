import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.button,
        containerStyles,
        isLoading && styles.disabled,
      ]}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={[styles.buttonText, textStyles]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',     // Position the button absolutely
    bottom: 50,               // Place it near the bottom
    width: '80%',
    borderRadius: 19,
    backgroundColor: "rgba(83, 177, 117, 1)",
    paddingVertical: 15,
  },
  buttonText: {
    color: "rgba(255, 249, 255, 1)",
    textAlign: "center",
    fontFamily: "ADLaM Display", // Custom font family
    fontSize: 18,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CustomButton;
