import React from 'react';
import { observer, inject } from 'mobx-react/native';
import Spinner from '../Components/Spinner';
import styles from './Styles/LaunchScreenStyles';
import { Colors, Images } from '../Themes';
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
class SubTaxScreen extends React.Component {
  constructor(props) {
    super(props);
    const { userStore, taxStore } = this.props;
    this.user = props.userStore;
    taxStore.msg = null;
  }
  menuMonth = () => {
    const { userStore, taxStore } = this.props;
    if (taxStore.subtaxes == null) {
      taxStore.getSubTaxes(userStore.session, this.props.navigation.state.params.year, this.props.navigation.state.params.taxes);
      if (taxStore.msg == null) {
        return (<Spinner style={styles.spinner} color={Colors.fire} />);
      }
      return (
        <Text style={[styles.errorMessage, styles.center, styles.errorText]}>{taxStore.msg}</Text>
      );
    }
    console.log('tax', taxStore.subtaxes.slice());
    return (
      <List
        dataArray={taxStore
          .subtaxes
          .slice()}
        renderRow={(subtaxes) => <ListItem
          button
          onPress={() => {
            const { navigate, setParams, state } = this.props.navigation;
            navigate("SubTaxScreen", {
              title: "Pilih Sub Pajak",
              parentKey: state.key,
              subtaxes: subtaxes.id_ayt,
              year: this.props.navigation.state.params.year
            })
          }}>
          <Body>
            <Text>{subtaxes.nm_ayt}</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" style={{
              color: "#0098ff"
            }} />
          </Right>
        </ListItem>}></List>
    )
  }
}