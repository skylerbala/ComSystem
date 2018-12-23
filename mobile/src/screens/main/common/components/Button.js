import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export default Button = (props) => {
  return (
    <TouchableOpacity
      style={styles.view}
      onPress={props.onPress}
    >
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  view: {
    height: 55,
    backgroundColor: 'black',
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  text: {
    fontSize: 25,
    color: 'white'
  },
});