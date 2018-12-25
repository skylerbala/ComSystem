import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions, StyleSheet, Text, FlatList } from 'react-native';
import tinycolor from 'tinycolor2';
import { Card } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import Modal from "react-native-modal";
import NoConnectionView from '../common/components/NoConnectionView';
import Button from '../common/components/Button';
import styles from './styles';

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
  }

  onEmployeeButtonPress = (name, color) => {
    this.setState({
      isModalVisible: true,
      message: {
        name: name,
        content: [],
        color: color
      }
    });
  }

  onMessageDeletePress = (message) => {
    this.props.screenProps.handleDeleteMessage(message);
  }

  onExpressionPress = (expression) => {
    expression.item.selected = !expression.item.selected;
    if (expression.item.selected) {
      this.setState({
        message: {
          name: this.state.message.name,
          content: [...this.state.message.content, expression.item.content],
          color: this.state.message.color,
        }
      });
    }
    else {
      this.setState({
        message: {
          name: this.state.message.name,
          content: this.state.message.content.filter((content) => content != expression.item.content),
          color: this.state.message.color,
        }
      });
    }
  }

  onSendMessagePress = () => {
    let newMessage = this.state.message;
    newMessage.content = newMessage.content.join(' ');
    this.props.screenProps.handleSendMessage(newMessage);

    this.resetState();
  }

  resetState = () => {
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

  renderEmployeeButton = (employee) => {
    return (
      <TouchableOpacity
        key={employee.item.id}
        style={[styles.employeeButtons, { backgroundColor: employee.item.color }]}
        onPress={() => this.onEmployeeButtonPress(employee.item.name, employee.item.color)}
      >
        <Text style={styles.employeeButtonsText}>
          {employee.item.name}
        </Text>
      </TouchableOpacity >
    )
  }

  renderExpression = (expression) => {
    let expressionBackgroundColor = expression.item.type == 1 ? "#0057e7" : "#d62d20"

    return (
      <TouchableOpacity
        key={expression.item.id}
        style={[styles.expressionButton, { backgroundColor: expressionBackgroundColor }]}
        onPress={() => this.onExpressionPress(expression)}
      >
        <Text style={styles.expressionsText}>
          {expression.item.content}
        </Text>
      </TouchableOpacity>
    );
  }

  renderMessageRowFront = (message) => {
    return (
      <View style={[styles.messageRowFront, { backgroundColor: message.item.color }]}>
        <View style={styles.messageRowFrontContent}>
          <Text style={styles.messageRowFrontContentText}>
            {message.item.name}: {message.item.content}
          </Text>
        </View>
        <View style={styles.messageRowFrontTimer}>
          <Text style={styles.messageRowFrontTimerText}>
            {message.item.timeElapsed}
          </Text>
        </View>
      </View>
    );
  }

  renderMessageRowBack = (message, messageMap) => {
    return (
      <View style={styles.messageRowBack}>
        <TouchableOpacity
          style={styles.messageRowBackDeleteButton}
          onPress={() => {
            messageMap[message.item.id].closeRow();
            this.onMessageDeletePress(message.item);
          }}
        >
          <Text style={styles.messageRowBackDeleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let mainPanelView = <NoConnectionView />;
    let modal = null
    console.log(this.props.screenProps.messageBoxIsConnected)
    if (this.props.screenProps.messageBoxIsConnected) {
      if (this.state.isModalVisible) {
        let [expressionsType1, expressionsType2] = this.props.screenProps.expressions.reduce((result, expression) => {
          if (expression.type == 1) {
            result[0].push(expression);
          }
          else {
            result[1].push(expression);
          }
          return result;
        }, [[], []]);

        modal = (
          <Modal isVisible={this.state.isModalVisible} onBackdropPress={this.resetState}>
            <Card title={"Send Message"} style={styles.modalCard}>
              <Text>Expressions 1</Text>
              <View style={styles.expressionsView}>
                <FlatList
                  contentContainerStyle={styles.listContainer}
                  data={expressionsType1}
                  renderItem={this.renderExpression}
                  keyExtractor={(expression, index) => expression.id.toString()}
                  numColumns={3}
                />
              </View>
              <Text>Expressions 2</Text>
              <View style={styles.expressionsView}>
                <FlatList
                  contentContainerStyle={styles.listContainer}
                  data={expressionsType2}
                  renderItem={this.renderExpression}
                  keyExtractor={(expression, index) => expression.id.toString()}
                  numColumns={3}
                />
              </View>
              <View style={[
                styles.messageRowFront, { backgroundColor: tinycolor(this.state.message.color).toHexString() }]}>
                <View style={styles.messageRowFrontContent}>
                  <Text style={styles.messageRowFrontContentText}>
                    {this.state.message.name}: {this.state.message.content.join(' ')}
                  </Text>
                </View>
                <View style={styles.messageRowFrontTimer}>
                  <Text style={styles.messageRowFrontTimerText}>
                    00:00
                </Text>
                </View>
              </View>
              <Button onPress={this.onSendMessagePress} title={"Send"} />
            </Card>
          </Modal>
        )
      }

      mainPanelView = (
        <View style={styles.mainView}>
          {modal}
          <View style={styles.messagesView}>
            <ScrollView contentContainerStyle={styles.messagesScrollView}>
              <SwipeListView
                useFlatList
                closeOnRowBeginSwipe
                disableRightSwipe
                rightOpenValue={-200}
                stopRightSwipe={-200}
                swipeToOpenPercent={50}
                data={this.props.screenProps.messages}
                keyExtractor={(message, index) => message.id.toString()}
                renderItem={(message, messageMap) => this.renderMessageRowFront(message, messageMap)}
                renderHiddenItem={(message, messageMap) => this.renderMessageRowBack(message, messageMap)}
              />
            </ScrollView>
          </View>
          <View style={styles.employeeButtonsView}>
            <ScrollView contentContainerStyle={styles.employeeButtonsScrollView}>
              <FlatList
                contentContainerStyle={styles.listContainer}
                data={this.props.screenProps.employees}
                renderItem={this.renderEmployeeButton}
                keyExtractor={(employee, index) => employee.id.toString()}
                numColumns={4}
              />
            </ScrollView>
          </View>
        </View>
      );
    }

    return mainPanelView;
  }
}
