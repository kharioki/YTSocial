/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Fire from '../fire';

const PostScreen = () => {
  const [cameraGranted, setCameraGranted] = useState(false);

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

  useEffect(() => {
    handleCameraPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="md-arrow-back" size={24} color="#d8d9db" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={{fontWeight: '500'}}>Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Image source={require('../assets/avatar.jpg')} style={styles.avatar} />
        <TextInput
          autoFocus
          multiline
          numberOfLines={4}
          style={{flex: 1}}
          placeholder="Want to share something?"
        />
      </View>

      <TouchableOpacity style={styles.photo}>
        <Ionicons name="md-camera" size={32} color="#d8d9db" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#d8d9db',
  },
  inputContainer: {
    margin: 32,
    flexDirection: 'row',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  photo: {
    alignItems: 'flex-end',
    marginHorizontal: 32,
  },
});

export default PostScreen;
