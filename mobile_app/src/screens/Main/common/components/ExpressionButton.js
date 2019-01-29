import React from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, Text } from 'react-native';
import { scale } from '../../../../library/utils/ScalingAPI';

export default class ExpressionButton extends React.PureComponent {

  onExpressionPress = () => {
    if (this.props.onClick != null) {
      this.props.onClick(this.props.expression);
    }
  }

  render() {
    let expressionBackgroundColor = this.props.expression.type == 1 ? "#73D0F3" : "#ff7676";

    return (
      <TouchableOpacity
        style={[styles.expressionButton, { backgroundColor: expressionBackgroundColor }]}
        onPress={this.onExpressionPress}
      >
        <Text style={styles.expressionsText}>
          {this.props.expression.content}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  expressionButton: {
    justifyContent: 'center',
    height: Dimensions.get('window').height / 24,
    width: Dimensions.get('window').width / 4,
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    margin: 5
  },
  expressionsText: {
    fontSize: scale(25),
    color: 'white',
    alignSelf: 'center'
  }
});