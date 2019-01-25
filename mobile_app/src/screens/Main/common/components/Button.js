import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { scale } from '../../../../library/utils/ScalingAPI';

export default Button = (props) => {
  return (
    <TouchableOpacity
      style={[styles.container, props.containerStyle]}
      onPress={props.onPress}
    >
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: scale(30),
    backgroundColor: '#25E832',
    padding: scale(2.5),
    marginTop: scale(5),
    borderRadius: 5
  },
  text: {
    fontSize: scale(25),
    color: 'white'
  },
});