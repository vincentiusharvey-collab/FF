import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Avatar, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGetPetsQuery, useGetAppointmentsQuery, useGetCareTasksQuery } from '../../services/api';

export default function HomeScreen({ navigation }: any) {
  const { data: petsData } = useGetPetsQuery({});
  const { data: appointmentsData } = useGetAppointmentsQuery({});
  const { data: careTasksData } = useGetCareTasksQuery({});

  const pets = petsData?.data || [];
  const upcomingAppointments = appointmentsData?.data?.filter(
    (a: any) => new Date(a.scheduledDate) >= new Date() && a.status !== 'CANCELLED'
  ).slice(0, 3) || [];
  const pendingTasks = careTasksData?.data?.filter((t: any) => t.status === 'PENDING').slice(0, 5) || [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.greeting}>
          Hello! 👋
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Here's what's happening with your pets today
        </Text>
      </View>

      {/* My Pets Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge">My Pets</Text>
          <Button mode="text" onPress={() => navigation.navigate('Pets')}>
            View All
          </Button>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {pets.map((pet: any) => (
            <Card key={pet.id} style={styles.petCard} onPress={() => navigation.navigate('Pets', { screen: 'PetProfile', params: { petId: pet.id } })}>
              <Card.Content style={styles.petCardContent}>
                <Avatar.Image size={64} source={{ uri: pet.profileImage || 'https://via.placeholder.com/150' }} />
                <Text variant="titleMedium" style={styles.petName}>{pet.name}</Text>
                <Text variant="bodySmall">{pet.type}</Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </View>

      {/* Upcoming Appointments */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge">Upcoming Appointments</Text>
        </View>
        {upcomingAppointments.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Card.Content>
              <Text>No upcoming appointments</Text>
            </Card.Content>
          </Card>
        ) : (
          upcomingAppointments.map((appointment: any) => (
            <Card key={appointment.id} style={styles.card}>
              <Card.Content>
                <View style={styles.appointmentRow}>
                  <MaterialCommunityIcons name="calendar-clock" size={24} color="#10B981" />
                  <View style={styles.appointmentDetails}>
                    <Text variant="titleMedium">{appointment.type.replace(/_/g, ' ')}</Text>
                    <Text variant="bodySmall">{new Date(appointment.scheduledDate).toLocaleDateString()}</Text>
                  </View>
                  <Chip mode="outlined">{appointment.status}</Chip>
                </View>
              </Card.Content>
            </Card>
          ))
        )}
      </View>

      {/* Pending Tasks */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge">Today's Tasks</Text>
        </View>
        {pendingTasks.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Card.Content>
              <Text>No pending tasks</Text>
            </Card.Content>
          </Card>
        ) : (
          pendingTasks.map((task: any) => (
            <Card key={task.id} style={styles.card}>
              <Card.Content>
                <View style={styles.taskRow}>
                  <MaterialCommunityIcons name="check-circle-outline" size={24} color="#6B7280" />
                  <View style={styles.taskDetails}>
                    <Text variant="titleMedium">{task.title}</Text>
                    <Text variant="bodySmall">{task.scheduledTime}</Text>
                  </View>
                  <Chip mode="outlined" textStyle={{ fontSize: 10 }}>{task.priority}</Chip>
                </View>
              </Card.Content>
            </Card>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  greeting: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6B7280',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  petCard: {
    marginRight: 12,
    width: 120,
  },
  petCardContent: {
    alignItems: 'center',
    padding: 12,
  },
  petName: {
    marginTop: 8,
  },
  card: {
    marginBottom: 12,
  },
  emptyCard: {
    backgroundColor: '#F3F4F6',
  },
  appointmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  appointmentDetails: {
    flex: 1,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  taskDetails: {
    flex: 1,
  },
});
