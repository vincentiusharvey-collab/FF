import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, SegmentedButtons } from 'react-native-paper';
import { useCreatePetMutation } from '../../services/api';

export default function AddPetScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'DOG',
    breed: '',
    gender: 'MALE',
    weight: '',
    weightUnit: 'lbs',
  });
  const [createPet, { isLoading }] = useCreatePetMutation();

  const handleSubmit = async () => {
    try {
      await createPet({
        ...formData,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
      }).unwrap();
      navigation.goBack();
    } catch (error) {
      console.error('Failed to create pet:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          label="Pet Name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          mode="outlined"
          style={styles.input}
        />

        <SegmentedButtons
          value={formData.type}
          onValueChange={(value) => setFormData({ ...formData, type: value })}
          buttons={[
            { value: 'DOG', label: 'Dog' },
            { value: 'CAT', label: 'Cat' },
            { value: 'OTHER', label: 'Other' },
          ]}
          style={styles.input}
        />

        <TextInput
          label="Breed"
          value={formData.breed}
          onChangeText={(text) => setFormData({ ...formData, breed: text })}
          mode="outlined"
          style={styles.input}
        />

        <SegmentedButtons
          value={formData.gender}
          onValueChange={(value) => setFormData({ ...formData, gender: value })}
          buttons={[
            { value: 'MALE', label: 'Male' },
            { value: 'FEMALE', label: 'Female' },
          ]}
          style={styles.input}
        />

        <View style={styles.weightRow}>
          <TextInput
            label="Weight"
            value={formData.weight}
            onChangeText={(text) => setFormData({ ...formData, weight: text })}
            mode="outlined"
            keyboardType="numeric"
            style={styles.weightInput}
          />
          <SegmentedButtons
            value={formData.weightUnit}
            onValueChange={(value) => setFormData({ ...formData, weightUnit: value })}
            buttons={[
              { value: 'lbs', label: 'lbs' },
              { value: 'kg', label: 'kg' },
            ]}
            style={styles.unitInput}
          />
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isLoading}
          style={styles.button}
        >
          Add Pet
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  form: {
    padding: 20,
  },
  input: {
    marginBottom: 16,
  },
  weightRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  weightInput: {
    flex: 2,
  },
  unitInput: {
    flex: 1,
  },
  button: {
    marginTop: 20,
  },
});
