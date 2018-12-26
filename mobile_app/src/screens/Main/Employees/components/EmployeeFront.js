import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { scale } from '../../../../library/utils/ScalingAPI';

export default class EmployeeFront extends React.PureComponent {  
  render() {
    console.log("EmployeeFront")
    return (
      <View style={styles.employeeRowFront}>
        <Text style={styles.employeeRowFrontText}>{this.props.name}</Text>
        <View style={[styles.employeeRowFrontColorBox, { backgroundColor: this.props.color }]}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  employeeRowFront: {
    backgroundColor: '#1e1f26',
    borderBottomColor: '#4d648d',
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    minHeight: scale(30),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5
  },
  employeeRowFrontText: {
    fontSize: scale(35),
    color: 'white',
    flex: 1,
  },
  employeeRowFrontColorBox: {
    height: scale(35),
    width: scale(35),
    borderRadius: 5
  },
});