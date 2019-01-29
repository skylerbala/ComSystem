import React from 'react';
import { View, Image, ScrollView, FlatList } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Modal from "react-native-modal";
import styles from './styles';
import shallowequal from 'shallowequal';
import NoConnectionView from '../common/components/NoConnectionView';
import EmployeeButton from '../common/components/EmployeeButton';
import MessageFront from './components/MessageFront';
import MessageBack from './components/MessageBack';
import ModalCard from './components/ModalCard';


export default class MainPanel extends React.Component {
  static navigationOptions = {
    headerTitle: () => {
      return (
        <Image
          style={{ width: 100, height: '70%', flex: 1 }}
          resizeMode="contain"
          source={require('../../../assets/images/logo-text.png')}
        />
      );
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
      name: null,
      color: null,
      ringtone: null
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
    this.message = {
      name: name,
      color: color,
      ringtone: ringtone
    };
    this.setState({ isModalVisible: true });
  }

  onMessageDeleteButtonPress = (message) => {
    this.props.screenProps.handleDeleteMessage(message);
  }

  resetState = () => {
    this.setState({
      isModalVisible: false,
    }, () => {
      this.message = {
        name: null,
        color: null,
        ringtone: null
      };
    });
  }

  renderEmployeeButton = (rowData) => {
    return (
      <EmployeeButton
        name={rowData.item.name}
        color={rowData.item.color}
        ringtone={rowData.item.ringtone}
        onPress={this.onEmployeeButtonPress}
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
        playTone={this.props.screenProps.playTone}
        hasTimer
      />
    );
  }

  renderMessageBack = (rowData) => {
    return (
      <MessageBack
        message={rowData.item}
        onClick={this.onMessageDeleteButtonPress}
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
