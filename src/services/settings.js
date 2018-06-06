//const webApiPath = 'https://ncstore.herokuapp.com';
import { AsyncStorage } from 'react-native';
const webApiPath = 'http://localhost:8000';
const q = require('q');


module.exports = {

    getDivision() {
        let deferred = q.defer();
        AsyncStorage.getItem('@division', (err, division) => {
            deferred.resolve(division);
        });
        return deferred.promise;
    },

     setDivision(division) {
        AsyncStorage.setItem('@division', division);
    },

    getDomain() {
        let deferred = q.defer();

        AsyncStorage.getItem('@domain', (err, domain) => {
            deferred.resolve(domain?domain:webApiPath);
        });

        return deferred.promise;
    },

    async setDomain(domain) {
        await AsyncStorage.setItem('@domain', domain);
    },

}