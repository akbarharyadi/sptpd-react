import React from 'react'
import { ScrollView, Image, View } from 'react-native'
import { Colors, Images } from '../Themes'
import { Container, Content, Thumbnail, Text } from 'native-base';

import { observer, inject } from 'mobx-react/native';

import { BlurView, VibrancyView } from 'react-native-blur';

import RoundedButton from '../Components/RoundedButton';
import Spinner from '../Components/Spinner';



// Styles
import styles from './Styles/LaunchScreenStyles'

@inject('userStore')
@observer
export default class LaunchScreen extends React.Component {

  constructor(props){
    super(props);
    const { userStore } = this.props;
    this.user = props.userStore;
  }

  componentWillReact = () => {
    const {navigate, setParams, state} = this.props.navigation
    const { userStore } = this.props;
    if (userStore.isLoggedIn()){
      navigate("TabScreen", {title: "TabScreen", key: 'key'})
    }
  }

  loginLogout = () => {

    const { userStore } = this.props;
    if (userStore.isLoggedIn()){

      if (userStore.fetching) {
        return (
          <Spinner style={styles.spinner} color={Colors.fire} />
        );
      }

      return (
        <RoundedButton
          text="Logout"
          onPress={this.logout}
        />
      );

    }
    return (
      <RoundedButton
        text="Login"
        onPress={this.openLogin}
      />
    )
  };
  logout = () => {
    this.user.logout();
  };
  openLogin = () => {
    const {navigate, setParams, state} = this.props.navigation
    navigate("LoginScreen", {title: "LoginScreen", parentKey: state.key})
  }
  render () {
    return (
      <Image source={Images.logoBgSptpd} style={styles.backgroundImage}>
        <Container style={styles.mainContainer}>
          <ScrollView style={styles.container}>
            <Content>
              <View style={styles.centered}>
                <Image source={Images.logoESptpd} style={styles.logo} resizeMode='stretch' />
              </View>
              <View style={styles.section} >
                <Text style={styles.sectionText}>
                  Selamat datang di E-SPTPD Purwakarta.{"\n"}
                  Untuk melanjutkan silahkan login terlebih dahulu.
                </Text>
              </View>
              { this.loginLogout() }
            </Content>
          </ScrollView>
        </Container>
      </Image>
      /*<View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.appclon} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Text style={styles.sectionText}>
              Base Boilerplate integrating Ignite with MobX and React Navigation.
            </Text>
          </View>
          { this.loginLogout() }

          <RoundedButton
            text={`Search "${this.search}" on Spotify`}
            onPress={this.openMusic}
          />

        </ScrollView>
      </View>*/
    )
  }
}
