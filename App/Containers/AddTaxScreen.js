import React from 'react';
import { observer, inject } from 'mobx-react/native';
import Spinner from '../Components/Spinner';
import styles from './Styles/LoginScreenStyles'
import { Colors, Images } from '../Themes'
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import {
  ScrollView,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Keyboard
} from 'react-native';
import {
  Form,
  Input,
  Container,
  Label,
  Item,
  Content,
  Body,
  Right,
  List,
  ListItem,
  Text,
  Icon,
  Card,
  CardItem, Picker, ActionSheet,
} from 'native-base';
import RoundedButton from '../Components/RoundedButton';
import I18n from 'react-native-i18n'
@inject('userStore')
@inject('taxStore')
@observer
class AddTaxScreen extends React.Component {
  constructor(props) {
    super(props);
    const { userStore, taxStore } = this.props;
    this.user = props.userStore;
    console.log('year', props.navigation.state.params.year);
    this.state = {
      th_spt: props.navigation.state.params.year.toString(),
      npwpd: userStore.dataWp.npwpd,
      nm_wp: userStore.dataWp.nm_wp,
      id_ayt: "",
      rekening: "",
      list_rekening: [],
      selected: undefined,
      tgl_awal: "",
      tgl_akhir: "",
      omzet: "",
      jml_pajak: ""
    }
  }

  componentWillReact = () => {
    this.setState({ th_spt: this.props.navigation.state.params.year.toString() });
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
        text={'Simpan'}
      />
    );
  };

  renderTahunSPTField = () => {
    return (
      <Input
        ref="th_spt"
        value={this.state.th_spt}
        editable={false}
        keyboardType="default"
        returnKeyType="next"
        autoCapitalize="none"
        autoCorrect={false}
      />
    );
  }

  renderNpwpdField = () => {
    return (
      <Input
        ref="npwpd"
        value={this.state.npwpd}
        editable={false}
        keyboardType="default"
        returnKeyType="next"
        autoCapitalize="none"
        autoCorrect={false}
      />
    );
  }

  renderNamaWpField = () => {
    return (
      <Input
        ref="nm_wp"
        value={this.state.nm_wp}
        editable={false}
        keyboardType="default"
        returnKeyType="next"
        autoCapitalize="none"
        autoCorrect={false}
      />
    );
  }

  onValueChange2(value: string) {
    this.setState({
      selected: value
    });
  }
  
  renderRekeningField = () => {
    return (
      <View style={{marginLeft: 10, borderBottomWidth:1}}>
        <Picker
          mode="dropdown"
          placeholder="Pilih Jenis Rekening"
          selectedValue={this.state.selected}
          onValueChange={this.onValueChange2.bind(this)}
        >
          <Item label="Wallet" value="key0" />
          <Item label="ATM Card" value="key1" />
          <Item label="Debit Card" value="key2" />
          <Item label="Credit Card" value="key3" />
          <Item label="Net Banking" value="key4" />
        </Picker>
      </View>
    )
  }

  createForm = () => {
    return (
      <View>
        <View style={styles.form}>
          <Form>
            {this.errorMessage()}
            <Item floatingLabel>
              <Label>Tahun SPT</Label>
              {this.renderTahunSPTField()}
            </Item>
            <Item floatingLabel>
              <Label>NPWPD</Label>
              {this.renderNpwpdField()}
            </Item>
            <Item floatingLabel>
              <Label>Nama Wajib Pajak</Label>
              {this.renderNamaWpField()}
            </Item>
            {this.renderRekeningField()}
            {this.loginButton()}
          </Form>
        </View>
      </View>
    );

  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="always"
        >
          <KeyboardAvoidingView behavior="position">

            {this.createForm()}

          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    )
  }
}
export default AddTaxScreen;