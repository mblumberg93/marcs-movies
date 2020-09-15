import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './screens/HomeScreen';
import { AddMovieScreen } from './screens/AddMovieScreen';
import { MoviesScreen } from './screens/MoviesScreen';
import { ListsScreen } from './screens/ListsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add Movie" component={AddMovieScreen} />
        <Stack.Screen name="Movies" component={MoviesScreen} />
        <Stack.Screen name="Lists" component={ListsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}