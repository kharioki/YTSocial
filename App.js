/* eslint-disable react-native/no-inline-styles */
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
import NotificationScreen from './screens/NotificationScreen';

import firebase from 'firebase';
import {firebaseKeys} from './config';
// import Fire from './fire';

// Initialize Firebase
var firebaseConfig = firebaseKeys;

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

const Tabs = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#161f3d',
      inactiveTintColor: '#b8bbc4',
      showLabel: false,
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
        mode: 'modal',
        tabBarIcon: ({color}) => (
          <Ionicons
            name="ios-add-circle"
            size={48}
            color="#e9446a"
            style={{
              shadowColor: '#e9446a',
              shadowOffset: {width: 0, height: 0},
              shadowRadius: 10,
              shadowOpacity: 0.3,
            }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Notification"
      component={NotificationScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="ios-notifications" size={24} color={color} />
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
