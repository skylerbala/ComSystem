import React from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, Text } from 'react-native';
import { scale } from '../../../../library/utils/ScalingAPI';

export default class EmployeeButton extends React.PureComponent {
  
  onEmployeeButtonPress = () => {
    if (this.props.onClick != null) {
      this.props.onClick(this.props.name, this.props.color, this.props.ringtone);
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.employeeButtons, { backgroundColor: this.props.color }]}
        onPress={this.onEmployeeButtonPress}
      >
        <Text style={styles.employeeButtonsText}>
          {this.props.name}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  employeeButtons: {
    justifyContent: 'center',
    height: Dimensions.get('window').height / 20,
    width: Dimensions.get('window').width / 4.35,
    margin: 5,
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5
  },
  employeeButtonsText: {
    fontSize: scale(30),
    color: 'white',
    alignSelf: 'center'
  },
});