import { View, Text, Image, ImageBackground, Pressable, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import React, { useCallback, useState } from 'react';

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  
  // State to track if the button has been pressed
  const [isPressed, setIsPressed] = useState(false);

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(auth)/LanguageSelection', { scheme: 'myapp' }),
      });

      if (createdSessionId) {
        // Handle successful session creation
      } else {
        // Handle signIn or signUp next steps such as MFA
      }

      // Change the button background color when the button is pressed
      setIsPressed(true);
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require('./../../assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.content}>
          {/* Logo */}
          <Image
            source={require('./../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Welcome Text */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Welcome{'\n'}to our app
            </Text>
            <Text style={styles.subtitle}>
              Cure your plants and increase production
            </Text>
          </View>

          {/* Get Started Button */}
          <Pressable
            onPress={onPress}
            style={[
              styles.button, 
              { backgroundColor: isPressed ? '#347928' : '#53B175' } // Changes color on press
            ]}
          >
            <Text
              style={styles.buttonText}
            >
              Get Started
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(252, 252, 252, 1)",
    flexDirection: "column",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 30,
  },
  textContainer: {},
  title: {
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    fontFamily: "ADLaM Display",
    fontSize: 40,
    lineHeight: 48,
    fontWeight: "400",
  },
  subtitle: {
    color: "rgba(252, 252, 252, 0.7)",
    textAlign: "center",
    fontFamily: "Actor",
    fontSize: 16,
    marginTop: 10,
  },
  button: {
    padding: 20,
    paddingHorizontal: 100,
    marginTop: 150,
    width: '100%',
    borderRadius: 14,
  },
  buttonText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
  },
});