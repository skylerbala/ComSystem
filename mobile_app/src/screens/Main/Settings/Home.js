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
          <Text style={{ fontWeight: '600' }}>
            Settings
          </Text>
        );
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
    console.log("Settings")
    let pickerOptions = Sounds.map((sound) => {
      return (
        <Picker.Item key={sound.name} label={sound.name} value={sound.name} />
      )
    });
    let status = "No Connection";
    let statusColor = 'red'
    if (this.props.screenProps.messageBoxIsConnected) {
      status = "Connected";
      statusColor = 'green'
    }

    return (
      <View style={styles.mainView}>
        <View style={styles.mainSubView}>
          <View style={styles.formView}>
            <FormLabel labelStyle={{ fontSize: scale(16) }}>Connection Status</FormLabel>
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 15,
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: scale(40), color: statusColor, borderRadius: 5 }}>{status}</Text>
            </View>
            <FormLabel labelStyle={{ fontSize: scale(16) }}>eMessage Box IP</FormLabel>
            <FormInput
              placeholder="None"
              autoCapitalize='none'
              autoCorrect={false}
              value={this.props.screenProps.messageBoxIP}
              onChangeText={(input) => this.onMessageBoxIPChange(input)}
            />
            <FormLabel labelStyle={{ fontSize: scale(16) }}>FAQs</FormLabel>

            <FormLabel labelStyle={{ fontSize: scale(16) }}>How do I establish a connection between the eMessage Box and my tablets?</FormLabel>
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 15,
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: scale(16) }}>
                Find your eMessage Box's IP address and set it in eMessage Box IP input above in the tab.
              </Text>
              <Divider style={{ backgroundColor: "#bdc6cf", marginTop: 10 }} />
            </View>
            <FormLabel labelStyle={{ fontSize: scale(16) }}>How do I lookup my eMessage Box IP?</FormLabel>
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 15,
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: scale(16) }}>
                There are several ways to lookup the eMessage Box's IP Address. One way to accomplish this is by using Pi Finder (Download: http://ivanx.com/raspberrypi/).
              </Text>
              <Divider style={{ backgroundColor: "#bdc6cf", marginTop: 10 }} />
            </View>
            <FormLabel labelStyle={{ fontSize: scale(16) }}>Which tablets support eMessage?</FormLabel>
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 15,
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: scale(16) }}>
                eMessage is available on all iOS, Android, and Kindle Fire platforms.
              </Text>
              <Divider style={{ backgroundColor: "#bdc6cf", marginTop: 10 }} />
            </View>
            <FormLabel labelStyle={{ fontSize: scale(16) }}>Tech Support</FormLabel>
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 15,
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: scale(16) }}>
                Please direct all questions, comments or concerns to skyler.bala@gmail.com
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