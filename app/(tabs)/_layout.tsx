import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from "expo-router";
import React from 'react';

export default function TabsLayout() {
  return (
  <Tabs screenOptions={{ headerStyle: { backgroundColor: "#f5f5f5" }, 
  headerShadowVisible: false, 
  tabBarStyle: { 
    backgroundColor: "#f5f5f5",
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
   },
    tabBarActiveTintColor: "#6200ee",
    tabBarInactiveTintColor: "#666666",
   }}
   >
    <Tabs.Screen 
    name="index" 
    options={{ title : "Today's Habits", 
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons 
          name="calendar-today" 
          size= {size} 
          color={color}  
        />
      ),
     }}
     />

     <Tabs.Screen 
    name="streaks" 
    options={{ title : "Streaks", 
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons 
          name="chart-line" 
          size= {size} 
          color={color}  
        />
      ),
     }}
     />
     <Tabs.Screen 
    name="add-habit" 
    options={{ title : "Add Habit", 
      tabBarIcon: ({ color, size }) => (

        <MaterialCommunityIcons 
          name="plus-circle" 
          size= {size} 
          color={color}  
        />
      ),
     }}
     />
    <Tabs.Screen 
    name="map" 
    options={{ title : "Map", 
      tabBarIcon: ({ color, size }) => (
        <Entypo 
        name="map" 
        size={size} 
        color={color} />
        
      ),
     }}
     />
  </Tabs>
  );
}