import { View, Text, TouchableOpacity,ActivityIndicator } from 'react-native';
import React from 'react';
import { Link } from "expo-router";
import { useRouter } from 'expo-router';
import { useUser } from "@clerk/clerk-expo";
import { Redirect, useRootNavigationState } from "expo-router";
import { useEffect, useState } from "react";


const Index = () => {
  const { user, isLoaded } = useUser(); // Check if user info is loaded
  const rootNavigationState = useRootNavigationState();
  const [navLoaded, setNavLoaded] = useState(false);

  useEffect(() => {
    if (rootNavigationState.key) {
      setNavLoaded(true); // Set state when navigation is loaded
    }
  }, [rootNavigationState]);

  if (!isLoaded || !navLoaded) {
    // Show a loading indicator while navigation and user data are loading
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
     <View>
      {user ? (
        <Redirect href={'/(tabs)/home'} />
      ) : (
        <Redirect href={'/(auth)/LoginScreen'} />
      )}
    </View>
    </>
    
    
  );
};

export default Index;