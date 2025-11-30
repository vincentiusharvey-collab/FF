import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, FAB, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useGetMedicalRecordsQuery } from '../../services/api';

export default function MedicalRecordsScreen() {
  const route = useRoute();
  const { petId } = route.params as any;
  const { data: recordsData } = useGetMedicalRecordsQuery(petId);

  const records = recordsData?.data || [];

  return (
    <View style={styles.container}>
      <FlatList
        data={records}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.recordHeader}>
                <MaterialCommunityIcons
                  name={getRecordIcon(item.type)}
                  size={32}
                  color="#10B981"
                />
                <View style={styles.recordInfo}>
                  <Text variant="titleMedium">{item.title}</Text>
                  <Text variant="bodySmall">
                    {new Date(item.date).toLocaleDateString()}
                  </Text>
                </View>
                <Chip mode="outlined">{item.type}</Chip>
              </View>
              {item.description && (
                <Text variant="bodyMedium" style={styles.description}>
                  {item.description}
                </Text>
              )}
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="bodyLarge">No medical records found</Text>
          </View>
        }
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {}}
      />
    </View>
  );
}

function getRecordIcon(type: string) {
  switch (type) {
    case 'VACCINATION':
      return 'needle';
    case 'LAB_RESULT':
      return 'test-tube';
    case 'PRESCRIPTION':
      return 'pill';
    case 'VISIT_SUMMARY':
      return 'file-document';
    default:
      return 'file';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  card: {
    margin: 12,
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  recordInfo: {
    flex: 1,
  },
  description: {
    marginTop: 12,
    color: '#6B7280',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#10B981',
  },
});
