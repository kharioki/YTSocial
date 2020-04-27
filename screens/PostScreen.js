/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Fire from '../fire';
import ImagePicker from 'react-native-image-picker';

import firebase from 'firebase';
import 'firebase/firestore';

const PostScreen = props => {
  const [cameraGranted, setCameraGranted] = useState(false);
  const [image, setImage] = useState('');
  const [text, setText] = useState('');

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

  // pick image
  const pickImage = async () => {
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
        setImage(response.uri);
      }
    });
  };

  //save image to firebase
  const handlePost = () => {
    Fire.shared
      .addPost({
        text: text.trim(),
        localUri: image,
      })
      .then(ref => {
        setText('');
        setImage('');
        props.navigation.goBack();
      })
      .catch(error => {
        alert(error.message);
      });
  };

  useEffect(() => {
    handleCameraPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons name="md-arrow-back" size={24} color="#d8d9db" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePost}>
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
          onChangeText={inputText => setText(inputText)}
          value={text}
        />
      </View>

      <TouchableOpacity style={styles.photo} onPress={pickImage}>
        <Ionicons name="md-camera" size={32} color="#d8d9db" />
      </TouchableOpacity>

      <View style={{marginHorizontal: 32, marginTop: 32, height: 150}}>
        {image !== '' && (
          <Image
            source={{uri: image}}
            style={{width: '100%', height: '100%'}}
          />
        )}
      </View>
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
