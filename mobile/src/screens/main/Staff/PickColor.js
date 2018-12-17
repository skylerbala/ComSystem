import React, { Component } from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import styles from '../styles/SwipeListViewStyle';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container, Content, Button, Text, Fab, Body, Icon, alert, Header, Left, Right, Title, Form, Input, Item, Label } from 'native-base';
import { ColorWheel } from 'react-native-color-wheel';
import { Col, Row, Grid } from 'react-native-easy-grid';
import colorsys from 'colorsys';
import { TextInput } from 'react-native';
import ColorPalette from 'react-native-color-palette'




class PickColorTab extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Add Staff',
      headerRight: (
        <Button transparent onPress={() => params.handleAdd()}>
          <Text>Add</Text>
        </Button>
      )
    }
  };

  state = {
    name: "",
    color: ""
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleAdd: () => this.handleAddEmployee() });
  }

  handleAddEmployee() {
    let data = {
      name: this.state.name,
      color: this.state.color
    }
    this.props.screenProps.handleAddEmployee(data);
    this.props.navigation.pop();
  }

  handleEmployeeNameInputChange(name) {
    console.log(name)
    this.setState({ name: name })
  }

  handleColorWheelInputChange(color) {
    this.setState({ color: color })
  }


  render() {
    return (
      <Container padder>
        <Grid>
          <Row size={1}>
            <Content>
              <Input
                placeholder={"Staff Name"}
                onChangeText={(text) => this.handleEmployeeNameInputChange(text)}
                value={this.state.name}
              />
            </Content>
          </Row>
          <Row size={1}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginRight: 200, marginLeft: 200 }}>
              <ColorPalette
                colors={['#980000', '#980078', '#720098', '#2B0098', '#005898', '#009498', '#00985B', '#289800', '#988B00', '#985F00', '#983900', '#FF0000', '#FF7B00', '#FFC900', '#91FF00', '#000000', '#009DFF', '#F500FF', '#1A00FF', '#006A4E', '#000759']}
                title={"Controlled Color Palette:"}
                icon={
                  <Icon type="FontAwesome" name="check" style={{color: "#FFFFFF"}} />
                }
                onChange={(color) => this.handleColorWheelInputChange(color)}
              />
            </View>
          </Row>
        </Grid >
      </Container>
    );
  }
}

export default PickColorTab;