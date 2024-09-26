import React from 'react';
import { View, Text } from 'react-native';

const OutputScreen = ({ route }) => {
  const { result } = route.params;

  return (
    <View>
      <Text>Inference Result: {result}</Text>
    </View>
  );
};

export default OutputScreen;
