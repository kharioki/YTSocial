/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import MessageScreen from './screens/MessageScreen';
import PostScreen from './screens/PostScreen';
import ProfileScreen from './screens/ProfileScreen';

import * as firebase from 'firebase';

// var firebaseConfig = process.env.firebaseKeys;
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

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName="Loading">
    <AuthStack.Screen
      name="Login"
      component={LoginScreen}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="Register"
      component={RegisterScreen}
      options={{headerShown: false}}
    />
  </AuthStack.Navigator>
);

const Tab = createBottomTabNavigator();
// const tintColor = '#e9446a';
// const tintColor2 = '#8A8F9E';
const Tabs = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="ios-home" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Message"
      component={MessageScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="ios-chatboxes" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Post"
      component={PostScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="ios-add-circle" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="ios-person" size={24} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    });
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {!user ? <AuthStackScreen /> : <Tabs />}
    </NavigationContainer>
  );
};
