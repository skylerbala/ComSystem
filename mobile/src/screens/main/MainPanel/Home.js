import React, { Component } from 'react';
import { View, Image, ScrollView, TouchableOpacity, Text, FlatList } from 'react-native';
import tinycolor from 'tinycolor2';
import { Card } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import Modal from "react-native-modal";
import NoConnectionView from '../common/components/NoConnectionView';
import Button from '../common/components/Button';
import styles from './styles';

export default class MainPanel extends Component {
  static navigationOptions = {
    headerTitle: () => {
      return (
        <View style={{ width: '20%', height: '100%' }} >
          <Image style={{ flex: 1, width: undefined, height: undefined }}
            source={require('../../../assets/images/logo.png')}
          />
        </View>
      );
    }
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
    this.props.screenProps.messages.forEach((message) => {
      message.selected = false;
    });
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

  onExpressionPress = (rowData) => {
    // need to reset select
    rowData.item.selected = !rowData.item.selected;
    if (rowData.item.selected) {
      this.setState({
        message: {
          name: this.state.message.name,
          content: [...this.state.message.content, rowData.item.content],
          color: this.state.message.color,
        }
      });
    }
    else {
      this.setState({
        message: {
          name: this.state.message.name,
          content: this.state.message.content.filter((content) => content != rowData.item.content),
          color: this.state.message.color,
        }
      });
    }
  }

  onSendMessagePress = () => {
    let newMessage = this.getFinalMessage(this.state.message);
    this.props.screenProps.handleSendMessage(newMessage);

    this.resetState();
  }

  resetState = () => {
    this.setState({ isModalVisible: false }, () => {
      setTimeout(() => {
        this.setState({
          message: {
            name: null,
            content: [],
            color: null
          }
        });
      }, 500);
    });

    this.props.screenProps.expressions.forEach((expression) => {
      expression.selected = false;
    });
  }

  getFinalMessage = (message) => {
    let newMessage = Object.assign({}, this.state.message);
    if (newMessage.content != []) {
      newMessage.content = newMessage.content.join(' ');
    }
    return newMessage;
  }

  renderEmployeeButton = (rowData) => {
    return (
      <TouchableOpacity
        key={rowData.item.id}
        style={[styles.employeeButtons, { backgroundColor: rowData.item.color }]}
        onPress={() => this.onEmployeeButtonPress(rowData.item.name, rowData.item.color)}
      >
        <Text style={styles.employeeButtonsText}>
          {rowData.item.name}
        </Text>
      </TouchableOpacity >
    )
  }

  renderExpression = (rowData) => {
    let expressionBackgroundColor = rowData.item.type == 1 ? "#0057e7" : "#d62d20"

    return (
      <TouchableOpacity
        key={rowData.item.id}
        style={[styles.expressionButton, { backgroundColor: expressionBackgroundColor }]}
        onPress={() => this.onExpressionPress(rowData)}
      >
        <Text style={styles.expressionsText}>
          {rowData.item.content}
        </Text>
      </TouchableOpacity>
    );
  }

  renderMessageRowFront = (rowData) => {
    return (
      <View style={[styles.messageRowFront, { backgroundColor: rowData.item.color }]}>
        <View style={styles.messageRowFrontContent}>
          <Text style={styles.messageRowFrontContentText}>
            {rowData.item.name}: {rowData.item.content}
          </Text>
        </View>
        <View style={styles.messageRowFrontTimer}>
          <Text style={styles.messageRowFrontTimerText}>
            {rowData.item.timeElapsed}
          </Text>
        </View>
      </View>
    );
  }

  renderMessageRowBack = (rowData, rowMap) => {
    return (
      <View style={styles.messageRowBack}>
        <TouchableOpacity
          style={styles.messageRowBackDeleteButton}
          onPress={() => {
            rowMap[rowData.item.id].closeRow();
            this.onMessageDeletePress(rowData.item);
          }}
        >
          <Text style={styles.messageRowBackDeleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let mainPanelView = <NoConnectionView />;

    if (this.props.screenProps.messageBoxIsConnected) {

      let [expressionsType1, expressionsType2] = this.props.screenProps.expressions.reduce((result, expression) => {
        if (expression.type == 1) {
          result[0].push(expression);
        }
        else {
          result[1].push(expression);
        }
        return result;
      }, [[], []]);

      let modal = (
        <Modal isVisible={this.state.isModalVisible} onBackdropPress={this.resetState}>
          <Card title={"Send Message"} containerStyle={styles.modalCard}>
            <Text>Expressions 1</Text>
            <View style={styles.expressionsView}>
              <FlatList
                contentContainerStyle={styles.listContainer}
                data={expressionsType1}
                renderItem={this.renderExpression}
                keyExtractor={(rowData) => rowData.id.toString()}
                numColumns={3}
              />
            </View>
            <Text>Expressions 2</Text>
            <View style={styles.expressionsView}>
              <FlatList
                contentContainerStyle={styles.listContainer}
                data={expressionsType2}
                renderItem={this.renderExpression}
                keyExtractor={(rowData) => rowData.id.toString()}
                numColumns={3}
              />
            </View>
            <View style={[
              styles.messageRowFront, { backgroundColor: tinycolor(this.state.message.color).toHexString() }]}>
              <View style={styles.messageRowFrontContent}>
                <Text style={styles.messageRowFrontContentText}>
                  {this.state.message.name}: {this.getFinalMessage(this.state.message).content}
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
                swipeToOpenPercent={25}
                data={this.props.screenProps.messages}
                keyExtractor={(rowData) => rowData.id.toString()}
                renderItem={(rowData) => this.renderMessageRowFront(rowData)}
                renderHiddenItem={(rowData, rowMap) => this.renderMessageRowBack(rowData, rowMap)}
              />
            </ScrollView>
          </View>
          <View style={styles.employeeButtonsView}>
            <ScrollView contentContainerStyle={styles.employeeButtonsScrollView}>
              <FlatList
                contentContainerStyle={styles.listContainer}
                data={this.props.screenProps.employees}
                renderItem={(rowData) => this.renderEmployeeButton(rowData)}
                keyExtractor={(rowData) => rowData.id.toString()}
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
