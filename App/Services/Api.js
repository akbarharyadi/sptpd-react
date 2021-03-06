// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import queryString from 'query-string'

// our "constructor"
const create = (baseURL = 'https://sptpd-api.herokuapp.com') => {
    // ------ STEP 1 ------
    //
    // Create and configure an apisauce-based api object.
    //
    const api = apisauce.create({
        // base URL is read from the "constructor"
        baseURL,
        // here are some default headers
        headers: {
            'Cache-Control': 'no-cache',
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        // 10 second timeout...
        timeout: 100000
    })

    // Wrap api's addMonitor to allow the calling code to attach additional monitors
    // in the future.  But only in __DEV__ and only if we've attached Reactotron to
    // console (it isn't during unit tests).
    if (__DEV__ && console.tron) {
        api.addMonitor(console.tron.apisauce)
    }

    // ------ STEP 2 ------
    //
    // Define some functions that call the api.  The goal is to provide a thin
    // wrapper of the api layer providing nicer feeling functions rather than "get",
    // "post" and friends.
    //
    // I generally don't like wrapping the output at this level because sometimes
    // specific actions need to be take on `403` or `401`, etc.
    //
    // Since we can't hide from that, we embrace it by getting out of the way at
    // this level.
    //
    const search = (query) => api.get('search', {
        query,
        type: 'track',
        limit: 10
    });

    const login = (username, password, simulateWrong = true) => api.post('auth/login', queryString.stringify({username: username, password: password}));

    const logout = () => {
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                resolve({ok: true, data: []})
            }, 1000);
        });
    };

    const getWp = (authKey) => api.get('api/user-data', {}, {
        headers: {
            'Authorization': 'Bearer ' + authKey
        }
    });

    const getYear = (authKey) => api.get('api/get-year', {}, {
        headers: {
            'Authorization': 'Bearer ' + authKey
        }
    });

    const getTaxes = (authKey, year) => api.post('api/get-taxes', queryString.stringify({year: year}), {
        headers: {
            'Authorization': 'Bearer ' + authKey
        }
    });

    const getSubTaxes = (authKey, year, kd_ayt) => api.post('api/get-sub-taxes', queryString.stringify({year: year, kd_ayat: kd_ayt}), {
        headers: {
            'Authorization': 'Bearer ' + authKey
        }
    });

    const getSubTaxesFromTax = (authKey, year, kd_ayt) => api.post('api/get-sub-taxes-from-tax', queryString.stringify({year: year, kd_ayat: kd_ayt}), {
        headers: {
            'Authorization': 'Bearer ' + authKey
        }
    });

    // ------ STEP 3 ------
    //
    // Return back a collection of functions that we would consider our interface.
    // Most of the time it'll be just the list of all the methods in step 2.
    //
    // Notice we're not returning back the `api` created in step 1?  That's because
    // it is scoped privately.  This is one way to create truly private scoped
    // goodies in JavaScript.
    //
    return {
        // a list of the API functions from step 2
        search,
        login,
        logout,
        getWp,
        getYear,
        getTaxes,
        getSubTaxes,
        getSubTaxesFromTax
    }
}

// let's return back our create method as the default.
export default {
    create
}