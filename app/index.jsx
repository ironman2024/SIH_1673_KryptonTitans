import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/home');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <TouchableOpacity onPress={handleRedirect}>
        <Text style={{ color: 'blue', fontSize: 18, textAlign: 'center', textDecorationLine: 'underline' }}>
          Go to home
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
