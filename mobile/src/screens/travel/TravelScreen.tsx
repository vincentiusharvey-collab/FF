import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Card, TextInput, Button, Surface, Banner, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

export default function TravelScreen({ navigation }: any) {
  const [destination, setDestination] = React.useState('');
  const [travelMode, setTravelMode] = React.useState('IN_CABIN');

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialCommunityIcons name="paw" size={32} color="#FFFFFF" />
        <Text variant="headlineSmall" style={styles.headerText}>
          Fetch Files
        </Text>
        <MaterialCommunityIcons name="bell-outline" size={24} color="#FFFFFF" />
      </View>

      <View style={styles.content}>
        {/* Travel Planner Hub */}
        <Text variant="headlineMedium" style={styles.title}>
          Travel Planner Hub
        </Text>

        <Surface style={styles.plannerCard}>
          <Text variant="titleLarge" style={styles.cardTitle}>
            Plan a Trip
          </Text>

          <TextInput
            label="Destination"
            value={destination}
            onChangeText={setDestination}
            mode="outlined"
            right={<TextInput.Icon icon="airplane" />}
            style={styles.input}
          />

          <Text variant="labelLarge" style={styles.sectionLabel}>
            Dates
          </Text>
          <TextInput
            label="Travel Mode"
            value={travelMode}
            mode="outlined"
            right={<TextInput.Icon icon="calendar" />}
            style={styles.input}
          />

          <Text variant="labelLarge" style={styles.sectionLabel}>
            Travel Mode
          </Text>

          <Text variant="labelLarge" style={styles.sectionLabel}>
            Pet Travel Type
          </Text>

          <Text variant="labelLarge" style={styles.sectionLabel}>
            Petfavel Motus
          </Text>

          <View style={styles.modeChips}>
            <Chip mode={travelMode === 'IN_CABIN' ? 'flat' : 'outlined'} icon="seat-passenger">
              In-cabin
            </Chip>
            <Chip mode={travelMode === 'CARGO' ? 'flat' : 'outlined'}>Cario</Chip>
            <Chip mode={travelMode === 'CAR_SEAT' ? 'flat' : 'outlined'}>Cargo</Chip>
            <Chip mode={travelMode === 'CRATE' ? 'flat' : 'outlined'}>Car seat</Chip>
          </View>

          {/* Critical Alert */}
          <Banner
            visible={true}
            icon={() => <MaterialCommunityIcons name="alert" size={24} color="#EF4444" />}
            style={styles.alert}
          >
            <View>
              <Text variant="titleMedium" style={styles.alertTitle}>
                Critical Alert:
              </Text>
              <Text variant="bodyMedium" style={styles.alertText}>
                Vaccination Booster Due for Bella!
              </Text>
              <Text variant="bodySmall" style={styles.alertSubtext}>
                Travel might be restritec.
              </Text>
              <Button mode="text" textColor="#EF4444" style={styles.alertButton}>
                Schedule now
              </Button>
            </View>
          </Banner>
        </Surface>

        {/* QR Pet ID Card */}
        <Surface style={styles.qrCard}>
          <Text variant="titleLarge" style={styles.cardTitle}>
            QR Pet ID Card
          </Text>
          <View style={styles.qrContainer}>
            <QRCode value="pet-id-12345" size={150} />
            <MaterialCommunityIcons
              name="check-circle"
              size={32}
              color="#10B981"
              style={styles.qrCheck}
            />
          </View>
          <Text variant="bodyMedium" style={styles.qrText}>
            Scan for Bella's ID
          </Text>

          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.petThumb}
          />
          <Text variant="titleMedium">Bella</Text>
        </Surface>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#1F2937',
  },
  headerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: '#FFFFFF',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  plannerCard: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  cardTitle: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  sectionLabel: {
    marginTop: 12,
    marginBottom: 8,
  },
  input: {
    marginBottom: 12,
  },
  modeChips: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginVertical: 12,
  },
  alert: {
    marginTop: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#EF4444',
  },
  alertTitle: {
    color: '#EF4444',
    fontWeight: 'bold',
  },
  alertText: {
    marginTop: 4,
  },
  alertSubtext: {
    color: '#6B7280',
    marginTop: 2,
  },
  alertButton: {
    marginTop: 8,
  },
  qrCard: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  qrContainer: {
    position: 'relative',
    marginVertical: 16,
  },
  qrCheck: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -16 }, { translateY: -16 }],
  },
  qrText: {
    marginTop: 12,
    marginBottom: 16,
  },
  petThumb: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 12,
  },
});
