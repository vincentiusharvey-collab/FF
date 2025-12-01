import React, { useEffect } from 'react';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import { theme } from './src/theme';
import { setCredentials } from './src/store/slices/authSlice';
import { setPets } from './src/store/slices/petsSlice';
import { setAppointments } from './src/store/slices/appointmentsSlice';
import { mockUser, mockTokens, mockPets, mockAppointments } from './src/services/mockData';

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Auto-login with mock data for demo
    dispatch(setCredentials({ user: mockUser, tokens: mockTokens }));
    dispatch(setPets(mockPets));
    dispatch(setAppointments(mockAppointments));
  }, [dispatch]);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <AppContent />
      </PaperProvider>
    </ReduxProvider>
  );
}
