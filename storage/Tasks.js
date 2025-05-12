import AsyncStorage from '@react-native-async-storage/async-storage';

const saveTasks = async (tasks) => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem('@tasks', jsonValue);
  } catch (e) {
    console.error('Error saving tasks:', e);
  }
};

const loadTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@tasks');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error loading tasks:', e);
    return [];
  }
};

module.exports = { saveTasks, loadTasks };