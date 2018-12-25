
import React, { Component } from 'react';
import { Form, Item, Label, Input, Picker } from 'native-base';
import { View, StyleSheet } from 'react-native';
import Sounds from '../../../assets/sounds';


export default class SettingsTab extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Settings',
    }
  };

  constructor(props) {
    super(props);
  }

  onMessageBoxIPChange(IP) {
    this.props.screenProps.handleMessageBoxIPChange(IP);
  }

  onRingtoneChange(ringtone) {
    this.props.screenProps.handleRingtoneChange(ringtone);
  }

  render() {
    let pickerOptions = Sounds.map((sound) => {
      return (
        <Picker.Item key={sound.name} label={sound.name} value={sound.name} />
      )
    });

    return (
      <View style={styles.mainView}>
        <View style={styles.mainSubView}>
          <Form style={styles.formView}>
            <Item inlineLabel>
              <Label>eMessage Box IP</Label>
              <Input
                placeholder="None"
                autoCapitalize='none'
                autoCorrect={false}
                value={this.props.screenProps.messageBoxIP} onChangeText={(input) => this.onMessageBoxIPChange(input)}
              />
            </Item>
            <Item picker>
              <Label style={{ paddingLeft: 15 }}>Message Ringtone</Label>

              <Picker
                mode="dropdown"

                placeholder="Select Message Ringtone"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.props.screenProps.ringtone}
                onValueChange={(value) => this.onRingtoneChange(value)}
              >
                {pickerOptions}
              </Picker>
            </Item>
          </Form>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#d0e1f9',
    flex: 1,
    padding: 10
  },
  mainSubView: {
    backgroundColor: '#4d648d',
    flex: 1,
    flexDirection: 'column',
    borderRadius: 5,
    padding: 10
  },
  formView: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
  }
});