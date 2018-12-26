import React from 'react';
import Main from './screens/Main';
import OnBoarding from './screens/OnBoarding';
import { registerRootComponent } from 'expo';
import AsyncStorageAPI from './library/utils/AsyncStorageAPI';

class App extends React.Component {
  state = {
    isOnBoarding: true,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.storage = new AsyncStorageAPI;
    this.storage.retrieveItem('isOnBoarding').then((result) => {
      if (result === 'false') {
        this.setState({ isOnBoarding: false });
      }
      else {
        this.setState({ isOnBoarding: true });
      }
    })
  }

  onOnBoardingFinish = () => {
    this.storage.storeItem('isOnBoarding', 'false');
    this.setState({ isOnBoarding: false });
  }

  render() {
    let view = <Main />

    if (this.state.isOnBoarding) {
      view = (
        <OnBoarding
          handleOnBoardingFinish={this.onOnBoardingFinish}
        />
      );
    }

    return view;
  }
}

registerRootComponent(App);