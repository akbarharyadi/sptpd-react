import { StackNavigator, TabNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'
import MusicScreen from '../Containers/MusicScreen'
import YearScreen from '../Containers/YearScreen'
import SettingScreen from '../Containers/SettingScreen'
import TaxScreen from '../Containers/TaxScreen'
import SubTaxScreen from '../Containers/SubTaxScreen'
import AddTaxScreen from '../Containers/AddTaxScreen'
import { Icon } from 'native-base';

import { Colors } from '../Themes';
import styles from './Styles/NavigationStyles'


const nav_tab = TabNavigator(
  // route config
  {
    Year: {
      screen: YearScreen,
      //label: 'Home',
      //icon: <Icon name={"home"} style={{color: this.props.selected ? '#857ce4' : '#afafa4'}} />,
    },
    Setting: {
      screen: SettingScreen,
      //label: 'Setting',
    },
  },
  // navigator config
  {
    tabBarPosition: 'bottom', // where are the tabs shown
    backBehavior: 'none', // back button doesn't take you to the initial tab
  },
);

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
			title: 'Login',
      header: null
		})
  },
  TabScreen: {
    screen: nav_tab,
    navigationOptions: () => ({
			title: 'Menu SPTPD'
		})
  },
  TaxScreen: {
    screen: TaxScreen,
    navigationOptions: () => ({
			title: 'Menu SPTPD'
		})
  },
  SubTaxScreen: {
    screen: SubTaxScreen,
    navigationOptions: () => ({
			title: 'Menu SPTPD'
		})
  },
  AddTaxScreen: {
    screen: AddTaxScreen,
    navigationOptions: () => ({
			title: 'Rekam SPTPD'
		})
  },
  YearScreen: {
    screen: YearScreen,
    navigationOptions: () => ({
			title: 'Rekam SPTPD'
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
