
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Card, FormLabel, FormInput } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import Modal from "react-native-modal";
import NoConnectionView from '../common/components/NoConnectionView';
import Button from '../common/components/Button'
import { scale } from '../../../library/utils/ScalingAPI';
import styles from './styles';
import ExpressionButton from '../common/components/ExpressionButton';
import ExpressionFront from './components/ExpressionFront';
import ExpressionBack from './components/ExpressionBack';
import shallowequal from 'shallowequal';


export default class ExpressionsTab extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => {
        return (
          <Text style={{ fontWeight: '600' }}>
            Expressions
          </Text>
        );
      },
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      expression: {
        content: "",
        type: null,
        id: null,
      },
      isEditing: false,
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


  onSaveExpressionPress = () => {
    let newExpression = {
      id: this.state.expression.id,
      content: this.state.expression.content,
      type: this.state.expression.type
    }
    if (this.state.isEditing) {
      this.props.screenProps.handleUpdateExpression(newExpression);
    }
    else {
      this.props.screenProps.handleAddExpression(newExpression);
    }
    this.resetState();
  }

  onEditExpressionPress = (expression) => {
    this.setState({
      isEditing: true,
      expression: {
        id: expression.id,
        type: expression.type
      }
    });
    this.showModal();
  }

  onUpdateExpressionContent = (content) => {
    this.setState({
      expression: {
        id: this.state.expression.id,
        type: this.state.expression.type,
        content: content
      }
    });
  }

  onDeleteExpressionPress = (expression) => {
    this.props.screenProps.handleDeleteExpression(expression);
  }

  onAddExpressionPress = (expressionType) => {
    let newExpression = this.state.expression;
    newExpression.type = expressionType;
    this.setState({
      expression: {
        id: this.state.expression.id,
        type: expressionType,
        content: this.state.expression.content
      }
    });
    this.showModal();
  }

  onAddExpressionPress1 = () => {
    this.onAddExpressionPress(1);
  }

  onAddExpressionPress2 = () => {
    this.onAddExpressionPress(2);
  }

  showModal = () => {
    this.setState({ isModalVisible: true })
  }

  resetState = () => {
    this.setState({
      isModalVisible: false,
      expression: {
        content: "",
        type: null,
        id: null,
      },
      isEditing: false,
    });
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
    console.log('Expression')

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
          <Card title={modalTitle} containerStyle={styles.modalCard}>
            <FormLabel>New Expression</FormLabel>
            <FormInput onChangeText={this.onUpdateExpressionContent} />
            <View style={{ flex: 1, alignItems: 'center', marginBottom: 50 }}>
              <ExpressionButton
                expression={this.state.expression}
                onClick={null}
              />
            </View>
            <Button title='Save' onPress={this.onSaveExpressionPress} />
          </Card>
        </Modal>
      )


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

