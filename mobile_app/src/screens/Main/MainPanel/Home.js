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
import ModalCard from './components/ModalCard';
import Sounds from '../../../assets/sounds';


export default class MainPanel extends React.Component {
  static navigationOptions = {
    headerTitle: () => {
      return (
        <Image
          style={{ width: 100, height: 40, flex: 1 }}
          resizeMode="contain"
          source={require('../../../assets/images/logo-text.png')}
        />
      );
    },
    headerTitleStyle: {
      
    },
    headerStyle: {
      backgroundColor: '#74d0f0'
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };

    this.message = {
      name: "",
      color: "",
      ringtone: ""
    }
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

  onEmployeeButtonPress = (name, color, ringtone) => {
    this.setState({
      isModalVisible: true,
    });
    this.message = {
      name: name,
      color: color,
      ringtone: ringtone
    }
  }

  onMessageDeletePress = (message) => {
    this.props.screenProps.handleDeleteMessage(message);
  }

  resetState = () => {
    this.setState({
      isModalVisible: false,
    });
    this.message = {
      name: "",
      color: "",
      ringtone: ""
    }
  }

  renderEmployeeButton = (rowData) => {
    return (
      <EmployeeButton
        name={rowData.item.name}
        color={rowData.item.color}
        ringtone={rowData.item.ringtone}
        onClick={this.onEmployeeButtonPress}
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
        ringtone={rowData.item.ringtone}
        playRingtone={this.props.screenProps.playRingtone}
        hasTimer
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
          <ModalCard
            expressionsType1={expressionsType1}
            expressionsType2={expressionsType2}
            name={this.message.name}
            color={this.message.color}
            ringtone={this.message.ringtone}
            getFinalMessageHandler={this.getFinalMessage}
            playRingtone={this.props.screenProps.playRingtone()}
            handleSendMessage={this.props.screenProps.handleSendMessage}
            handleResetState={this.resetState}
          />
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
