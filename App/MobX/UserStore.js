
import { AsyncStorage } from 'react-native';

import { observable, createTransformer, action } from 'mobx';

import moment from 'moment';

import { persist, create } from 'mobx-persist'


import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

console.log(DebugConfig.useFixtures);

class UserStore {

  @persist @observable session = null;
  @persist @observable msg = '';
  @persist @observable dataWp = null;
  @observable hydrated = false;
  @observable fetching = false;
  @observable fetching2 = false;

  isLoggedIn() {

    return this.session;

  }


  @action hydrateComplete() {
    this.hydrated = true;

    console.log('hydrateComplete');


  }

  login(username, password) {
    
    console.log('email',username);
    console.log('password',password);
    this.fetching = true;
    api.login(username, password)
    .then((response) => {
      console.log('response login',response);
      if (response.ok) {
        this.fetching = false;
        if(response.data.status == 'success') {
          console.log('session:',response.data.token);
          this.session = response.data.token;
          this.msg = response.data.message;
        } else {
          this.session = null;
          this.msg = response.data.message;
        }
      }else{
        this.fetching = false;
        this.session = null;
        this.msg = response.problem;
      }
    })
    .catch((e) => { 
      this.fetching = false;
      this.session = null;
      console.log(e)
      this.msg = e;
    });
  }

  logout () {
    this.fetching = true;
    api.logout()
    .then((response)=>{
      this.fetching = false;
      this.session = null;
    })

  }

  getWp () {
    if (this.dataWp === null && this.session != null){
      this.fetching2 = true;
      api.getWp(this.session).then((response) => {
        console.log('response getWp ',response);
        this.fetching2 = false;
        if (response.ok) {
          this.dataWp = response.data.dataWp;
          console.log('data ok');
        } else {
          this.dataWp = null;
        }
      }).catch((e) => { 
        this.fetching2 = false;
        this.dataWp = null;
        console.log(e);
      });
    }
    console.log('data wp', this.dataWp);
    return this.dataWp;
  }

}

export default userStore = new UserStore();

const hydrate = create({ storage: AsyncStorage, jsonify: true });
hydrate('user', userStore).then(() => { userStore.hydrateComplete() });
