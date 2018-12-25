
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { scale } from '../../../../library/utils/ScalingAPI';

export default NoConnectionView = (props) => {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>
        No Connection
      </Text>
      <Text style={styles.helperText}>
        Go to Settings and set eMessage Box IP
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: scale(45)
  },
  helperText: {
    textAlign: 'center',
    fontSize: scale(20)
  }
});