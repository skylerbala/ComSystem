
import React, { Component } from 'react';
import { Container, Content, Form, Item, Label, Input, Text, Fab, Body, Icon, alert, Header, Left, Right, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import DialogInput from 'react-native-dialog-input';
import { SwipeListView } from 'react-native-swipe-list-view';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import styles from '../../../screens/Main/styles/SwipeListViewStyle';
import NoConnectionView from '../common/components/NoConnectionView';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import Modal from "react-native-modal";


class MessagesTab extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Messages',
    }
  };

  state = {
    isModalVisible: false,
    message: "",
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleToggle: () => this._toggleModal() });
  }

  _addStatement() {
    let data = {
      statement: this.state.message
    }
    this.props.screenProps.handleAddStatement(data);
    this._toggleModal();
  }

  deleteStatment(id) {
    this.props.screenProps.handleDeleteStatement(id);
  }

  _toggleModal() {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    })
  }

  render() {
    let view;

    if (this.props.screenProps.connected) {
      view = (
        <Grid style={styles.gridContainer}>
          <Col size={1}>
            <Card
              title={"Messages 1"}
            >
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
              <Button
                title={"Add New Message"}
                color={'black'}
                style={{
                  margin: 10
                }}
                onPress={() => this._toggleModal()}
              />
            </Card>
          </Col>
          <Col size={1}>
            <Card
              title={"Messages 2"}
            >
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
              <Button
                title={"Add New Message"}
                color={'black'}
                style={{
                  margin: 10
                }}
                onPress={() => this._toggleModal()}
              />
            </Card>
          </Col>

          <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.setState({ isModalVisible: false })}
          >
            <Card
              title={"Add Message"}
            >
              <FormLabel>New Message</FormLabel>
              <FormInput onChangeText={(message) => this.setState({ message: message })} />
              <Button
                raised
                title='Add'
                onPress={() => {
                  this._addStatement();
                }}
                style={{
                  margin: 10
                }}
              />
            </Card>
          </Modal>
        </Grid>
      )
    }
    else {
      view = (
        <NoConnectionView />
      )
    }

    return (
      <Container style={{ backgroundColor: '#dce9ef' }}>
        {view}
      </Container >
    );
  }
}


export default MessagesTab;