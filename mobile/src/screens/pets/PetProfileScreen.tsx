import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Card, Button, Divider, Chip, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useGetPetByIdQuery, useGetVaccinationsQuery, useGetMedicalRecordsQuery } from '../../services/api';

export default function PetProfileScreen({ navigation }: any) {
  const route = useRoute();
  const { petId } = route.params as any;

  const { data: petData } = useGetPetByIdQuery(petId);
  const { data: vaccinationsData } = useGetVaccinationsQuery(petId);
  const { data: medicalRecordsData } = useGetMedicalRecordsQuery(petId);

  const pet = petData?.data;
  const vaccinations = vaccinationsData?.data || [];
  const vaccinationStatus = vaccinations.length > 0 ? vaccinations[0].status : 'NOT_STARTED';

  if (!pet) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Pet Profile
        </Text>
        <MaterialCommunityIcons name="account-multiple" size={24} color="#6B7280" />
      </View>

      {/* Pet Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: pet.profileImage || 'https://via.placeholder.com/200' }}
          style={styles.petImage}
        />
      </View>

      {/* Health Snapshout */}
      <Surface style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Health Snapshout
        </Text>

        <Card style={styles.infoCard}>
          <Card.Content>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text variant="labelMedium" style={styles.label}>
                  Last Vet Visit:
                </Text>
                <Text variant="bodyLarge">Oct 26, 2023</Text>
              </View>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="check-circle" size={40} color="#10B981" />
              </View>
              <View style={styles.infoItem}>
                <Text variant="labelMedium" style={styles.label}>
                  Weight:
                </Text>
                <Text variant="bodyLarge">{pet.weight} {pet.weightUnit}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.infoCard}>
          <Card.Content>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text variant="labelMedium" style={styles.label}>
                  Vaccinations:
                </Text>
                <Text variant="bodyMedium">{vaccinationStatus.replace(/_/g, ' ')}</Text>
              </View>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="account-group" size={40} color="#10B981" />
              </View>
              <View style={styles.infoItem}>
                <Chip mode="outlined" style={styles.chip}>
                  {vaccinationStatus === 'UP_TO_DATE' ? 'Up to Date' : vaccinationStatus}
                </Chip>
                <Text variant="bodySmall">{vaccinations.length} {vaccinations.length === 1 ? 'opt' : 'opts'}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.buttonRow}>
          <Button
            mode="contained"
            icon="file-document"
            style={[styles.actionButton, { backgroundColor: '#10B981' }]}
            onPress={() => navigation.navigate('MedicalRecords', { petId })}
          >
            View All Records
          </Button>
          <Button
            mode="contained"
            icon="share"
            style={[styles.actionButton, { backgroundColor: '#3B82F6' }]}
            onPress={() => {}}
          >
            Share Medical Records
          </Button>
        </View>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  petImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  section: {
    margin: 20,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  infoCard: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoItem: {
    flex: 1,
  },
  iconContainer: {
    paddingHorizontal: 12,
  },
  label: {
    color: '#6B7280',
    marginBottom: 4,
  },
  chip: {
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
  },
});
