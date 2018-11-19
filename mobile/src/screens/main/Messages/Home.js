
import React, { Component } from 'react';
import { Container, Button, Content, Form, Item, Label, Input, Text, Fab, Body, Icon, alert, Header, Left, Right, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import DialogInput from 'react-native-dialog-input';
import { SwipeListView } from 'react-native-swipe-list-view';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import styles from '../../../screens/main/styles/SwipeListViewStyle';


class MessagesTab extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Messages',
      headerRight: (
        <Button transparent onPress={() => params.handleToggle()}>
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

  addStatement(statement) {
    let data = {
      statement: statement
    }
    this.props.screenProps.handleAddStatement(data);
  }

  deleteStatment(id) {
    this.props.screenProps.handleDeleteStatement(id);
  }

  toggleMessageFormVisibility() {
    this.setState({
      isMessageFormVisible: !this.state.isMessageFormVisible
    })
  }

  render() {
    let view;

    if (this.props.screenProps.connected) {
      view = (
        <Content>
          <SwipeListView
            useFlatList
            closeOnRowBeginSwipe
            disableRightSwipe
            rightOpenValue={-200}
            swipeToOpenPercent={50}
            data={this.props.screenProps.statements}
            keyExtractor={(rowData, index) => {
              return rowData.id.toString();
            }}
            renderItem={(rowData, rowMap) => (
              <View style={styles.rowFront}>
                <Text style={styles.text}>{rowData.item.statement}</Text>
              </View>
            )}
            renderHiddenItem={(rowData, rowMap) => (
              <TouchableOpacity
                style={[styles.deleteButton]}
                onPress={_ => {
                  rowMap[rowData.item.id].closeRow()
                  this.deleteStatment(rowData.item)
                }}>
                <View>
                  <Text style={[styles.text, styles.deleteText]}>Delete</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          <DialogInput
            isDialogVisible={this.state.isMessageFormVisible}
            title={"Add Message"}
            hintInput={"Name"}
            submitInput={(input) => {
              this.addStatement(input)
              this.toggleMessageFormVisibility()
            }}
            closeDialog={() => this.toggleMessageFormVisibility()}>
          </DialogInput>
        </Content>
      )
    }
    else {
      view = (
        <View style={styles.noConnectionView}>
          <Text style={styles.noConnectionText}>No Connection</Text>
        </View>
      )
    }

    return (
      <Container padder>
        {view}
      </Container >
    );
  }
}


export default MessagesTab;