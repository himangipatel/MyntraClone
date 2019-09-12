import {createStackNavigator, createAppContainer} from 'react-navigation';
import SignUp from './screens/authentication/SignUp';
import DashBoardScreen from './screens/dashboard/DashboadScreen';
import SharePlace from './screens/SharePlace/SharePlace';

import Login from './screens/authentication/Login';
import SplashScreen from './screens/SplashScreen';

const MainNavigator = createStackNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  SignUp: {
    screen: SignUp,
  },
  Dashboard: {
    screen: DashBoardScreen,
  },
});

const App = createAppContainer(MainNavigator);
export default App;
