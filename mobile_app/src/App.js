import React from 'react';
import Main from './screens/Main';
import OnBoarding from './screens/OnBoarding';
import { registerRootComponent } from 'expo';
import AsyncStorageAPI from './library/utils/AsyncStorageAPI';

class App extends React.Component {
  state = {
    isOnBoarding: false,
  }

  constructor(props) {
    super(props);

    this.storage = new AsyncStorageAPI;
  }

  componentDidMount() {
    this.storage.retrieveItem('isOnBoarding').then((result) => {
      if (result === 'false') {
        this.setState({ isOnBoarding: false });
      }
      else {
        this.setState({ isOnBoarding: true });
      }
    });
  }

  onOnBoardingFinish = () => {
    this.storage.storeItem('isOnBoarding', 'false');
    this.setState({ isOnBoarding: false });
  }

  render() {
    let mainView = null;

    if (!this.state.isOnBoarding) {
      mainView = <Main />
    }
    else {
      mainView = <OnBoarding handleOnBoardingFinish={this.onOnBoardingFinish} />
    }

    return mainView;
  }
}

registerRootComponent(App);