
import React, { Component } from 'react';
import { Container, Button, Content, Form, Item, Label, Input, Text, Fab, Body, Icon, alert, Header, Left, Right, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import DialogInput from 'react-native-dialog-input';
import { SwipeListView } from 'react-native-swipe-list-view';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import styles from '../../../library/styles/SwipeListViewStyles';


class SettingsTab extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Settings',
    }
  };


  constructor(props) {
    super(props);
  }

  handleIPChange(IP) {
    this.props.screenProps.handleIPChange(IP);
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item inlineLabel>
              <Label>Raspberry Pi IP</Label>
              <Input placeholder="None" autoCapitalize='none' value={this.props.screenProps.endpoint} onChangeText={(input) => this.handleIPChange(input)} />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}


export default SettingsTab;