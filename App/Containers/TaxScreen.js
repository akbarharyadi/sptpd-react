import React from 'react';
import {observer, inject} from 'mobx-react/native';
import Spinner from '../Components/Spinner';
import styles from './Styles/LaunchScreenStyles'
import {Colors, Images} from '../Themes'
import {
  Container,
  Content,
  Body,
  Right,
  List,
  ListItem,
  Text,
  Icon,
  Card,
  CardItem
} from 'native-base';
@inject('userStore')
@inject('taxStore')
@observer
class TaxScreen extends React.Component {
  constructor(props) {
    super(props);
    const {userStore, taxStore} = this.props;
    this.user = props.userStore;
    taxStore.taxes = null;
  }

  menuTax = () => {
    const {userStore, taxStore} = this.props;
    if (taxStore.taxes == null) {
      taxStore.getTaxes(userStore.session, this.props.navigation.state.params.year);
      return (<Spinner style={styles.spinner} color={Colors.fire}/>);
    }
    console.log('tax', taxStore.taxes.slice());
    return (
      <List
        dataArray={taxStore
        .taxes
        .slice()}
        renderRow={(taxes) => <ListItem button onPress={() => {
          const {navigate, setParams, state} = this.props.navigation
          navigate("SubTaxScreen", {
            title: "Pilih Sub Pajak",
            parentKey: state.key,
            taxes: taxes.kd_ayt,
            year: this.props.navigation.state.params.year
          })
      }}>
        <Body>
          <Text>{taxes.nm_ayt}</Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" style={{
            color: "#0098ff"
          }}/>
        </Right>
      </ListItem>}></List>
    )
  }

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>Pilih Pajak : </Text>
            </CardItem>
            <CardItem>
              {this.menuTax()}
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}
export default TaxScreen;