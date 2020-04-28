/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import React, {useState, useEffect} from 'react';

import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

Ionicons.loadFont();

posts = [
  {
    id: '1',
    name: 'Jane Doe',
    text: 'this is some dummy text because lorem ipsum is not working',
    timestamp: 1569109273726,
    avatar: require('../assets/avatar.jpg'),
    image: require('../assets/authFooter.png'),
  },
  {
    id: '2',
    name: 'John Doe',
    text: 'this is some dummy text because lorem ipsum is not working',
    timestamp: 1569109273700,
    avatar: require('../assets/avatar.jpg'),
    image: require('../assets/authFooter.png'),
  },
  {
    id: '3',
    name: 'June Doe',
    text: 'this is some dummy text because lorem ipsum is not working',
    timestamp: 1569109245726,
    avatar: require('../assets/avatar.jpg'),
    image: require('../assets/authFooter.png'),
  },
  {
    id: '4',
    name: 'Tess Doe',
    text: 'this is some dummy text because lorem ipsum is not working',
    timestamp: 1569110073726,
    avatar: require('../assets/avatar.jpg'),
    image: require('../assets/authFooter.png'),
  },
];

const HomeScreen = () => {
  const renderPost = post => {
    return (
      <View style={styles.feedItem}>
        <Image source={post.avatar} style={styles.avatar} />
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.timestamp}>{post.timestamp}</Text>
            </View>

            <Ionicons name="ios-more" size={24} color="#73788b" />
          </View>

          <Text style={styles.post}>{post.text}</Text>

          <Image
            source={post.image}
            style={styles.postImage}
            resizeMode="cover"
          />

          <View style={{flexDirection: 'row'}}>
            <Ionicons
              name="ios-heart-empty"
              size={24}
              color="#73788b"
              style={{marginRight: 16}}
            />
            <Ionicons name="ios-chatboxes" size={24} color="#73788b" />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed</Text>
      </View>

      <FlatList
        style={styles.feed}
        data={posts}
        renderItem={({item}) => renderPost(item)}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efecf4',
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ebecf4',
    shadowColor: '#454d65',
    shadowOffset: {height: 5},
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: '#454d65',
  },
  timestamp: {
    fontSize: 11,
    color: '#c4c6ce',
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: '#838899',
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
});

export default HomeScreen;
