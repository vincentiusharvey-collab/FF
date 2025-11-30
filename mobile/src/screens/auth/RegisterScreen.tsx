import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, Surface } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../../services/api';
import { setCredentials } from '../../store/slices/authSlice';

export default function RegisterScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();

  const handleRegister = async () => {
    try {
      const result = await register(formData).unwrap();
      dispatch(setCredentials(result.data));
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.surface}>
        <Text variant="headlineMedium" style={styles.title}>
          Create Account
        </Text>
        <TextInput
          label="First Name"
          value={formData.firstName}
          onChangeText={(text) => setFormData({ ...formData, firstName: text })}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Last Name"
          value={formData.lastName}
          onChangeText={(text) => setFormData({ ...formData, lastName: text })}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          label="Phone (Optional)"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          mode="outlined"
          keyboardType="phone-pad"
          style={styles.input}
        />
        <TextInput
          label="Password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />
        <Button
          mode="contained"
          onPress={handleRegister}
          loading={isLoading}
          style={styles.button}
        >
          Register
        </Button>
        <Button
          mode="text"
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
        >
          Already have an account? Login
        </Button>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  surface: {
    margin: 20,
    padding: 20,
    borderRadius: 12,
    elevation: 4,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});
