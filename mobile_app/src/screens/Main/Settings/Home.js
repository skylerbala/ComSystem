import React from 'react';
import { View, StyleSheet, Picker, Text } from 'react-native';
import { FormLabel, FormInput, Divider } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import Sounds from '../../../assets/sounds';
import { scale } from '../../../library/utils/ScalingAPI';



export default class SettingsTab extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => {
        return (
          <View style={{
            textAlign: 'center',
          }}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: scale(14)
              }}
            >
              Settings
            </Text>
          </View>
        );
      },
      headerStyle: {
        backgroundColor: '#74d0f0'
      },
    }
  };

  constructor(props) {
    super(props);
  }

  onMessageBoxIPChange(IP) {
    this.props.screenProps.handleMessageBoxIPChange(IP);
  }

  render() {
    let pickerOptions = Sounds.map((sound) => {
      return (
        <Picker.Item key={sound.name} label={sound.name} value={sound.name} />
      )
    });
    let status = "No Connection";
    let statusColor = 'red'
    if (this.props.screenProps.messageBoxIsConnected) {
      status = "Connected";
      statusColor = '#25E832'
    }

    return (
      <View style={styles.mainView}>
        <View style={styles.mainSubView}>
          <View style={styles.formView}>
            <FormLabel labelStyle={{ fontSize: scale(14), color: "#43484D" }}>Connection Status</FormLabel>
            <View
              style={{
                marginLeft: 17.5,
                marginRight: 17.5,
              }}
            >
              <Text style={{ fontSize: scale(40), color: statusColor }}>{status}</Text>
            </View>
            <FormLabel labelStyle={{ fontSize: scale(14), color: "#43484D" }}>eMessage Box IP</FormLabel>
            <FormInput
              placeholder="None"
              autoCapitalize='none'
              autoCorrect={false}
              value={this.props.screenProps.messageBoxIP}
              onChangeText={(input) => this.onMessageBoxIPChange(input)}
            />
            <FormLabel labelStyle={{ fontSize: scale(14), color: "#43484D" }}>FAQs</FormLabel>

            <FormLabel labelStyle={{ fontSize: scale(12), color: "#43484D" }}>How do I establish a connection between the eMessage Box and my tablets?</FormLabel>
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 15,
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: scale(12), color: "#86939E" }}>
                Find your eMessage Box's IP address and set it in the eMessage Box IP input in Settings.
              </Text>
              <Divider style={{ backgroundColor: "#bdc6cf", marginTop: 10 }} />
            </View>
            <FormLabel labelStyle={{ fontSize: scale(12), color: "#43484D" }}>How do I lookup my eMessage Box IP?</FormLabel>
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 15,
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: scale(12), color: "#86939E" }}>
                There are several ways to lookup the eMessage Box's IP Address. One of the easiest ways to accomplish this is by using Pi Finder (Download: http://ivanx.com/raspberrypi/).
              </Text>
              <Divider style={{ backgroundColor: "#bdc6cf", marginTop: 10 }} />
            </View>
            <FormLabel labelStyle={{ fontSize: scale(12), color: "#43484D" }}>Which tablets support eMessage?</FormLabel>
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 15,
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: scale(12), color: "#86939E" }}>
                eMessage is available on all iOS, Android, and Kindle Fire platforms.
              </Text>
              <Divider style={{ backgroundColor: "#bdc6cf", marginTop: 10 }} />
            </View>
            <FormLabel labelStyle={{ fontSize: scale(12), color: "#43484D" }}>Questions, Comments, or Concerns?</FormLabel>
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 15,
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: scale(12), color: "#86939E" }}>
                Please direct all questions, comments, and/or concerns to "skyler.bala@gmail.com". We're always happy to help :)
              </Text>
              <Divider style={{ backgroundColor: "#bdc6cf", marginTop: 10 }} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#DAF5FE',
    flex: 1,
    padding: 10
  },
  mainSubView: {
    backgroundColor: '#2BA7D0',
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