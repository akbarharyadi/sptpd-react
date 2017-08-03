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

 import { Form, Input, Item, Label, Card, CardItem, Body, Container, Content } from 'native-base';

import Spinner from '../Components/Spinner';


// import { Card, CardItem, Content, Body } from 'native-base';
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
    const { navigation, userStore } = this.props;

    console.log('logged in:',userStore.session);
    if (userStore.isLoggedIn()){

      navigation.goBack();

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
              <Card transparent>
                <CardItem>
                  <Body>
                    <Text style={[styles.errorMessage, styles.center, styles.errorText]}>
                      {userStore.msg}
                    </Text>
                  </Body>
                </CardItem>
              </Card>
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
        keyboardType="default"
        returnKeyType="next"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={ user => this.setState({ user }) }
        onSubmitEditing={() => {() => this.refs['password'].focus()}}
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
        returnKeyType={'go'}
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry
        onChangeText={password => this.setState({ password })}
        onSubmitEditing={()=>{this.handleSubmit()}}
         />
    )
  }

  createForm = () => {


    return (
      <View>
        <View style={styles.form}>
          <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                {this.renderUserField()}
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
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
      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="always"
        >
          <KeyboardAvoidingView behavior="position">
            <View style={{paddingTop: 15}}>
              <Image
                source={Images.logoPemda}
                style={styles.logo}
              />
            </View>

            {this.createForm()}

          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}



export default LoginScreen;
