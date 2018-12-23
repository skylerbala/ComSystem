
import React, { Component } from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Image } from 'react-native';

export default class OnBoarding extends Component {
  render() {
    return (
      <Onboarding
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image source={require('../../assets/images/img1.png')} />,
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('../../assets/images/img1.png')} />,
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('../../assets/images/img1.png')} />,
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('../../assets/images/img1.png')} />,
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('../../assets/images/img1.png')} />,
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('../../assets/images/img1.png')} />,
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },    
        ]}
        onSkip={this.props.handleOnBoardingFinish}
        onDone={this.props.handleOnBoardingFinish}
      />
    );
  }
}