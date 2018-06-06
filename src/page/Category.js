/**
* This is the Main file
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Container, Content, View, Left, Right, Button, Icon, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import SideMenu from '../component/SideMenu';
import SideMenuDrawer from '../component/SideMenuDrawer';
import Product from '../component/Product';

const api = require('./../services/api');
const settings = require('./../services/settings');



export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentWillMount() {
    let data = { category: this.props.id };

    api.post('/item/search', data)
      .then(async response => {
        let items = response.data;
        let division = await settings.getDivision();
        let url = await settings.getDomain() + '/item/image?largephoto=1&division=' + division + '&item=';

        for (let i = 0; i < items.length; i++) {
          items[i] = Object.assign({}, items[i], { image: url + items[i]._id })
        }
        this.setState({ items });
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
        <Container style={{ backgroundColor: '#fdfdfd' }}>
          <Navbar left={left} right={right} title={this.props.title} />
          <Content padder>
            {this.renderProducts()}
          </Content>
        </Container>
      </SideMenuDrawer>
    );
  }

  renderProducts() {
    let items = [];
    let stateItems = this.state.items
    for (var i = 0; i < stateItems.length; i += 2) {
      if (stateItems[i + 1]) {
        items.push(
          <Grid key={i}>
            <Product key={stateItems[i].id} product={stateItems[i]} />
            <Product key={stateItems[i + 1].id} product={stateItems[i + 1]} isRight />
          </Grid>
        );
      }
      else {
        items.push(
          <Grid key={i}>
            <Product key={stateItems[i].id} product={stateItems[i]} />
            <Col key={i + 1} />
          </Grid>
        );
      }
    }
    return items;
  }
}
