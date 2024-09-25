import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSearchParams } from 'expo-router';

const OutputScreen = () => {
  const { result } = useSearchParams(); // Retrieve result from params
  const [formattedResult, setFormattedResult] = useState('');

  useEffect(() => {
    // Assume the result is a probability or class index from the model.
    // You can replace this part with actual mapping logic based on your model's output.
    const generateResultMessage = (modelResult) => {
      let message = '';

      if (typeof modelResult === 'number') {
        // For demonstration, let's assume the model returns a probability or class index:
        if (modelResult > 0.8) {
          message = 'The crop is highly likely to be diseased. Please take immediate action.';
        } else if (modelResult > 0.5) {
          message = 'There is a moderate chance that the crop is diseased. Consider further inspection.';
        } else {
          message = 'The crop seems to be healthy.';
        }
      } else if (typeof modelResult === 'string') {
        // If the result is a string (like a disease name), handle it here.
        message = `The prediction suggests that the crop is affected by ${modelResult}.`;
      } else {
        message = 'Unable to determine the crop status. Please try again.';
      }

      return message;
    };

    if (result) {
      const message = generateResultMessage(result);
      setFormattedResult(message); // Set the grammatically correct message
    }
  }, [result]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Prediction Result</Text>
        <Text style={styles.resultText}>{formattedResult}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    color: '#4CAF50',
    textAlign: 'center',
  },
});

export default OutputScreen;
