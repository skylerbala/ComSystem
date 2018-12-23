import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { Container } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import { SwipeListView } from 'react-native-swipe-list-view';
import NoConnectionView from '../common/components/NoConnectionView';
import Modal from "react-native-modal";
import tinycolor from 'tinycolor2';
import Button from '../common/components/Button'

export default class MainPanel extends Component {
  static navigationOptions = {
    title: "eMessage"
  }

  state = {
    isModalVisible: false,
    message: {
      name: null,
      content: [],
      color: null
    }
  }

  constructor(props) {
    super(props);
    this.onSendMessage = this.onSendMessage.bind(this);
    this.onDeleteMessage = this.onDeleteMessage.bind(this);
    this.showModal = this.showModal.bind(this);
    this.resetState = this.resetState.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  onSendMessage() {
    let newMessage = this.state.message;
    newMessage.content = newMessage.content.join(' ');
    this.props.screenProps.handleSendMessage(newMessage);

    this.resetState();
  }

  onDeleteMessage(message) {
    this.props.screenProps.handleDeleteMessage(message);
  }

  showModal() {
    this.setState({ isModalVisible: true });
  }

  resetState() {
    this.setState({ isModalVisible: false }, () => {
      this.setState({
        message: {
          name: null,
          content: [],
          color: null
        }
      });
    });
  }


  render() {
    let mainPanelView = <NoConnectionView />;
    let modal = null

    if (this.props.screenProps.isConnected) {

      const employeeButtons = this.props.screenProps.employees.map((employee) => {
        return (
          <TouchableOpacity
            key={employee.id}
            style={[styles.employeeButtons, { backgroundColor: employee.color }]}
            onPress={() => {
              this.setState({ message: { name: employee.name, content: [], color: employee.color } });
              this.showModal();
            }}
          >
            <Text style={{ fontSize: 25, color: 'white', alignSelf: 'center' }}>{employee.name}</Text>
          </TouchableOpacity>
        )
      });

      const expressions1 = this.props.screenProps.expressions.filter((expression) => expression.type == 1).map((expression) => {
        return (
          <TouchableOpacity
            key={expression.id}
            style={[styles.expressionButton, { backgroundColor: "#91bbd1" }]}
            onPress={() => {
              expression.selected = !expression.selected;
              if (expression.selected) {
                this.setState({
                  message: {
                    name: this.state.message.name,
                    content: [...this.state.message.content, expression.content],
                    color: this.state.message.color,
                  }
                });
              }
              else {
                let newContent = this.state.message.content.filter((content) => {
                  return content != expression.content;
                });
                this.setState({
                  message: {
                    name: this.state.message.name,
                    content: newContent,
                    color: this.state.message.color,
                  }
                });
              }
            }}
          >
            <Text style={styles.expressionsText}>{expression.content}</Text>
          </TouchableOpacity>
        );
      });

      const expressions2 = this.props.screenProps.expressions.filter((expression) => expression.type == 2).map((expression) => {
        return (
          <TouchableOpacity
            key={expression.id}
            style={[styles.expressionButton, { backgroundColor: "#478375" }]}
            onPress={() => {
              expression.selected = !expression.selected;
              if (expression.selected) {
                this.setState({
                  message: {
                    name: this.state.message.name,
                    content: [...this.state.message.content, expression.content],
                    color: this.state.message.color
                  }
                });
              }
              else {
                let newContent = this.state.message.content.filter((content) => {
                  return content != expression.content;
                });
                this.setState({
                  message: {
                    name: this.state.message.name,
                    content: newContent,
                    color: this.state.message.color,
                  }
                });

              }
            }}
          >
            <Text style={styles.expressionsText}>{expression.content}</Text>
          </TouchableOpacity>
        );
      });

      if (this.state.isModalVisible) {
        modal = (
          <Modal isVisible={this.state.isModalVisible} onBackdropPress={this.resetState}>
            <Card title={"Send Message"}>
              <Text>Messages 1</Text>
              <View style={styles.expressionsView}>
                {expressions1}
              </View>
              <Text>Messages 2</Text>
              <View style={styles.expressionsView}>
                {expressions2}
              </View>
              <View style={[
                styles.messageRowPreview, {
                  backgroundColor: tinycolor(this.state.message.color).toHexString()
                }]}
              >
                <Text style={styles.messageRowPreviewText}>
                  {this.state.message.name}: {this.state.message.content.join(' ')}
                </Text>
              </View>
              <Button onPress={this.onSendMessage} title={"Send"} />
            </Card>
          </Modal>
        )
      }

      const messagesView = (
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
            <View style={[styles.messageRow, { backgroundColor: rowData.item.color }]}>
              <View style={styles.messageRowContent}>
                <Text style={styles.messageRowContentText}>
                  {rowData.item.name}: {rowData.item.content}
                </Text>
              </View>
              <View style={styles.messageRowTimer}>
                <Text style={styles.messageRowTimerText}>
                  {rowData.item.timeElapsed}
                </Text>
              </View>
            </View>
          )}
          renderHiddenItem={(rowData, rowMap) => (
            <View style={styles.messageRowBack}>
              <TouchableOpacity
                style={styles.messageRowBackDeleteButton}
                onPress={() => {
                  rowMap[rowData.item.id].closeRow();
                  this.onDeleteMessage(rowData.item);
                }}
              >
                <Text style={styles.messageRowBackDeleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )

      mainPanelView = (
        <Grid>
          {modal}
          <Row size={4} style={styles.rowContainer}>
            <ScrollView contentContainerStyle={styles.messagesScrollView}>
              {messagesView}
            </ScrollView>
          </Row>
          <Row size={1} style={styles.rowContainer}>
            <ScrollView contentContainerStyle={styles.buttonsScrollView}>
              {employeeButtons}
            </ScrollView>
          </Row>
        </Grid>
      )
    }

    return (
      <Container style={{ backgroundColor: '#dce9ef', padding: 10 }}>
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
  employeeButtons: {
    margin: 5,
    height: 46,
    width: 150,
    borderRadius: 5,
    padding: 5,
  },
  expressionButton: {
    margin: 5,
    height: 46,
    width: 190,
    borderRadius: 5,
    padding: 5,
    color: 'white'
  },
  expressionsText: {
    fontSize: 25,
    fontWeight: '600',
    color: 'white',
    alignSelf: 'center'
  },
  buttonsScrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  messagesScrollView: {
    flex: 1,
    flexDirection: 'column',
    margin: 10
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 65,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  messageRowContent: {
    flex: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  messageRowTimer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  messageRowContentText: {
    fontSize: 50,
    fontWeight: '400',
    color: 'white',
    flex: 1,
    flexWrap: 'wrap'
  },
  messageRowTimerText: {
    fontSize: 25,
    color: 'white'
  },
  messageRowBack: {
    flex: 1,
    marginBottom: 15,
  },
  messageRowBackDeleteButton: {
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
  messageRowBackDeleteButtonText: {
    color: "white",
    justifyContent: 'center',
    fontSize: 40,
  },
  expressionsView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageRowPreview: {
    height: 75,
    padding: 10,
    justifyContent: 'center',
    margin: 10
  },
  messageRowPreviewText: {
    fontSize: 40,
    color: 'white'
  },
});