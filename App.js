import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation'
import SignUp from './screens/authentication/SignUp'
import DashBoardScreen from './screens/dashboard/DashboadScreen'
import SharePlace from './screens/SharePlace/SharePlace'
import AsyncStorage from '@react-native-community/async-storage';
import Login from './screens/authentication/Login';


const MainNavigator = createStackNavigator({
 Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: SignUp
  },
  Dashboard: {
    screen: DashBoardScreen
  }

})


getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@randomValue')
    return value;
  } catch (e) {
    alert('catch')
    this.storeData()
  }
}

const App = createAppContainer(MainNavigator);
export default App;