import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyC85LkjuY6LpzwHHzqWF4jfIXY0cRkvL78',
  authDomain: 'socialapp-72887.firebaseapp.com',
  databaseURL: 'https://socialapp-72887.firebaseio.com',
  projectId: 'socialapp-72887',
  storageBucket: 'socialapp-72887.appspot.com',
  messagingSenderId: '494285609573',
  appId: '1:494285609573:web:be009437d567e2464b448c',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
