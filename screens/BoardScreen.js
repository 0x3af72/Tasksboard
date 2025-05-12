import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import uuid from 'react-native-uuid';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { saveTasks, loadTasks } from '../storage/Tasks';
import Task from '../components/Task';

const BoardScreen = () => {

  const titles = {
    "INCOMPLETE": "Incomplete tasks 📋",
    "INPROGRESS": "In Progress 🔨",
    "COMPLETED": "Completed tasks ✅"
  };

  const route = useRoute();
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const { status } = route.params;

  useEffect(() => {
    const fetchTasks = async () => {
      const loadedTasks = await loadTasks();
      setTasks(loadedTasks);
    }
    fetchTasks();
  });

  const addTask = (title, description) => {

    const newTask = {
      title: title,
      description: description,
      status: 'INCOMPLETE',
    };

    const updatedTasks = { ...tasks };
    updatedTasks[uuid.v4()] = newTask;
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.title}>{titles[status]}</Text>
          { status === 'INCOMPLETE' &&
            <TouchableOpacity
              style={styles.addButton}
              onPress={() =>
                navigation.navigate('NewTask', {
                  onAddTask: addTask,
                })
              }
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          }
        </View>

        <View style={styles.line} />

        <ScrollView>
          {Object.entries(tasks)
            .filter(([id, task]) => task.status === status)
            .map(([id, task], index) => (
              <Task
                key={id}
                title={task.title}
                description={task.description}
                status={task.status}
                startedAt={task.startedAt} 
                completedAt={task.completedAt} 
                onStatusChange={(status) => {

                  const updatedTasks = { ...tasks };
                  
                  if (status !== 'DELETE') {
                    const thisTask = { ...task, status };
                    if (status === 'INPROGRESS') {
                      thisTask.startedAt = Date.now();
                    } else if (status === 'COMPLETED') {
                      thisTask.completedAt = Date.now();
                    }
                    updatedTasks[id] = thisTask;
                  } else {
                    delete updatedTasks[id];
                  }

                  setTasks(updatedTasks);
                  saveTasks(updatedTasks);
                }}
              />
          ))}
        </ScrollView>

      </View>
    </SafeAreaView>
  );
};

export default BoardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'red',
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 10,
  },
});
