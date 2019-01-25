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
      title: 'Main Panel',
      tabBarIcon: ({ tintColor }) => {
        return (<Icon type="font-awesome" name="tachometer" color={tintColor} />)
      },
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        defaultHandler()
        global.currTab = 'MainPanel'
      }
    }
  },
  Employees: {
    screen: Employees,
    navigationOptions: {
      title: 'Employees',
      tabBarIcon: ({ tintColor }) => {
        return (<Icon type="font-awesome" name="user" color={tintColor} />)
      },
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        defaultHandler()
        global.currTab = 'Employees'
      }
    }
  },
  Expressions: {
    screen: Expressions,
    navigationOptions: {
      title: 'Expressions',
      tabBarIcon: ({ tintColor }) => {
        return (<Icon type="font-awesome" name="envelope" color={tintColor} />)
      },
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        defaultHandler()
        global.currTab = 'Expressions'
      }
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
      tabBarIcon: ({ tintColor }) => {
        return (<Icon type="font-awesome" name="cog" color={tintColor} />)
      },
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        defaultHandler()
        global.currTab = 'Settings'
      }
    }
  }
}, {
    initialRouteName: 'MainPanel',
  }
);

export default (MainTabNavigator);