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
class YearScreen extends React.Component {
  constructor(props) {
    super(props);
    const {userStore, taxStore} = this.props;
    this.user = props.userStore;
    taxStore.years = null;
  }

  menuYears = () => {
    const {userStore, taxStore} = this.props;
    if (taxStore.years == null) {
      taxStore.taxYear(userStore.session);
      return (<Spinner style={styles.spinner} color={Colors.fire}/>);
    }
    console.log('year', taxStore.years.slice());
    return (
      <List
        dataArray={taxStore
        .years
        .slice()}
        renderRow={(year) => <ListItem button onPress={() => {
          const {navigate, setParams, state} = this.props.navigation
          navigate("TaxScreen", {
            title: "Pilih Pajak",
            parentKey: state.key,
            year: year.tahun
          })
      }}>
        <Body>
          <Text>{year.tahun}</Text>
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
              <Text>Pilih Tahun Pajak : </Text>
            </CardItem>
            <CardItem>
              {this.menuYears()}
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}
export default YearScreen;