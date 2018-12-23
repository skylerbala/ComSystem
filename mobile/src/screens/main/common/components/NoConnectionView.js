
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default NoConnectionView = (props) => {
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