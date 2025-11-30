import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/home/HomeScreen';
import PetsNavigator from './PetsNavigator';
import ChecklistScreen from '../screens/checklist/ChecklistScreen';
import TravelScreen from '../screens/travel/TravelScreen';
import TasksScreen from '../screens/tasks/TasksScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Pets':
              iconName = focused ? 'paw' : 'paw-outline';
              break;
            case 'Checklist':
              iconName = focused ? 'clipboard-check' : 'clipboard-check-outline';
              break;
            case 'Travel':
              iconName = focused ? 'airplane' : 'airplane-outline';
              break;
            case 'Tasks':
              iconName = focused ? 'format-list-checks' : 'format-list-checks';
              break;
            case 'Settings':
              iconName = focused ? 'cog' : 'cog-outline';
              break;
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#9CA3AF',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Pets" component={PetsNavigator} />
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Checklist" component={ChecklistScreen} />
      <Tab.Screen name="Travel" component={TravelScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
