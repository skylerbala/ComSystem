import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { scale } from '../../../../library/utils/ScalingAPI';

export default class EmployeeBack extends React.PureComponent {

  onEditEmployeePress = () => {
    this.props.onEditClick(this.props.employee);
  }

  onDeleteEmployeePress = () => {
    this.props.onDeleteClick(this.props.employee);
  }

  render() {
    return (
      <TouchableOpacity style={styles.employeeRowBack}>
        <TouchableOpacity
          style={[styles.employeeRowBackButton, styles.employeeRowBackButtonLeft]}
          onPress={this.onEditEmployeePress}
        >
          <Text style={styles.employeeRowBackText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.employeeRowBackButton, styles.employeeRowBackButtonRight]}
          onPress={this.onDeleteEmployeePress}
        >
          <Text style={styles.employeeRowBackText}>Delete</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  employeeRowBack: {
    flex: 1,
  },
  employeeRowBackButton: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 125,
    borderRadius: 5,
  },
  employeeRowBackButtonLeft: {
    backgroundColor: '#eb6841',
    right: 125
  },
  employeeRowBackButtonRight: {
    backgroundColor: '#cc2a36',
    right: 0
  },
  employeeRowBackText: {
    color: '#FFF',
    fontSize: scale(15),
  },
});