import { createStackNavigator } from 'react-navigation';
import Home from './Home';
import SendMessage from './SendMessage';


export default createStackNavigator({
  Home: {
    screen: Home,
  },
  SendMessage: {
    screen: SendMessage,
  }
});
