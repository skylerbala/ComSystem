import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Text, Card, FormLabel, FormInput } from 'react-native-elements';
import { Container, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { SwipeListView } from 'react-native-swipe-list-view';
import NoConnectionView from '../common/components/NoConnectionView';
import Modal from "react-native-modal";
import tinycolor from 'tinycolor2';

export default class MainPanel extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    isModalVisible: false,
    newMessageName: null,
    newMessageContent: [],
    newMessageColor: null,
  }

  constructor(props) {
    super(props);
    this.onSendMessage = this.onSendMessage.bind(this);
    this.onDeleteMessage = this.onDeleteMessage.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  onSendMessage() {
    let data = {
      name: this.state.newMessageName,
      content: this.state.message.join(' '),
      color: this.state.newMessageColor
    }

    this.props.screenProps.handleSendMessage(data);

    this.hideModal();
  }

  onDeleteMessage(data) {
    this.props.screenProps.handleDeleteMessage(data);
  }

  toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  hideModal() {
    this.setState({ isModalVisible: false });
  }

  render() {
    let mainPanelView = <NoConnectionView />;

    let statements1 = this.props.screenProps.statements.map((statement) => {
      return (
        <TouchableOpacity
          key={statement.id}

          style={{
            margin: 5,
            height: 46,
            width: 190,
            borderRadius: 5,
            padding: 5,
            backgroundColor: 'blue',
            color: 'white'

          }}
          onPress={() => {
            statement.selected = !statement.selected;
            if (statement.selected) {
              this.state.newMessageContent.push(statement.statement);
            }
            else {
              this.state.newMessageContent = this.state.newMessageContent.filter((message) => {
                return message != statement.statement;
              });
            }
          }}
        >
          <Text style={{
            fontSize: 25,
            fontWeight: '600', color: 'white', alignSelf: 'center'
          }}>{statement.statement}</Text>
        </TouchableOpacity>
      )
    });

    let statements2 = this.props.screenProps.statements.map((statement) => {
      return (
        <TouchableOpacity
          key={statement.id}

          style={{
            margin: 5,
            height: 46,
            width: 190,
            borderRadius: 5,
            padding: 5,
            backgroundColor: 'red',
          }}
          onPress={() => {
            statement.selected = !statement.selected;
            if (statement.selected) {
              this.state.newMessageContent.push(statement.statement);
            }
            else {
              this.state.newMessageContent = this.state.newMessageContent.filter((message) => {
                return message != statement.statement;
              });
            }
          }}
        >
          <Text style={{
            fontSize: 25,
            fontWeight: '600', color: 'white', alignSelf: 'center'
          }}>{statement.statement}</Text>
        </TouchableOpacity>
      )
    });

    let employeeButtons = this.props.screenProps.employees.map((employee) => {
      return (
        <TouchableOpacity
          key={employee.id}

          style={{
            backgroundColor: employee.color,
            margin: 5,
            height: 46,
            width: 150,
            borderRadius: 5,
            padding: 5,
          }}
          onPress={() => {
            // this.props.navigation.navigate("SendMessage", {
            //   newMessageName: employee.newMessageName,
            //   color: employee.color
            // })
            this.setState({ newMessageName: employee.name, color: employee.color })
            this.toggleModal();
          }}
        >
          <Text style={{ fontSize: 25, color: 'white', alignSelf: 'center' }}>{employee.name}</Text>
        </TouchableOpacity>
      )
    });

    if (this.props.screenProps.connected) {
      mainPanelView = (
        <Grid>
          <Row size={2.5} style={styles.rowContainer}>
            <ScrollView contentContainerStyle={{ flex: 1, flexDirection: 'column', margin: 10 }}>
              <View>
                <SwipeListView
                  useFlatList
                  closeOnRowBeginSwipe
                  disableRightSwipe
                  rightOpenValue={-200}
                  stopRightSwipe={-200}
                  swipeToOpenPercent={50}
                  data={this.props.screenProps.messages}
                  keyExtractor={(rowData, index) => {
                    return rowData.id.toString();
                  }}
                  renderItem={(rowData, rowMap) => (
                    <View style={{
                      backgroundColor: rowData.item.color,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 65,
                      borderRadius: 10,
                      marginBottom: 15,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}>
                      <View style={{ flex: 8, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={styles.text}>
                          {rowData.item.name}: {rowData.item.statement}
                        </Text>
                      </View>
                      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text style={styles.timeText}>
                          {rowData.item.timeElapsed}
                        </Text>
                      </View>
                    </View>
                  )}
                  renderHiddenItem={(rowData, rowMap) => (
                    <View style={styles.messagesRowBack}>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => {
                          rowMap[rowData.item.id].closeRow();
                          this.onDeleteMessage(rowData.item);
                        }}
                      >
                        <Text style={styles.deleteButtonText}>
                          Delete
                  </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
                <Modal isVisible={this.state.isModalVisible} onBackdropPress={this.hideModal}
                >
                  <Card
                    title={"Send Message"}
                  >
                    <View>
                      <Text>Messages 1</Text>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {statements1}
                      </View>
                      <Text>Messages 2</Text>

                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {statements2}
                      </View>
                    </View>
                    <View style={{ height: 75, backgroundColor: tinycolor(this.state.newMessageColor).toHslString(), padding: 10, justifyContent: 'center', margin: 10 }}>
                      <Text style={{ fontSize: 40, color: 'white', }}>{this.state.newMessageName}: {this.props.navigation.getParam('newMessageName')} {this.state.newMessageContent.join(' ')}
                      </Text>
                    </View>
                    <Button
                      raised
                      title='Send'
                      onPress={this.onSendMessage}
                    />
                  </Card>
                </Modal>
              </View>
            </ScrollView>
          </Row>
          <Row size={1} style={styles.rowContainer}>
            <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
              {employeeButtons}
            </ScrollView>
          </Row>
        </Grid>

      )
    }

    return (
      <Container style={{ backgroundColor: '#dce9ef', margin: 10 }}>
        {mainPanelView}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    backgroundColor: '#91bbd1',
    margin: 10,
    borderRadius: 10
  },
  messagesTimer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  messagesRowBack: {
    flex: 1,
    marginBottom: 15,
  },
  deleteButton: {
    backgroundColor: '#da635d',
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    borderRadius: 10
  },
  deleteButtonText: {
    color: "white",
    justifyContent: 'center',
    fontSize: 40,
  },
  text: {
    fontSize: 50,
    fontWeight: '600',
    color: 'white',
    flex: 1,
    flexWrap: 'wrap'
  },
  timeText: {
    fontSize: 25,
    color: 'white'
  },
  staffButtonText: {
    fontSize: 40,
    color: 'white',
    flex: 1,
    textAlign: 'center'
  }
});