
import React, { Component } from 'react';
import { Container, Button, Content, Form, Item, Label, Input, Text, Fab, Body, Icon, alert, Header, Left, Right, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import DialogInput from 'react-native-dialog-input';
import { SwipeListView } from 'react-native-swipe-list-view';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

class MessagesTab extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Messages',
      headerRight: (
        <Button transparent onPress={() => params.handleToggle() }>
          <Icon type="FontAwesome" name="plus" />
        </Button>
      )
    }
  };

  state = {
    isMessageFormVisible: false
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleToggle: () => this.toggleMessageFormVisibility() });
  }

  addMessage(message) {
    this.props.screenProps.onMessageOptionsAdd(message);
  }

  deleteMessage(id) {
    this.props.screenProps.onMessageOptionsDelete(id);
  }

  toggleMessageFormVisibility() {
    this.setState({
      isMessageFormVisible: !this.state.isMessageFormVisible
    })
  }

  render() {
    return (
      <Container padder>
        <SwipeListView
          useFlatList={true}
          closeOnRowBeginSwipe
          disableRightSwipe
          data={this.props.screenProps.messageOptions}
          renderItem={(rowData, rowMap) => (
            <View style={styles.rowFront}>
              <Text style={styles.text}>{rowData.item.message}</Text>
            </View>
          )}
          renderHiddenItem={(rowData, rowMap) => (
            <View style={styles.rowBack}>
              <TouchableOpacity style={styles.backRightBtn} onPress={_ => {
                rowMap[rowData.item.key].closeRow()
                this.deleteMessage(rowData.item.id)
              }}>
                <Text style={[styles.text, styles.deleteText]}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          rightOpenValue={-200}
        />
        <DialogInput 
          isDialogVisible={this.state.isMessageFormVisible}
          title={"Add Message"}
          hintInput={"Name"}
          submitInput={(input) => {
            this.addMessage(input)
            this.toggleMessageFormVisibility()
          }}
          closeDialog={() => this.toggleMessageFormVisibility()}>
        </DialogInput>
      </Container >
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
  },
  deleteText: {
    color: "white"
  },
	rowFront: {
		backgroundColor: 'white',
		borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    borderRightColor: '#CCC',
    paddingLeft: 15,
		borderRightWidth: 1,
		justifyContent: 'center',
		height: 100,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
    paddingLeft: 15,
	},
	backRightBtn: {
		backgroundColor: 'red',
    width: 200,
    alignItems: 'center',
		justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0
	},
});


export default MessagesTab;