import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'
import MusicScreen from '../Containers/MusicScreen'

import { Colors } from '../Themes';
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: {
    screen: LaunchScreen,
    navigationOptions: () => ({
			title: 'Home Page',
      header: null
		})
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: () => ({
			title: 'Login'
		})
  }
}, {
  // Default config for all screens
  headerMode:'screen',
  navigationOptions: ({ navigation }) => ({
    title: navigation.state && navigation.state.params && navigation.state.params.title,
    headerTintColor: Colors.black,
    headerStyle: styles.header

  })

})

export default PrimaryNav
