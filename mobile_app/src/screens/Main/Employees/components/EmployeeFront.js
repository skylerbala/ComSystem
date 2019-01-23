import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { scale } from '../../../../library/utils/ScalingAPI';

export default class EmployeeFront extends React.PureComponent {  
  render() {
    console.log('EmployeeFront')

    return (
      <View style={styles.employeeRowFront}>
        <Text style={styles.employeeRowFrontName}>{this.props.name}</Text>
        <Text style={styles.employeeRowFrontRingtone}>{this.props.ringtone}</Text>
        <View style={[styles.employeeRowFrontColorBox, { backgroundColor: this.props.color }]}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  employeeRowFront: {
    backgroundColor: '#73D0F3',
    borderBottomColor: '#4d648d',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 5,
    minHeight: scale(30),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5
  },
  employeeRowFrontName: {
    fontSize: scale(35),
    color: 'white',
    flex: 1,
  },
  employeeRowFrontRingtone: {
    fontSize: scale(14),
    color: 'white',
  },
  employeeRowFrontColorBox: {
    height: scale(35),
    width: scale(35),
    borderRadius: 5,
    marginLeft: 15
  },
});