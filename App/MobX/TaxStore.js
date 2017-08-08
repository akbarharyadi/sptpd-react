import {AsyncStorage} from 'react-native';

import {observable, createTransformer, action} from 'mobx';

import moment from 'moment';

import {persist, create} from 'mobx-persist'

import API from '../Services/Api'

const api = API.create()

class TaxStore {

  @observable fetching = false;
  @observable years = null;
  @observable taxes = null;
  @observable subtaxes = null;
  @observable msg = null;
  @observable hydrated = false;

  taxYear(authKey) {
    console.log('tax store', authKey);
    api
      .getYear(authKey)
      .then((response) => {
        console.log('response Years', response.data.dataYear);
        if (response.ok) {
          if (response.data.status == 'success') {
            this.years = response.data.dataYear;
          } else {
            this.msg = response.data.msg;
          }
        } else {
          this.msg = response.problem;
        }
      })
      .catch((e) => {
        this.msg = e;
      });
  }

  getTaxes(authkey, year) {
    api
      .getTaxes(authkey, year)
      .then((response) => {
        console.log('response taxes', response);
        if (response.ok) {
          if (response.data.status == 'success') {
            this.taxes = response.data.dataTaxes;
          } else {
            this.msg = response.data.msg;
          }
        } else {
          this.msg = response.problem;
        }
      })
      .catch((e) => {
        this.msg = e;
      });
  }

  getSubTaxes(authkey, year, kd_ayt) {
    console.log('year', year);
    console.log('kd_ayt', kd_ayt);
    api
      .getSubTaxes(authkey, year, kd_ayt)
      .then((response) => {
        console.log('response sub taxes', response);
        if (response.ok) {
          if (response.data.status == 'success') {
            this.subtaxes = response.data.dataSubTaxes;
          } else {
            this.msg = response.data.msg;
          }
        } else {
          this.msg = response.problem;
        }
      })
      .catch((e) => {
        this.msg = e;
      });
  }
}

export default taxStore = new TaxStore();
