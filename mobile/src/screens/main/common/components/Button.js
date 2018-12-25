import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { scale } from '../../../../library/utils//ScalingAPI';

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
    height: scale(25),
    backgroundColor: '#63ace5',
    padding: scale(2.5),
    marginTop: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  text: {
    fontSize: 25,
    color: 'white'
  },
});