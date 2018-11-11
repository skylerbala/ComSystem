import { createStackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import Home from './home';
import { Button, Icon } from 'native-base';
import SendMessage from './sendMessage';


export default createStackNavigator({
  Home: {
    screen: Home,
  },
  SendMessage: {
    screen: SendMessage,
  }
});
