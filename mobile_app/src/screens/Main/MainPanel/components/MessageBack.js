import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { scale } from '../../../../library/utils/ScalingAPI';

export default class MessageBack extends React.PureComponent {
  
  onMessageDeletePress = () => {
    this.props.onClick(this.props.message);
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.messageRowBack, styles.messageRowBackDeleteButton]}
        onPress={this.onMessageDeletePress}
      >
        <Text style={styles.messageRowBackDeleteButtonText}>Delete</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  messageRowBack: {
    flex: 1,
    marginBottom: 10
  },
  messageRowBackDeleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF2D2D',
    width: 200,
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    borderRadius: 5
  },
  messageRowBackDeleteButtonText: {
    color: "white",
    fontSize: scale(45),
  },
});