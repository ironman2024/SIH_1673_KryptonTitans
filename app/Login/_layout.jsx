import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function _layout() {
  return (
    <>
     <Stack>
        <Stack.Screen name="LoginScreen"
    options={{headerShown:false}}/>
     <Stack.Screen name="LanguageSelection"
    options={{headerShown:false}}/>
    </Stack>
    <StatusBar style="dark"/>
    </>
   
    
  )
}