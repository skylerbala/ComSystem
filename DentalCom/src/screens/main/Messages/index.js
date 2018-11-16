import { createStackNavigator } from 'react-navigation';
import Home from './home';
import React from 'react';
import { Button, Icon } from 'native-base';

export default createStackNavigator({
  Home: {
    screen: Home,
  }
});
