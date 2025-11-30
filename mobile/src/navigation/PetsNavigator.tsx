import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PetListScreen from '../screens/pets/PetListScreen';
import PetProfileScreen from '../screens/pets/PetProfileScreen';
import AddPetScreen from '../screens/pets/AddPetScreen';
import MedicalRecordsScreen from '../screens/pets/MedicalRecordsScreen';

const Stack = createStackNavigator();

export default function PetsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PetList"
        component={PetListScreen}
        options={{ title: 'My Pets' }}
      />
      <Stack.Screen
        name="PetProfile"
        component={PetProfileScreen}
        options={{ title: 'Pet Profile' }}
      />
      <Stack.Screen
        name="AddPet"
        component={AddPetScreen}
        options={{ title: 'Add Pet' }}
      />
      <Stack.Screen
        name="MedicalRecords"
        component={MedicalRecordsScreen}
        options={{ title: 'Medical Records' }}
      />
    </Stack.Navigator>
  );
}
