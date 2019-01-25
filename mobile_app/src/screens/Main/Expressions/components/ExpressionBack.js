import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { scale } from '../../../../library/utils/ScalingAPI';

export default class ExpressionBack extends React.PureComponent {

  onEditExpressionPress = () => {
    this.props.onEditClick(this.props.expression);
  }

  onDeleteExpressionPress = () => {
    this.props.onDeleteClick(this.props.expression);
  }

  render() {
    return (
      <TouchableOpacity style={styles.expressionRowBack}>
        <TouchableOpacity
          style={[styles.expressionRowBackButton, styles.expressionRowBackButtonLeft]}
          onPress={this.onEditExpressionPress}
        >
          <Text style={styles.expressionRowBackText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.expressionRowBackButton, styles.expressionRowBackButtonRight]}
          onPress={this.onDeleteExpressionPress}>
          <Text style={styles.expressionRowBackText}>Delete</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  expressionRowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    borderRadius: 5

  },
  expressionRowBackButton: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 125,
    borderRadius: 5,
    marginBottom: 5,
  },
  expressionRowBackButtonLeft: {
    backgroundColor: '#FF992D',
    right: 125
  },
  expressionRowBackButtonRight: {
    backgroundColor: '#FF2D2D',
    right: 0
  },
  expressionRowBackText: {
    color: '#FFF',
    fontSize: scale(15),
  }
});