
/**
* This is the Login Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Container, View, Left, Right, Button, Icon, Item, Input } from 'native-base';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import api from '../services/api'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'batman2@gmail.com',
      password: 'batman2',
      hasError: false,
      errorText: ''
    };
  }

  login() {
    api.post('/login',
      {
        email: this.state.username,
        password: this.state.password
      })
      .then(async (response) => {
        let t = await AsyncStorage.setItem('@token', response.data.token);
        let d = await AsyncStorage.setItem('@division', response.data.division);
        console.log('Login success : ', token);
      })
      .catch(err => {
        console.log('Login error : ', err);
        
        this.setState({ hasError: true, errorText: 'Invalid username or password !' });
      });
  }

  render() {
    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => Actions.pop()} transparent>
          <Icon name='ios-arrow-back' />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{ flex: 1 }}>
        <Button onPress={() => Actions.search()} transparent>
          <Icon name='ios-search-outline' />
        </Button>
        <Button onPress={() => Actions.cart()} transparent>
          <Icon name='ios-cart' />
        </Button>
      </Right>
    );
    return (
      <Container style={{ backgroundColor: '#fdfdfd' }}>
        <Navbar left={left} right={right} title="LOGIN" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50 }}>
          <View style={{ marginBottom: 35, width: '100%' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'left', width: '100%', color: Colors.navbarBackgroundColor }}>Welcome back, </Text>
            <Text style={{ fontSize: 18, textAlign: 'left', width: '100%', color: '#687373' }}>Login to continue </Text>
          </View>
          <Item>
            <Icon active name='ios-person' style={{ color: "#687373" }} />
            <Input placeholder='Username' value='batman2@gmail.com' onChangeText={(text) => this.setState({ username: text })} placeholderTextColor="#687373" />
          </Item>
          <Item>
            <Icon active name='ios-lock' style={{ color: "#687373" }} />
            <Input placeholder='Password' value='batman2' onChangeText={(text) => this.setState({ password: text })} secureTextEntry={true} placeholderTextColor="#687373" />
          </Item>
          {this.state.hasError ? <Text style={{ color: "#c0392b", textAlign: 'center', marginTop: 10 }}>{this.state.errorText}</Text> : null}
          <View style={{ alignItems: 'center' }}>
            <Button onPress={() => this.login()} style={{ backgroundColor: Colors.navbarBackgroundColor, marginTop: 20 }}>
              <Text style={{ color: '#fdfdfd' }}>Login</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }


}
