import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Avatar, Chip, Button, Surface, FAB } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGetCareTasksQuery } from '../../services/api';

export default function TasksScreen({ navigation }: any) {
  const { data: tasksData, refetch } = useGetCareTasksQuery({});

  const tasks = [
    {
      id: '1',
      name: 'Give Morning Meds',
      assignee: { name: 'Sarah', avatar: 'https://via.placeholder.com/40' },
      status: 'Completed',
      dosage: 'Give - Amoxicilin',
      time: '8:00 AM',
      priority: 'high',
      icon: 'pill',
    },
    {
      id: '2',
      name: 'Evening Walk',
      dosage: '2 pills - Amoxicilin',
      time: '30 min',
      status: 'Pending',
      icon: 'walk',
    },
    {
      id: '3',
      name: 'Full Bowl - Dry Food',
      time: 'Pending',
      status: 'Pending',
      icon: 'food',
      priority: 'medium',
    },
    {
      id: '4',
      name: 'Insulin Shot',
      dosage: '2 units',
      time: '7:00 AM',
      status: 'Overdue',
      icon: 'needle',
      priority: 'urgent',
    },
    {
      id: '5',
      name: 'Assiggse/ Stails',
      dosage: '2 units',
      time: '9:00 PM',
      status: 'Pending',
      icon: 'home',
      priority: 'high',
    },
  ];

  const assignees = [
    { name: 'Sarah', avatar: 'https://via.placeholder.com/40' },
    { name: 'Tom', avatar: 'https://via.placeholder.com/40' },
    { name: 'Emily', avatar: 'https://via.placeholder.com/40' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return '#EF4444';
      case 'high':
        return '#F59E0B';
      case 'medium':
        return '#3B82F6';
      default:
        return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return '#10B981';
      case 'Overdue':
        return '#EF4444';
      default:
        return '#F59E0B';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
          <View style={styles.headerTitle}>
            <MaterialCommunityIcons name="paw" size={24} color="#000" />
            <Text variant="headlineSmall" style={styles.title}>
              Fetch Files
            </Text>
            <MaterialCommunityIcons name="paw" size={24} color="#000" />
          </View>
        </View>

        <Surface style={styles.section}>
          <Text variant="headlineMedium" style={styles.sectionTitle}>
            Medication & Care Tasks
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Delegation & Tracking
          </Text>

          {/* Assignees */}
          <View style={styles.assigneesContainer}>
            <Text variant="titleMedium" style={styles.label}>
              Task Name
            </Text>
            <View style={styles.assignees}>
              {assignees.map((assignee, index) => (
                <Avatar.Image
                  key={index}
                  size={40}
                  source={{ uri: assignee.avatar }}
                  style={styles.avatar}
                />
              ))}
            </View>
          </View>

          {/* Tasks List */}
          <View style={styles.tasksList}>
            {tasks.map((task) => (
              <Card key={task.id} style={styles.taskCard}>
                <Card.Content>
                  <View style={styles.taskHeader}>
                    <View style={styles.taskLeft}>
                      {task.assignee && (
                        <Avatar.Image size={32} source={{ uri: task.assignee.avatar }} />
                      )}
                      <Text variant="titleMedium">{task.name}</Text>
                    </View>
                    <View style={styles.taskRight}>
                      <Chip
                        mode="outlined"
                        textStyle={{ color: getStatusColor(task.status) }}
                        style={{ borderColor: getStatusColor(task.status) }}
                      >
                        {task.status}
                      </Chip>
                    </View>
                  </View>

                  <View style={styles.taskDetails}>
                    <View style={styles.taskDetailRow}>
                      <Text variant="labelMedium" style={styles.detailLabel}>
                        Dosage/Details
                      </Text>
                      <Text variant="labelMedium" style={styles.detailLabel}>
                        {task.status === 'Overdue' ? 'Due Time' : ''}
                      </Text>
                    </View>
                    <View style={styles.taskDetailRow}>
                      <View style={styles.dosageContainer}>
                        <MaterialCommunityIcons
                          name={task.icon as any}
                          size={20}
                          color="#3B82F6"
                        />
                        <Text variant="bodyMedium">{task.dosage || task.name}</Text>
                      </View>
                      <View style={styles.timeContainer}>
                        {task.priority && (
                          <MaterialCommunityIcons
                            name="clock-alert"
                            size={20}
                            color={getPriorityColor(task.priority)}
                          />
                        )}
                        <Text variant="bodyMedium">{task.time}</Text>
                        {task.status === 'Completed' && (
                          <Chip
                            mode="outlined"
                            textStyle={{ color: '#10B981', fontSize: 10 }}
                            style={{ borderColor: '#10B981' }}
                          >
                            Completed
                          </Chip>
                        )}
                        {task.status === 'Pending' && task.priority === 'medium' && (
                          <Chip
                            mode="outlined"
                            textStyle={{ color: '#F59E0B', fontSize: 10 }}
                            style={{ borderColor: '#F59E0B' }}
                          >
                            Oendug
                          </Chip>
                        )}
                        {task.status === 'Overdue' && (
                          <Chip
                            mode="outlined"
                            textStyle={{ color: '#EF4444', fontSize: 10 }}
                            style={{ borderColor: '#EF4444' }}
                          >
                            Overdue
                          </Chip>
                        )}
                      </View>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </View>

          {/* Add New Task Button */}
          <Button
            mode="contained"
            icon="plus"
            style={styles.addButton}
            onPress={() => {}}
          >
            Add New Task
          </Button>
        </Surface>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
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
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#6B7280',
    marginBottom: 16,
  },
  assigneesContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  assignees: {
    flexDirection: 'row',
    gap: 8,
  },
  avatar: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  tasksList: {
    marginTop: 16,
  },
  taskCard: {
    marginBottom: 12,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  taskRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskDetails: {
    marginTop: 8,
  },
  taskDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    color: '#6B7280',
  },
  dosageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#1F2937',
  },
});
