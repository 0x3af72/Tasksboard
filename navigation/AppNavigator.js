import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BoardScreen from '../screens/BoardScreen';
import NewTaskScreen from '../screens/NewTaskScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Incomplete"
      screenOptions={{
          swipeEnabled: true,
          tabBarShowLabel: false,
          tabBarIndicatorStyle: { backgroundColor: '#000' },
          tabBarStyle: { backgroundColor: '#fff' },
      }}
    >
      <Tab.Screen
        name="Incomplete"
        children={() => <BoardScreen />}
        initialParams={{ status: 'INCOMPLETE' }}
      />
      <Tab.Screen
        name="InProgress"
        children={() => <BoardScreen />}
        initialParams={{ status: 'INPROGRESS' }}
      />
      <Tab.Screen
        name="Completed"
        children={() => <BoardScreen />}
        initialParams={{ status: 'COMPLETED' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="NewTask" component={NewTaskScreen} options={{ title: 'New Task' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}