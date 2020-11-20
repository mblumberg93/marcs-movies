import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './screens/HomeScreen';
import { AddMovieScreen } from './screens/AddMovieScreen';
import { MoviesScreen } from './screens/MoviesScreen';
import { ListsScreen } from './screens/ListsScreen';
import { ListScreen } from './screens/ListScreen';
import { AddMovieToListScreen } from './screens/AddMovieToListScreen';
import { RemoveMovieFromListScreen } from './screens/RemoveMovieFromListScreen';
import { RandomMovieScreen } from './screens/RandomMovieScreen';
import { LoginScreen } from './screens/LoginScreen';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'

const Stack = createStackNavigator();
const store = createStore(rootReducer);


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Add Movie" component={AddMovieScreen} />
          <Stack.Screen name="Movies" component={MoviesScreen} />
          <Stack.Screen name="Lists" component={ListsScreen} />
          <Stack.Screen name="List" component={ListScreen} 
                        options={({ route }) => ({ title: route.params.name })} />
          <Stack.Screen name="Add Movie To List" component={AddMovieToListScreen} />
          <Stack.Screen name="Remove Movie From List" component={RemoveMovieFromListScreen} />
          <Stack.Screen name="Random Movie" component={RandomMovieScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}