// React native and others libraries imports
import React, { Component } from 'react';
import { Image, Dimensions, TouchableOpacity } from 'react-native';
import { View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
// Our custom files and classes import
import Text from './Text';

const settings = require('./../services/settings');

export default class CategoryBlock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      division: '',
      domain: ''
    }
  }

  componentWillMount() {
    settings.getDomain().then(domain => this.setState({ domain }));
    settings.getDivision().then(division => this.setState({ division }));
  }

  render() {
    let url = this.state.domain + '/category/image?largephoto=1&division=' + this.state.division + '&category=';

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={this._onPress.bind(this)}
          activeOpacity={0.9}
        >
          <View>
            {/* <Image style={styles.image} source={{uri: url +  this.props.id}} /> */}
            <Image style={styles.image} source={{ uri: url + this.props.id }} />
            <View style={styles.overlay} />
            <View style={styles.border} />
            <View style={styles.text}>
              <Text style={styles.title}>{this.props.title}</Text>
              <Text style={styles.subtitle}>Shop Now</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _onPress() {
    Actions.category({ id: this.props.id, title: this.props.title });
  }
}

const styles = {
  text: {
    width: Dimensions.get('window').width,
    height: 200,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#fdfdfd',
    fontSize: 32
  },
  subtitle: {
    textAlign: 'center',
    color: '#fdfdfd',
    fontSize: 16,
    fontWeight: '100',
    fontStyle: 'italic'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(30, 42, 54, 0.4)'
  },
  border: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(253, 253, 253, 0.2)'
  },
  image: {
    height: 200,
    width: null,
    flex: 1
  }
};
