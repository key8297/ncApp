import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, View, Button, Left, Right, Icon, Card, CardItem, cardBody, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import SideMenu from '../component/SideMenu';
import SideMenuDrawer from '../component/SideMenuDrawer';
import CategoryBlock from '../component/CategoryBlock';

const api = require('./../services/api');

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentWillMount() {
    let cat = [];

    api.post('/category/search', {})
      .then(response => {
        this.setState({categories: response.data});
      })
  }

  render() {
    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => this._sideMenuDrawer.open()} transparent>
          <Icon name='ios-menu-outline' />
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
      <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
        <Container>
          <Navbar left={left} right={right} title="MY STORE" />
          <Content>
            {this.renderCategories()}
          </Content>
        </Container>
      </SideMenuDrawer>
    );
  }

  renderCategories() {
    let categories = this.state.categories;
    let cat = [];
    for (let i = 0; i < categories.length; i++) {
      cat.push(
        <CategoryBlock key={categories[i].code} id={categories[i]._id} image={categories[i].largePhoto} title={categories[i].description} />
      );
    }
    return cat;
  }
}

// var categories = [
//   {
//     id: 1,
//     title: 'MEN',
//     image: 'https://res.cloudinary.com/atf19/image/upload/c_scale,w_489/v1500284127/pexels-photo-497848_yenhuf.jpg'
//   },
//   {
//     id: 2,
//     title: 'WOMEN',
//     image: 'https://res.cloudinary.com/atf19/image/upload/c_scale,w_460/v1500284237/pexels-photo-324030_wakzz4.jpg'
//   },
//   {
//     id: 3,
//     title: 'KIDS',
//     image: 'https://res.cloudinary.com/atf19/image/upload/c_scale,w_445/v1500284286/child-childrens-baby-children-s_shcevh.jpg'
//   },
//   {
//     id: 4,
//     title: 'ACCESORIES',
//     image: 'https://res.cloudinary.com/atf19/image/upload/c_scale,w_467/v1500284346/pexels-photo-293229_qxnjtd.jpg'
//   }
//];
