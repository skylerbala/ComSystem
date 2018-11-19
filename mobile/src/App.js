import React from 'react';
import Main from './screens/main/Main';
import Expo from 'expo';

class App extends React.Component {
  render() {
    return (
      <Main/>
    );
  }
}

Expo.registerRootComponent(App);