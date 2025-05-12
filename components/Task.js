import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const formatTimeElapsed = (from, to=Date.now()) => {
  const elapsed = to - from;

  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
};

const Task = ({ id, title, description, onStatusChange, status, startedAt, completedAt }) => {

  const [fadeAnim] = useState(new Animated.Value(1));

  const handleStatusChange = (newStatus) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      requestAnimationFrame(() => {
        onStatusChange(newStatus);
      });
    });
  };

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {title}
          {status === 'INPROGRESS' && ` (${formatTimeElapsed(startedAt)})`}
          {status === 'COMPLETED' && ` (${formatTimeElapsed(startedAt, completedAt)})`}
        </Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    
      {status === 'INCOMPLETE' && (
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.buttonYellow} onPress={() => handleStatusChange('DELETE')}>
            <Text style={styles.buttonText}>🗑️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonBlue} onPress={() => handleStatusChange('INPROGRESS')}>
            <Text style={styles.buttonText}>→</Text>
          </TouchableOpacity>
        </View>
      )}

      {status === 'INPROGRESS' && (
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.buttonYellow} onPress={() => handleStatusChange('DELETE')}>
            <Text style={styles.buttonText}>🗑️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRed} onPress={() => handleStatusChange('INCOMPLETE')}>
            <Text style={styles.buttonText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGreen} onPress={() => handleStatusChange('COMPLETED')}>
            <Text style={styles.buttonText}>→</Text>
          </TouchableOpacity>
        </View>
      )}

      {status === 'COMPLETED' && (
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.buttonYellow} onPress={() => handleStatusChange('DELETE')}>
            <Text style={styles.buttonText}>🗑️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRed} onPress={() => handleStatusChange('INPROGRESS')}>
            <Text style={styles.buttonText}>←</Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};

export default Task;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  buttonRed: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 6,
  },
  buttonGreen: {
    backgroundColor: '#00cc66',
    padding: 8,
    borderRadius: 6,
  },
  buttonBlue: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 6,
  },
  buttonYellow: {
    backgroundColor: 'yellow',
    padding: 8,
    borderRadius: 6,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
