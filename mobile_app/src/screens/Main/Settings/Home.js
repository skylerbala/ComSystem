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
      }
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
    let status = "No Connection";
    if (this.props.screenProps.messageBoxIsConnected) {
      status = "Connected";
    }

    return (
      <View style={styles.mainView}>
        <View style={styles.mainSubView}>
          <View style={styles.formView}>
            <FormLabel>Connection Status</FormLabel>
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 15,
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: scale(20) }}>{status}</Text>
            </View>
            <FormLabel>eMessage Box IP</FormLabel>
            <FormInput
              placeholder="None"
              autoCapitalize='none'
              autoCorrect={false}
              value={this.props.screenProps.messageBoxIP}
              onChangeText={(input) => this.onMessageBoxIPChange(input)}
            />
            <FormLabel>Message Ringtone</FormLabel>
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 15,
                marginBottom: 5,
              }}
            >
              <RNPickerSelect
                placeholder={{
                  label: 'Select a ringtone...',
                  value: null,
                  color: '#bdc6cf',
                  fontSize: scale(30),
                }}
                style={{
                  fontColor: "#bdc6cf",
                  fontSize: scale(12),
                }}
                placeholderTextColor={"#bdc6cf"}
                items={Sounds}
                onValueChange={(value) => this.onRingtoneChange(value)}
                value={this.props.screenProps.ringtone}
                hideIcon
                useNativeAndroidPickerStyle={false}
              />
              <Divider style={{ backgroundColor: "#bdc6cf", marginTop: 10 }} />
            </View>
            <FormLabel>FAQs</FormLabel>

            <FormLabel>How do I establish a connections between the eMessage Box and my tablets?</FormLabel>
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 15,
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: scale(12) }}>
                Find your eMessage Box's IP address and set it in the Settings tab.
              </Text>
              <Divider style={{ backgroundColor: "#bdc6cf", marginTop: 10 }} />
            </View>
            <FormLabel>How do I lookup my eMessage Box IP?</FormLabel>
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 15,
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: scale(12) }}>
                There are several ways to lookup the eMessage Box's IP Address. One way to accomplish this is by using Pi Finder (Download: http://ivanx.com/raspberrypi/).
              </Text>
              <Divider style={{ backgroundColor: "#bdc6cf", marginTop: 10 }} />
            </View>
            <FormLabel>Which tablets support eMessage?</FormLabel>
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 15,
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: scale(12) }}>
                eMessage is available on all iOS, Android, and Kindle Fire platforms.
              </Text>
              <Divider style={{ backgroundColor: "#bdc6cf", marginTop: 10 }} />
            </View>
            <FormLabel>Tech Support</FormLabel>
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 15,
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: scale(12) }}>
                Please direct all questions, comments or concerns to ssbala@ucdavis.edu
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