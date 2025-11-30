import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, FAB, Avatar } from 'react-native-paper';
import { useGetPetsQuery } from '../../services/api';

export default function PetListScreen({ navigation }: any) {
  const { data: petsData, isLoading } = useGetPetsQuery({});
  const pets = petsData?.data || [];

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() => navigation.navigate('PetProfile', { petId: item.id })}
          >
            <Card.Content style={styles.cardContent}>
              <Avatar.Image size={64} source={{ uri: item.profileImage || 'https://via.placeholder.com/150' }} />
              <View style={styles.petInfo}>
                <Text variant="titleLarge">{item.name}</Text>
                <Text variant="bodyMedium">{item.type} • {item.breed}</Text>
                {item.weight && (
                  <Text variant="bodySmall">{item.weight} {item.weightUnit}</Text>
                )}
              </View>
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="bodyLarge">No pets found. Add your first pet!</Text>
          </View>
        }
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AddPet')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  card: {
    margin: 12,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  petInfo: {
    flex: 1,
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
