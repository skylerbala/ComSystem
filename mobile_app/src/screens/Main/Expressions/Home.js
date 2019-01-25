
import React from 'react';
import { View, Text } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Modal from "react-native-modal";
import NoConnectionView from '../common/components/NoConnectionView';
import Button from '../common/components/Button'
import styles from './styles';
import ExpressionFront from './components/ExpressionFront';
import ExpressionBack from './components/ExpressionBack';
import shallowequal from 'shallowequal';
import ModalCard from './components/ModalCard';


export default class ExpressionsTab extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleStyle: { alignSelf: 'center' },
      title: 'Expressions',
      headerStyle: {
        backgroundColor: colors.logoBlue
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isEditing: false,
    };
    this.expression = {
      content: null,
      type: null,
      id: null,
    };
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (!shallowequal(this.props.screenProps.expressions, nextProps.screenProps.expressions)) {
      return true;
    }
    else if (!shallowequal(this.state, nextState)) {
      return true;
    }

    return false;
  }

  onEditExpressionPress = (expression) => {
    this.setState({ isModalVisible: true, isEditing: true })
    this.expression = {
      id: expression.id,
      type: expression.type
    };
  }

  onDeleteExpressionPress = (expression) => {
    this.props.screenProps.handleDeleteExpression(expression);
  }

  onAddExpressionPress = (expressionType) => {
    let newExpression = this.expression;
    newExpression.type = expressionType;
    this.expression = {
      id: this.expression.id,
      type: expressionType,
      content: this.expression.content
    };
    this.setState({ isModalVisible: true });
  }

  onAddExpressionPress1 = () => {
    this.onAddExpressionPress(1);
  }

  onAddExpressionPress2 = () => {
    this.onAddExpressionPress(2);
  }

  resetState = () => {
    this.setState({ isModalVisible: false, isEditing: false });
    this.expression = {
      content: "",
      type: null,
      id: null,
    };
  }

  renderExpressionRowFront = (rowData) => {
    return (
      <ExpressionFront
        content={rowData.item.content}
        type={rowData.item.type}
      />
    );
  }

  renderExpressionRowBack = (rowData) => {
    return (
      <ExpressionBack
        expression={rowData.item}
        onEditClick={this.onEditExpressionPress}
        onDeleteClick={this.onDeleteExpressionPress}
      />
    );
  }

  render() {
    let mainView = <NoConnectionView />

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

      let modalTitle = "Add Expression";

      if (this.state.isEditing) {
        modalTitle = "Edit Expression";
      }

      modal = (
        <Modal isVisible={this.state.isModalVisible} onBackdropPress={this.resetState}>
          <ModalCard
            modalTitle={modalTitle}
            expression={this.expression}
            playTone={this.props.screenProps.playTone}
            handleAddExpression={this.props.screenProps.handleAddExpression}
            handleUpdateExpression={this.props.screenProps.handleUpdateExpression}
            handleResetState={this.resetState}
            isEditing={this.state.isEditing}
          />
        </Modal>
      );


      mainView = (
        <View style={styles.mainView}>
          <View style={styles.mainSubView}>
            <View style={styles.listView}>
              <Text style={styles.expressionListTitleText}>Expressions 1</Text>
              <SwipeListView
                useFlatList
                closeOnRowBeginSwipe
                disableRightSwipe
                rightOpenValue={-250}
                stopRightSwipe={-250}
                swipeToOpenPercent={25}
                data={expressionsType1}
                keyExtractor={(rowData) => rowData.id.toString()}
                renderItem={this.renderExpressionRowFront}
                renderHiddenItem={this.renderExpressionRowBack}
              />
              <Button
                title={"Add"}
                onPress={this.onAddExpressionPress1}
              />
            </View>
            <View style={styles.listView}>
              <Text style={styles.expressionListTitleText}>Expressions 2</Text>
              <SwipeListView
                useFlatList
                closeOnRowBeginSwipe
                disableRightSwipe
                rightOpenValue={-250}
                stopRightSwipe={-250}
                swipeToOpenPercent={25}
                data={expressionsType2}
                keyExtractor={(rowData) => rowData.id.toString()}
                renderItem={this.renderExpressionRowFront}
                renderHiddenItem={this.renderExpressionRowBack}
              />
              <Button
                title={"Add"}
                onPress={this.onAddExpressionPress2}
              />
            </View>
            {modal}
          </View>
        </View>
      )
    }

    return mainView;
  }
}

