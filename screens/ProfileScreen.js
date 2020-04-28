import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import Fire from '../fire';

export default class ProfileScreen extends Component {
  state = {
    user: {},
  };

  unsubscribe = null;

  componentDidMount() {
    const _user = this.props.uid || Fire.shared.uid;

    // this.componentWillMountunsubscribe = Fire.shared.firestore
    //   .collection('users')
    //   .doc(_user)
    //   .onSnapshot(doc => {
    //     this.setState({user: doc.data()});
    //   });
  }

  componentWillUnmount() {
    this.unsubscribe;
  }

  render() {
    const {user} = this.state;

    return (
      <View style={styles.container}>
        <View style={{marginTop: 64, alignItems: 'center'}}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={
                user.avatar
                  ? {uri: user.avatar}
                  : require('../assets/avatar.jpg')
              }
            />

            <Text style={styles.name}>{user.name}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statAmount}>21</Text>
              <Text style={styles.statTitle}>Posts</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statAmount}>98</Text>
              <Text style={styles.statTitle}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statAmount}>93</Text>
              <Text style={styles.statTitle}>Following</Text>
            </View>
          </View>

          <Button
            onPress={() => {
              Fire.shared.signOut();
            }}
            title="Log out"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    shadowColor: '#151734',
    shadowRadius: 15,
    shadowOpacity: 0.4,
  },
  avatar: {
    width: 136,
    height: 136,
    borderRadius: 68,
  },
  name: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 32,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statAmount: {
    color: '#4f566d',
    fontSize: 18,
    fontWeight: '300',
  },
  statTitle: {
    color: '#c3c5cd',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});
