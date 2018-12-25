import React from 'react';
import { Icon } from 'native-base';
import { createBottomTabNavigator } from 'react-navigation';
import MainPanel from './MainPanel';
import Employees from './Employees';
import Expressions from './Expressions';
import Settings from './Settings';


export default MainTabNavigator = createBottomTabNavigator({
  MainPanel: {
    screen: MainPanel,
    navigationOptions: {
      title: 'eMessage Panel',
      tabBarIcon: ({ tintColor }) => {
        return (<Icon type="FontAwesome" name="tachometer" style={{ color: tintColor }} />)
      }
    }
  },
  Employees: {
    screen: Employees,
    navigationOptions: {
      title: 'Employees',
      tabBarIcon: ({ tintColor }) => {
        return (<Icon type="FontAwesome" name="user" style={{ color: tintColor }} />)
      }
    }
  },
  Expressions: {
    screen: Expressions,
    navigationOptions: {
      title: 'Expressions',
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