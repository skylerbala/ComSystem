import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FormLabel, FormInput, Divider } from 'react-native-elements';
import { scale } from '../../../library/utils/ScalingAPI';
import colors from '../common/styles/colors';


export default class SettingsTab extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleStyle: { alignSelf: 'center' },
      title: 'Settings',
      headerStyle: {
        backgroundColor: colors.logoBlue
      }
    }
  };

  constructor(props) {
    super(props);
  }

  onMessageBoxIPChange(IP) {
    this.props.screenProps.handleMessageBoxIPChange(IP);
  }

  render() {
    let connectionStatus = "Not Connected";
    let connectionStatusColor = colors.red;

    if (this.props.screenProps.messageBoxIsConnected) {
      connectionStatus = "Connected";
      connectionStatusColor = colors.green;
    }

    return (
      <View style={styles.mainView}>
        <View style={styles.mainSubView}>
          <View style={styles.formView}>
            <FormLabel labelStyle={styles.formText}>Connection Status</FormLabel>
            <View style={styles.textView}>
              <Text style={{ fontSize: scale(40), color: connectionStatusColor }}>{connectionStatus}</Text>
            </View>
            <FormLabel labelStyle={styles.formText}>eMessage Box IP</FormLabel>
            <FormInput
              placeholder="None"
              autoCapitalize='none'
              autoCorrect={false}
              value={this.props.screenProps.messageBoxIP}
              onChangeText={(input) => this.onMessageBoxIPChange(input)}
            />
            <FormLabel labelStyle={styles.formText}>FAQs</FormLabel>
            <FormLabel labelStyle={styles.formText}>How do I establish a connection between the eMessage Box and my tablets?</FormLabel>
            <View style={styles.textView}>
              <Text style={styles.text}>
                Find your eMessage Box's IP address and set it in the eMessage Box IP input in Settings.
              </Text>
              <Divider style={styles.divider} />
            </View>
            <FormLabel labelStyle={styles.formText}>How do I lookup my eMessage Box IP?</FormLabel>
            <View style={styles.textView}>
              <Text style={styles.text}>
                There are several ways to lookup the eMessage Box's IP Address. One of the easiest ways to accomplish this is by using Pi Finder (Download: http://ivanx.com/raspberrypi/).
              </Text>
              <Divider style={styles.divider} />
            </View>
            <FormLabel labelStyle={styles.formText}>Which tablets support eMessage?</FormLabel>
            <View style={styles.textView}>
              <Text style={styles.text}>
                eMessage is available on all iOS, Android, and Kindle Fire platforms.
              </Text>
              <Divider style={styles.divider} />
            </View>
            <FormLabel labelStyle={styles.formText}>Questions, Comments, or Concerns?</FormLabel>
            <View style={styles.textView}>
              <Text style={styles.text}>
                Please direct all questions, comments, and/or concerns to "skyler.bala@gmail.com".
              </Text>
              <Divider style={styles.divider} />
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
  },
  formText: {
    fontSize: scale(14),
    color: colors.darkText
  },
  textView: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: scale(14),
    color: colors.gray
  },
  divider: {
    backgroundColor: colors.gray,
    marginTop: 10
  }
});