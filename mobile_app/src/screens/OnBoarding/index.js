
import React, { Component } from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { View, Image } from 'react-native';
import { scale } from '../../library/utils/ScalingAPI';

export default class OnBoarding extends Component {
  render() {
    return (
      <Onboarding
        pages={[
          {
            backgroundColor: '#d0e1f9',
            image: <Image source={require('../../assets/images/logo.png')} />,
            title: 'Welcome to eMessage',
            subtitle: 'All your team communications in one instant, secure app.',
          },
          {
            backgroundColor: '#d0e1f9',
            image:<View
                  style={{
                    width: scale(550),
                    height: scale(550),
                    alignItems: 'center'
                  }}
                >
                  <Image
                    style={{
                      flex: 1,
                      resizeMode: 'contain',
                      alignItems: 'center'
                    }}
                    source={require('../../assets/images/Slide3.png')}
                  />
                </View>,
            title: 'eMessage Panel',
            subtitle: 'Send a message by clicking on a message recipient\'s employee button in the bottom view.',
          },
          {
            backgroundColor: '#d0e1f9',
            image:<View
                  style={{
                    width: scale(550),
                    height: scale(550),
                    alignItems: 'center'
                  }}
                >
                  <Image
                    style={{
                      flex: 1,
                      resizeMode: 'contain',
                      alignItems: 'center'
                    }}
                    source={require('../../assets/images/Slide4.png')}
                  />
                </View>,
            title: 'eMessage Panel',
            subtitle: 'Combine different user-defined expressions to create different messages.',
          },
          {
            backgroundColor: '#d0e1f9',
            image:<View
                  style={{
                    width: scale(550),
                    height: scale(550),
                    alignItems: 'center'
                  }}
                >
                  <Image
                    style={{
                      flex: 1,
                      resizeMode: 'contain',
                      alignItems: 'center'
                    }}
                    source={require('../../assets/images/Slide5.png')}
                  />
                </View>,
            title: 'eMessage Panel',
            subtitle: 'Delete messages as soon as they\'ve been read.',
          },
          {
            backgroundColor: '#d0e1f9',
            image:<View
                  style={{
                    width: scale(550),
                    height: scale(550),
                    alignItems: 'center'
                  }}
                >
                  <Image
                    style={{
                      flex: 1,
                      resizeMode: 'contain',
                      alignItems: 'center'
                    }}
                    source={require('../../assets/images/Slide6.png')}
                  />
                </View>,
            title: 'Employees',
            subtitle: 'Add, Edit, and Delete Employees.',
          },
          {
            backgroundColor: '#d0e1f9',
            image:<View
                  style={{
                    width: scale(550),
                    height: scale(550),
                    alignItems: 'center'
                  }}
                >
                  <Image
                    style={{
                      flex: 1,
                      resizeMode: 'contain',
                      alignItems: 'center'
                    }}
                    source={require('../../assets/images/Slide7.png')}
                  />
                </View>,
            title: 'Expressions',
            subtitle: 'Add, Edit, and Delete Expressions.',
          },
          {
            backgroundColor: '#d0e1f9',
            image:<View
                  style={{
                    width: scale(550),
                    height: scale(550),
                    alignItems: 'center'
                  }}
                >
                  <Image
                    style={{
                      flex: 1,
                      resizeMode: 'contain',
                      alignItems: 'center'
                    }}
                    source={require('../../assets/images/Slide2.png')}
                  />
                </View>,
            title: 'Settings',
            subtitle: 'Connect to eMessage Box IP to connect device and change ringtones.',
          },
        ]}
        onSkip={this.props.handleOnBoardingFinish}
        onDone={this.props.handleOnBoardingFinish}
      />
    );
  }
}