import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const ICON_SIZE = 24;

const TabIcon = ({ iconName, color, name, focused }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 2 }}>
      <Ionicons name={iconName} size={ICON_SIZE} color={color} />
      <Text style={{ color, fontSize: 12, fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular' }}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#4CAF50', // Active tab color
          tabBarInactiveTintColor: '#888888', // Darker color for inactive tabs
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#EDEDED',
            height: 70,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                iconName={focused ? 'home' : 'home-outline'}
                color={focused ? '#4CAF50' : color} // Adjusting color based on focus
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                iconName={focused ? 'search' : 'search-outline'}
                color={color}
                name="Explore"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="community"
          options={{
            title: 'Community',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                iconName={focused ? 'chatbubbles' : 'chatbubbles-outline'}
                color={color}
                name="Community"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="upload"
          options={{
            title: 'Upload',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                iconName={focused ? 'cloud-upload' : 'cloud-upload-outline'}
                color={color}
                name="Upload"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Account',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                iconName={focused ? 'person' : 'person-outline'}
                color={color}
                name="Account"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

      <StatusBar backgroundColor='#FFFFFF' style='dark' />
    </>
  );
};

export default TabsLayout;
