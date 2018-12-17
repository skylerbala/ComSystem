
import React from 'react';
import { Container, Content, Button, Text, Fab, Body, Icon, alert, Header, Left, Right, Title, Form, Input, Item, Label } from 'native-base';
import DialogInput from 'react-native-dialog-input';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ColorWheel } from 'react-native-color-wheel';
import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import Modal from "react-native-simple-modal";
import ColorPalette from 'react-native-color-palette';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Onboarding from 'react-native-onboarding-swiper';






class StaffTab extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Staff',
      headerRight: (
        <Button transparent onPress={() => params.handleToggle()}>
          <Icon type="FontAwesome" name="plus" />
        </Button>
      )
    }
  };

  state = {
    isStaffFormVisible: false
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleToggle: () => this.toggleStaffFormVisibility() });
  }

  toggleStaffFormVisibility() {
    // this.setState({ isStaffFormVisible: true })
    console.log(this.state.isStaffFormVisible)
    this.props.navigation.navigate("PickColor")
  }

  addEmployee(name) {
    let data = {
      name: name
    }
    this.props.screenProps.handleAddEmployee(data);
  }

  deleteEmployee(data) {
    this.props.screenProps.handleDeleteEmployee(data);
  }

  render() {

    return (
      <Container padder>
        <Onboarding
          pages={[
            {
              backgroundColor: '#fff',
              title: 'Onboarding',
              subtitle: 'Done with React Native Onboarding Swiper',
            },
          ]}
        />
      </Container >
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 35,
    color: 'white'
  },
  deleteText: {
    color: "white"
  },
  noConnectionText: {
    textAlign: 'center',
    fontSize: 40,
    justifyContent: 'center'
  },
  deleteButton: {
    backgroundColor: '#da635d',
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0
  },
  noConnectionView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

export default StaffTab;