const axios = require('axios');
//const webApiPath = 'https://ncstore.herokuapp.com';
const webApiPath = 'http://localhost:8000';
const q = require('q');
import { AsyncStorage } from 'react-native';

module.exports = {
     post(route, body = {}, skipToken) {
        let deferred = q.defer();
        AsyncStorage.setItem('@domain', webApiPath);
        AsyncStorage.getItem('@token', (err, token) => {
            if(!token) token = '';

            axios(
                {
                    url : webApiPath + route,
                    headers: {
                        'content-Type': 'application/json',
                        authorization: 'bearer ' + token
                    },
                    method: 'POST',
                    data:body
                })
                .then(response => 
                    deferred.resolve(response)
                );
        });
        return deferred.promise;
        //const division = await AsyncStorage.getItem('@division');

        // if(division){
        //     body = Object.assign({}, body, {division})
        // }


    },
}