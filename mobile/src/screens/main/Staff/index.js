import { createStackNavigator } from 'react-navigation';
import Home from './Home';
import PickColor from './PickColor';

export default createStackNavigator({
  Home: {
    screen: Home,
  },
  PickColor: {
    screen: PickColor,
  },
});
