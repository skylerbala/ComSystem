import React from 'react';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation';
import MainPanel from './MainPanel';
import Employees from './Employees';
import Expressions from './Expressions';
import Settings from './Settings';

const MainTabNavigator = createBottomTabNavigator({
  MainPanel: {
    screen: MainPanel,
    navigationOptions: {
      title: 'eMessage Panel',
      tabBarIcon: ({ tintColor }) => {
        return (<Icon type="font-awesome" name="tachometer" color={tintColor} />)
      }
    }
  },
  Employees: {
    screen: Employees,
    navigationOptions: {
      title: 'Employees',
      tabBarIcon: ({ tintColor }) => {
        return (<Icon type="font-awesome" name="user" color={tintColor} />)
      }
    }
  },
  Expressions: {
    screen: Expressions,
    navigationOptions: {
      title: 'Expressions',
      tabBarIcon: ({ tintColor }) => {
        return (<Icon type="font-awesome" name="envelope" color={tintColor} />)
      }
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
      tabBarIcon: ({ tintColor }) => {
        return (<Icon type="font-awesome" name="cog" color={tintColor} />)
      }
    }
  }
}, {
    initialRouteName: 'MainPanel',
  }
);

export default (MainTabNavigator);