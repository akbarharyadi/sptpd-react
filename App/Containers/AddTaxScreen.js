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
  Keyboard,
  Alert
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
  InputGroup,
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
    taxStore.subtaxesfromtax = null;
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
      jml_pajak: "",
      tarif: ""
    }
  }

  componentWillReact = () => {
    this.setState({ th_spt: this.props.navigation.state.params.year.toString() });
  }

  handleSubmit = () => {

    // Works on both iOS and Android
    Alert.alert(
      'Information',
      'Database access denied',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )

    // const { userStore } = this.props;

    // const { user, password } = this.state;

    // taxStore.saveData(user, password);

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

  onValueChange2 = (value) => {
    this.setState({
      selected: value
    });
  }

  setTaxes = (text) => {
    const { userStore, taxStore } = this.props;
    this.setState({id_ayt: text});
    var tarif = taxStore.subtaxesfromtax.filter(function (taxes) { return taxes.id_ayt == text });
    console.log('tarif', tarif[0].tarifpr);
    this.setState({tarif: tarif[0].tarifpr});
  }

  renderRekeningField = () => {
    const { userStore, taxStore } = this.props;
    if (taxStore.subtaxesfromtax == null) {
      console.log('kd ayat screen', this.props.navigation.state.params.taxes);
      taxStore.getSubTaxesFromTax(userStore.session, this.props.navigation.state.params.year, this.props.navigation.state.params.taxes);
      return (<Spinner style={styles.spinner} color={Colors.fire} />);
    }
    return (
      <View style={{ marginLeft: 10, marginTop: 5, borderBottomWidth: 1, borderBottomColor: '#e7e7e7' }}>
        <Picker
          mode="dropdown"
          placeholder="Pilih Jenis Rekening"
          selectedValue={this.state.id_ayt}
          onValueChange={(text) => this.setTaxes(text)}
        >
          <Item value={0} label={' -- Pilih Jenis Rekening -- '} key={999} />
          {taxStore.subtaxesfromtax.slice().map((l, i) => { return <Item value={l.id_ayt} label={l.nm_ayt} key={i} /> })}
        </Picker>
      </View>
    )
  }

  renderPeroidField = () => {
    return (
      <View style={{ marginLeft: 10, marginTop: 15, borderBottomWidth: 1, borderBottomColor: '#e7e7e7' }}>
        <InputGroup>
          <DatePicker
            date={this.state.tgl_awal}
            mode="date"
            placeholder="Pilih Periode Awal"
            format="DD-MM-YYYY"
            confirmBtnText="Ok"
            cancelBtnText="Batal"
            androidMode="spinner"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36,
                borderWidth: 0
              }
            }}
            onDateChange={(date) => {
              this.setState({ tgl_awal: date });
              var parts = date.split('-');
              var now = new Date(parts[2], parts[1] - 1, parts[0]);
              var lastDayOfTheMonth = new Date(1900 + now.getYear(), now.getMonth() + 1, 0);
              if (date != '') {
                this.setState({ tgl_akhir: lastDayOfTheMonth });
              }
            }}
          />
          <DatePicker
            date={this.state.tgl_akhir}
            mode="date"
            placeholder="Pilih Periode Akhir"
            format="DD-MM-YYYY"
            confirmBtnText="Ok"
            cancelBtnText="Batal"
            androidMode="spinner"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36,
                borderWidth: 0
              }
            }}
            onDateChange={(date) => { 
              this.setState({ tgl_akhir: date }) 
            }}
          />
        </InputGroup>
      </View>
    )
  }

  calculateOmzet = (text) => {
    this.setState({omzet: text});
    console.log('tarif', this.state.tarif);
    var jml_pajak = parseFloat(text) * parseFloat(this.state.tarif);
    console.log('jml_numeric', jml_pajak);
    console.log('jml_string', jml_pajak.toString());
    this.setState({jml_pajak: jml_pajak});
  }

  renderOmzetField = () => {
    return (
      <Input
        ref="omzet"
        value={this.state.omzet}
        editable={true}
        keyboardType = 'numeric'
        returnKeyType="next"
        autoCapitalize="none"
        onChangeText = {(text)=> this.calculateOmzet(text) }
        autoCorrect={false}
      />
    );
  }


  renderJmlPajakField = () => {
    return (
      <Input
        ref="jml_pajak"
        value={this.state.jml_pajak.toString()}
        editable={false}
        keyboardType = 'default'
        returnKeyType="next"
        autoCapitalize="none"
        autoCorrect={false}
      />
    );
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
            {this.renderPeroidField()}
            <Item floatingLabel>
              <Label>Omzet</Label>
              {this.renderOmzetField()}
            </Item>
            <Item floatingLabel>
              <Label>Jumlah Pajak</Label>
              {this.renderJmlPajakField()}
            </Item>
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