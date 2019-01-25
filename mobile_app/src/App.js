import React from 'react';
import Main from './screens/Main';
import OnBoarding from './screens/OnBoarding';
import { registerRootComponent, ScreenOrientation } from 'expo';
import AsyncStorageAPI from './library/utils/AsyncStorageAPI';

class App extends React.Component {
  state = {
    isOnBoarding: false,
  }

  constructor(props) {
    super(props);
    this.storage = new AsyncStorageAPI;
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL);
  }

  componentDidMount() {
    this.storage.retrieveItem('isOnBoarding').then((res) => {
      if (res === 'false') {
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