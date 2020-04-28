/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import firebase from 'firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';

import Fire from '../fire';

Ionicons.loadFont();

const RegisterScreen = props => {
  const [cameraGranted, setCameraGranted] = useState(false);
  const [userInfo, setUserInfo] = useState({
    avatar: null,
    name: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);

  // check camera permission
  const handleCameraPermission = async () => {
    const res = await check(PERMISSIONS.IOS.CAMERA);

    if (res === RESULTS.GRANTED) {
      setCameraGranted(true);
    } else if (res === RESULTS.DENIED) {
      const res2 = await request(PERMISSIONS.IOS.CAMERA);
      res2 === RESULTS.GRANTED
        ? setCameraGranted(true)
        : setCameraGranted(false);
    }
  };

  const {avatar, name, email, password} = userInfo;

  const handleSignUp = () => {
    Fire.shared.createUser(userInfo);
  };

  const handlePickAvatar = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setUserInfo({...userInfo, avatar: response.uri});
      }
    });
  };

  useEffect(() => {
    handleCameraPermission();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        source={require('../assets/authHeader.png')}
        style={{marginTop: -260, marginLeft: -50}}
      />

      <Image
        source={require('../assets/authHeader.png')}
        style={{position: 'absolute', bottom: -350, right: -60}}
      />

      <TouchableOpacity
        style={styles.back}
        onPress={() => props.navigation.goBack()}>
        <Ionicons name="ios-arrow-round-back" size={32} color="#fff" />
      </TouchableOpacity>

      <View
        style={{
          position: 'absolute',
          top: 64,
          alignItems: 'center',
          width: '100%',
        }}>
        <Text
          style={styles.greeting}>{`Hello. \nSign Up to get started.`}</Text>

        <TouchableOpacity
          style={styles.avatarPlaceholder}
          onPress={handlePickAvatar}>
          {avatar !== null && (
            <Image source={{uri: avatar}} style={styles.avatar} />
          )}
          <Ionicons
            name="ios-add"
            size={40}
            color="#fff"
            style={{marginTop: 6, marginLeft: 2}}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.errorMessage}>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>

      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Full Name</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={val => setUserInfo({...userInfo, name: val})}
            value={name}
          />
        </View>

        <View style={{marginTop: 32}}>
          <Text style={styles.inputTitle}>Email Address</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={val => setUserInfo({...userInfo, email: val})}
            value={email}
          />
        </View>

        <View style={{marginTop: 32}}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            secureTextEntry
            onChangeText={val => setUserInfo({...userInfo, password: val})}
            value={password}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={{color: '#fff', fontWeight: '500'}}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{alignSelf: 'center', marginTop: 32}}
        onPress={() => props.navigation.navigate('Login')}>
        <Text style={{color: '#414959', fontSize: 13}}>
          Already have an account?{' '}
          <Text style={{color: '#e9446a', fontWeight: '500'}}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: '#e9446a',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161f3d',
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#E9446A',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    top: 48,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(21, 22, 48, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e1e2e6',
    marginTop: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default RegisterScreen;
