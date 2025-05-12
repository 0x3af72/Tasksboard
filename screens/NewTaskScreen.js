import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function NewTaskScreen({ navigation, route }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (title.trim()) {
      route.params?.onAddTask(title, description);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
        style={styles.input}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Enter task description"
        style={[styles.input, { height: 80 }]}
        multiline
      />
      <Button title="Save Task" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    padding: 8,
    borderRadius: 6,
  },
});
