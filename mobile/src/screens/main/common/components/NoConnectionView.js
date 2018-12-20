
import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, } from 'react-native-elements';

const NoConnectionView = (props) => {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>
        No Connection
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 40
  },
});

export default NoConnectionView;