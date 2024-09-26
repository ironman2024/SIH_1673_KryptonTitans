import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name='help'
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='calendar'
          options={{
            headerShown: false
          }}  
        />
        <Stack.Screen
          name='about'
          options={{
            headerShown: false
          }}  
        />
      </Stack>

      <StatusBar style='dark'/>
    </>
  )
}

export default AuthLayout