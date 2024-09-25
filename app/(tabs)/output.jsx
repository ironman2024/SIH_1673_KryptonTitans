import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSearchParams } from 'expo-router';
import Tflite from 'tflite-react-native';

const OutputScreen = () => {
  const { result } = useSearchParams();
  const [formattedResult, setFormattedResult] = useState('');
  const [tflite, setTflite] = useState(null);

  useEffect(() => {
    // Load the TFLite model
    const loadModel = async () => {
      const model = new Tflite();
      await model.loadModel({
        model: 'path_to_your_model.tflite', // Ensure this is the correct path to your model
        numThreads: 1, // Number of threads for inference
      }, (error, res) => {
        if (error) {
          console.error('Error loading model: ', error);
        } else {
          setTflite(model);
        }
      });
    };

    loadModel();

    return () => {
      if (tflite) {
        tflite.close();
      }
    };
  }, []);

  useEffect(() => {
    const generateResultMessage = (modelResult) => {
      let message = '';
      if (typeof modelResult === 'number') {
        if (modelResult > 0.8) {
          message = 'The crop is highly likely to be diseased. Please take immediate action.';
        } else if (modelResult > 0.5) {
          message = 'There is a moderate chance that the crop is diseased. Consider further inspection.';
        } else {
          message = 'The crop seems to be healthy.';
        }
      } else if (typeof modelResult === 'string') {
        message = `The prediction suggests that the crop is affected by ${modelResult}.`;
      } else {
        message = 'Unable to determine the crop status. Please try again.';
      }
      return message;
    };

    if (result && tflite) {
      // Prepare your input (e.g., image or tensor) and call `runModel`
      tflite.runModel({
        path: 'path_to_your_image.jpg', // Example: path to an image or tensor
      }, (error, res) => {
        if (error) {
          console.error('Error running model: ', error);
        } else {
          const message = generateResultMessage(res);
          setFormattedResult(message);
        }
      });
    }
  }, [result, tflite]);

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
