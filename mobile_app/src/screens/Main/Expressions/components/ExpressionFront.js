import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { scale } from '../../../../library/utils/ScalingAPI';

export default class ExpressionFront extends React.PureComponent {  
  render() {
    let expressionBackgroundColor = this.props.type == 1 ? "#73D0F3" : "#ff7676";
    return (
      <View style={[styles.expressionRowFront, { backgroundColor: expressionBackgroundColor }]}>
        <Text style={styles.expressionRowFrontText}>{this.props.content}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  expressionRowFront: {
    flex: 1,
    borderBottomColor: '#4d648d',
    paddingLeft: 15,
    justifyContent: 'center',
    minHeight: scale(40),
    borderRadius: 5,
    marginBottom: 5,

  },
  expressionRowFrontText: {
    fontSize: scale(35),
    color: "white"
  },
});