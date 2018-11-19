import React from 'react';
import { Icon } from 'native-base';
import { createBottomTabNavigator } from 'react-navigation';
import MainPanel from './MainPanel';
import Staff from './Staff';
import Messages from './Messages';
import Settings from './Settings';


export default MainTabNavigator = createBottomTabNavigator({
  MainPanel: {
    screen: MainPanel,
    navigationOptions: {
      title: 'MainPanel',
      tabBarIcon: ({ tintColor }) => {
        return (<Icon type="FontAwesome" name="tachometer" style={{ color: tintColor }} />)
      }
    }
  },
  Staff: {
    screen: Staff,
    navigationOptions: {
      title: 'Staff',
      tabBarIcon: ({ tintColor }) => {
        return (<Icon type="FontAwesome" name="user" style={{ color: tintColor }} />)
      }
    }
  },
  Messages: {
    screen: Messages,
    navigationOptions: {
      title: 'Messages',
      tabBarIcon: ({ tintColor }) => {
        return (<Icon type="FontAwesome" name="envelope" style={{ color: tintColor }} />)
      }
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
      tabBarIcon: ({ tintColor }) => {
        return (<Icon type="FontAwesome" name="cog" style={{ color: tintColor }} />)
      }
    }
  }
}, {
    initialRouteName: 'MainPanel',
  }
);