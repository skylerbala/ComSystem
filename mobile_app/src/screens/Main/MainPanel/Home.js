import React from 'react';
import { View, Image, ScrollView, TouchableOpacity, Text, FlatList } from 'react-native';
import tinycolor from 'tinycolor2';
import { Card } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import Modal from "react-native-modal";
import styles from './styles';
import shallowequal from 'shallowequal';
import NoConnectionView from '../common/components/NoConnectionView';
import Button from '../common/components/Button';
import ExpressionButton from '../common/components/ExpressionButton';
import EmployeeButton from '../common/components/EmployeeButton';
import MessageFront from './components/MessageFront';
import MessageBack from './components/MessageBack';


export default class MainPanel extends React.Component {
  static navigationOptions = {
    headerTitle: () => {
      return (
        <Image
          style={{ width: 100, height: 40, flex: 1 }}
          resizeMode="contain"
          source={require('../../../assets/images/logo.png')}
        />
      );
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      message: {
        name: null,
        content: [],
        color: null
      }
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowequal(this.props.screenProps.messages, nextProps.screenProps.messages)) {
      return true;
    }
    else if (!shallowequal(this.props.screenProps.employees, nextProps.screenProps.employees)) {
      return true;
    }
    else if (!shallowequal(this.state, nextState)) {
      return true;
    }

    return false;
  }

  onEmployeeButtonPress = (name, color) => {
    this.setState({
      isModalVisible: true,
      message: {
        name: name,
        content: [],
        color: color,
        createdAt: null
      }
    });
  }

  onMessageDeletePress = (message) => {
    this.props.screenProps.handleDeleteMessage(message);
  }

  onExpressionPress = (expression) => {
    this.setState({
      message: {
        name: this.state.message.name,
        content: [...this.state.message.content, expression.content],
        color: this.state.message.color,
      }
    });
  }


  onClearPress = () => {
    this.setState({
      message: {
        name: this.state.message.name,
        content: [],
        color: this.state.message.color,
      }
    });
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
      <EmployeeButton
        name={rowData.item.name}
        color={rowData.item.color}
        onClick={this.onEmployeeButtonPress}
      />
    );
  }

  renderExpressionButton = (rowData) => {
    return (
      <ExpressionButton
        expression={rowData.item}
        onClick={this.onExpressionPress}
      />
    );
  }

  renderMessageFront = (rowData) => {
    return (
      <MessageFront
        color={rowData.item.color}
        name={rowData.item.name}
        createdAt={rowData.item.createdAt}
        content={rowData.item.content}
        playRingtone={this.props.screenProps.playRingtone}
      />
    );
  }

  renderMessageBack = (rowData) => {
    return (
      <MessageBack
        message={rowData.item}
        onClick={this.onMessageDeletePress}
      />
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
            <Text style={styles.expressionCategoryText}>Expressions 1</Text>
            <View style={styles.expressionsView}>
              <FlatList
                contentContainerStyle={styles.listContainer}
                data={expressionsType1}
                renderItem={this.renderExpressionButton}
                keyExtractor={(rowData) => rowData.id.toString()}
                numColumns={3}
              />
            </View>
            <Text style={styles.expressionCategoryText}>Expressions 2</Text>
            <View style={styles.expressionsView}>
              <FlatList
                contentContainerStyle={styles.listContainer}
                data={expressionsType2}
                renderItem={this.renderExpressionButton}
                keyExtractor={(rowData) => rowData.id.toString()}
                numColumns={3}
              />
            </View>
            <MessageFront
              color={this.state.message.color}
              name={this.state.message.name}
              createdAt={this.state.message.createdAt}
              content={this.getFinalMessage(this.state.message).content}
              playRingtone={this.props.screenProps.playRingtone}
            />
            <View style={{ flexDirection: 'row' }}>
              <Button containerStyle={{ flex: 1, margin: 5, backgroundColor: 'red' }} onPress={this.onClearPress} title={"Clear"} />
              <Button containerStyle={{ flex: 1, margin: 5}} onPress={this.onSendMessagePress} title={"Send"} />
            </View>
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
                renderItem={this.renderMessageFront}
                renderHiddenItem={this.renderMessageBack}
                initialNumToRender={12}
              />
            </ScrollView>
          </View>
          <View style={styles.employeeButtonsView}>
            <ScrollView contentContainerStyle={styles.employeeButtonsScrollView}>
              <FlatList
                contentContainerStyle={styles.listContainer}
                data={this.props.screenProps.employees}
                renderItem={this.renderEmployeeButton}
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
