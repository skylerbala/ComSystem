
import React, { Component } from 'react';
import { Container, Button, Content, Form, Item, Label, Input, Picker, Text, Fab, Body, Icon, alert, Header, Left, Right, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import DialogInput from 'react-native-dialog-input';
import { SwipeListView } from 'react-native-swipe-list-view';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import styles from '../../../screens/main/styles/SwipeListViewStyle';
import Sounds from '../../../assets/sounds';


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

  handleRingChange(ring) {
    this.props.screenProps.handleRingChange(ring);
  }

  render() {
    let pickerOptions = Sounds.map((sound) => {
      console.log(sound)
      return (
        <Picker.Item label={sound.name} value={sound.name} />
      )
    });

    return (
      <Container>
        <Content>
          <Form>
            <Item inlineLabel>
              <Label>Raspberry Pi IP</Label>
              <Input placeholder="None" autoCapitalize='none' value={this.props.screenProps.endpoint} onChangeText={(input) => this.handleIPChange(input)} />
            </Item>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                placeholder="Select ring tone"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.props.screenProps.ring}
                onValueChange={(value) => this.handleRingChange(value)}
              >
                {pickerOptions}
              </Picker>
            </Item>
          </Form>
          
        </Content>
      </Container>
    );
  }
}


export default SettingsTab;