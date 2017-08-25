import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Keyboard
} from 'react-native';

import { Form, Input, Item, Label, Card, CardItem, Body, Container, Content, Icon } from 'native-base';

import Spinner from '../Components/Spinner';

import I18n from 'react-native-i18n'
import Animatable from 'react-native-animatable'

import { createIconSetFromFontello } from 'react-native-vector-icons'

import RoundedButton from '../Components/RoundedButton';

// import LoginForm from '../Components/LoginForm';
import { observer, inject } from 'mobx-react/native';

import { Metrics, Colors, Images } from '../Themes'

// Styles
import styles from './Styles/LoginScreenStyles'


@inject('userStore')
@observer
class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    const { userStore } = this.props;
    userStore.msg = '';
    this.state = {
      user: '',
      password: ''
    };
  }

  componentWillReact = () => {
    console.log('componentWillReact LoginScreen');
    const { userStore } = this.props;
    console.log('logged in:', userStore.session);
    if (userStore.isLoggedIn()) {
      const { navigate, setParams, state } = this.props.navigation
      navigate("LaunchScreen", { title: "Home Page", parentKey: state.key })
    }
    
  }

  handleSubmit = () => {

    const { userStore } = this.props;
    const { user, password } = this.state;
    userStore.login(user, password);

  };

  errorMessage = () => {
    const { userStore } = this.props;
    if (userStore.msg) {
      return (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorMessage, styles.center, styles.errorText]}>
            {userStore.msg}
          </Text>
        </View>
      );
    }
  };

  loginButton = () => {

    const { userStore } = this.props;

    if (userStore.fetching) {
      return (
        <Spinner style={styles.spinner} color={Colors.fire} />
      );
    }

    return (
      <RoundedButton
        onPress={() => { this.handleSubmit() }}
        text={I18n.t('signIn')}
      />
    );
  };






  renderUserField = () => {

    const { userStore } = this.props;
    const { user } = this.state;


    return (
      <Input
        ref="user"
        value={user}
        editable={!userStore.fetching}
        placeholder='Username'
        keyboardType="default"
        returnKeyType="next"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={user => this.setState({ user })}
        onSubmitEditing={() => { () => this.refs.password.focus() }}
      />
    );
  }

  renderPasswordField = () => {

    const { userStore } = this.props;
    const { password } = this.state


    return (
      <Input
        ref='password'
        value={password}
        editable={!userStore.fetching}
        keyboardType='default'
        placeholder='Password'
        returnKeyType={'go'}
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry
        onChangeText={password => this.setState({ password })}
        onSubmitEditing={() => { this.handleSubmit() }}
      />
    )
  }

  createForm = () => {


    return (
      <View>
        <View style={styles.form}>
          <Form>
            <Item underline>
              <Icon active name='person' />
              {this.renderUserField()}
            </Item>
            <Item underline>
              <Icon active name='lock' />
              {this.renderPasswordField()}
            </Item>
            {this.errorMessage()}
            {this.loginButton()}
          </Form>
        </View>
      </View>
    );

  };

  render() {

    const { userStore } = this.props;
    console.log(userStore.session);

    return (
      <Image source={Images.bgCloud} style={styles.backgroundImage}>
        <View style={styles.mainContainer}>
          <ScrollView
            style={styles.container}
            keyboardShouldPersistTaps="always"
          >
            <KeyboardAvoidingView behavior="padding">
              <View style={{ paddingTop: 50, paddingBottom: 70 }}>
                <Image source={Images.logoESptpd} style={styles.logo} />
                <Image
                  source={Images.logoPemda}
                  style={styles.logo}
                />
              </View>
              {this.createForm()}
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Image>
    );
  }
}



export default LoginScreen;
