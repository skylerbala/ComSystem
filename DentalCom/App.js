import React from 'react';
import { Root } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Main from './screens/main/Main';

export default class App extends React.Component {
  render() {
    return (
      <Main />
    );
  }
}
