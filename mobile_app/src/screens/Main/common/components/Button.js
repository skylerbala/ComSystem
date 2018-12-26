import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { scale } from '../../../../library/utils/ScalingAPI';

export default class Button extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity
        style={styles.view}
        onPress={this.props.onPress}
      >
        <Text style={styles.text}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    minHeight: scale(30),
    backgroundColor: '#63ace5',
    padding: scale(2.5),
    marginTop: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  text: {
    fontSize: scale(25),
    color: 'white'
  },
});