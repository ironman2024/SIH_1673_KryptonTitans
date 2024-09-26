
import { View, Text, Image, ImageBackground, Pressable, StyleSheet } from 'react-native';

import React from 'react'


export default function LoginScreen() {
 
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

          <Pressable
   
        style={{
          padding:20,
          paddingHorizontal:100,
          marginTop:150,
          backgroundColor:'#53B175',
          width:'100%',
          borderRadius:14
           }}>
          <Text
          style={{
            fontSize:15,
            textAlign:'center',
            color:'white'
          }}>
            Get Started
          </Text>
        </Pressable>
        </View>
      </ImageBackground>
    </View>
  )
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
      marginBottom: 30,  // Space between logo and text
    },
    textContainer: {
      // marginBottom: 'auto', 
    },
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
      position: 'absolute',     
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
  });