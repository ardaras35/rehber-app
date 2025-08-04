import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HomeScreen from './screens/HomeScreen';
import AddPersonScreen from './screens/AddPersonScreen';
import PersonListScreen from './screens/PersonListScreen';
import PersonDetailScreen from './screens/PersonDetailScreen';

import ThemeProvider from './context/ThemeContext';
import PersonProvider from './context/PersonContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PersonProvider>
        <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Ana Sayfa' }} />
          <Stack.Screen name="AddPerson" component={AddPersonScreen} options={{ title: 'Kişi Ekle' }} />
          <Stack.Screen name="PersonList" component={PersonListScreen} options={{ title: 'Kişiler' }} />
          <Stack.Screen name="PersonDetail" component={PersonDetailScreen} options={{ title: 'Detay' }} />
        </Stack.Navigator>
      </NavigationContainer>
      </ThemeProvider>
    </PersonProvider>
  </GestureHandlerRootView>
  );
}

