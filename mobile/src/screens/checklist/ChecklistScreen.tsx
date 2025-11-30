import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Checkbox, Button, Surface, Banner } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ChecklistScreen({ navigation }: any) {
  const [checklist, setChecklist] = React.useState([
    { id: '1', name: 'Vaccination Records', completed: true, selected: false },
    { id: '2', name: 'Microchip ID Verification', completed: true, selected: false },
    { id: '3', name: 'International Health Certificate', completed: true, selected: false },
    { id: '4', name: 'Import Permit', completed: true, selected: false },
  ]);

  const toggleItem = (id: string) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <MaterialCommunityIcons name="file-document" size={32} color="#EF4444" />
          <MaterialCommunityIcons name="paw" size={20} color="#EF4444" style={styles.pawIcon} />
        </View>
        <Text variant="headlineMedium" style={styles.title}>
          Fetch Files
        </Text>
      </View>

      {/* Compliance Checklist */}
      <Surface style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Compliance Checklist
        </Text>

        {/* Alert Banner */}
        <Banner
          visible={true}
          icon={() => <MaterialCommunityIcons name="alert" size={24} color="#FFFFFF" />}
          style={styles.alertBanner}
        >
          <Text variant="titleMedium" style={styles.alertText}>
            URGENT: Missing Travel Documents!
          </Text>
        </Banner>

        {/* Checklist Items */}
        <View style={styles.checklistContainer}>
          {checklist.map((item) => (
            <Card key={item.id} style={styles.checklistItem}>
              <Card.Content style={styles.checklistContent}>
                <View style={styles.checklistLeft}>
                  {item.completed && (
                    <MaterialCommunityIcons name="check-circle" size={24} color="#10B981" />
                  )}
                  <Text variant="titleMedium" style={styles.checklistText}>
                    {item.name}
                  </Text>
                </View>
                <Checkbox
                  status={item.selected ? 'checked' : 'unchecked'}
                  onPress={() => toggleItem(item.id)}
                />
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <Button
            mode="contained"
            icon="file-upload"
            style={[styles.actionButton, { backgroundColor: '#3B82F6' }]}
            onPress={() => {}}
          >
            Request E-Files
          </Button>
          <Button
            mode="contained"
            icon="calendar"
            style={[styles.actionButton, { backgroundColor: '#06B6D4' }]}
            onPress={() => {}}
          >
            Book Appointment
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
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerIcon: {
    position: 'relative',
    marginBottom: 12,
  },
  pawIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
  title: {
    fontWeight: 'bold',
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
    textAlign: 'center',
  },
  alertBanner: {
    backgroundColor: '#EF4444',
    marginBottom: 20,
    borderRadius: 8,
  },
  alertText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  checklistContainer: {
    marginBottom: 20,
  },
  checklistItem: {
    marginBottom: 12,
  },
  checklistContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checklistLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  checklistText: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
});
