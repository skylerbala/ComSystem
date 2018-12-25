
import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Card, FormLabel, FormInput } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import Modal from "react-native-modal";
import NoConnectionView from '../common/components/NoConnectionView';
import Button from '../common/components/Button'
import { scale } from '../../../library/utils/ScalingAPI';
import styles from './styles';
export default class ExpressionsTab extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Expressions',
    }
  };

  state = {
    isModalVisible: false,
    expression: {
      content: "",
      type: null,
      id: null,
    },
    isEditing: false,
  }

  constructor(props) {
    super(props);
    this.onSaveExpressionPress = this.onSaveExpressionPress.bind(this);
    this.onEditExpressionPress = this.onEditExpressionPress.bind(this);
    this.showModal = this.showModal.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  onSaveExpressionPress = () => {
    this.props.screenProps.handleAddExpression(this.state.expression);
    this.resetState();
  }

  onAddExpressionPress = (expressionType) => {
    let newExpression = this.state.expression;
    newExpression.type = expressionType;
    this.setState({ expression: newExpression });
    this.showModal();
  }

  onEditExpressionPress = () => {
    this.props.screenProps.handleUpdateExpression(this.state.expression);
    this.resetState();
  }

  onDeleteExpressionPress = (id) => {
    this.props.screenProps.handleDeleteExpression(id);
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
    })
  }

  renderExpressionRowFront = (rowData) => {
    let expressionBackgroundColor = rowData.item.type == 1 ? "#0057e7" : "#d62d20";
    return (
      <View style={[styles.expressionRowFront, { backgroundColor: expressionBackgroundColor }]}>
        <Text style={styles.expressionRowFrontText}>{rowData.item.content}</Text>
      </View>
    );
  }

  renderExpressionRowBack = (rowData, rowMap) => {
    return (
      <View style={styles.expressionRowBack}>
        <TouchableOpacity
          style={[styles.expressionRowBackButton, styles.expressionRowBackButtonLeft]}
          onPress={_ => {
            rowMap[rowData.item.id].closeRow();
            this.setState({
              isEditing: true,
              isModalVisible: true,
              expression: {
                id: rowData.item.id,
                type: rowData.item.type
              }
            })
          }}
        >
          <Text style={styles.expressionRowBackText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.expressionRowBackButton, styles.expressionRowBackButtonRight]}
          onPress={_ => {
            rowMap[rowData.item.id].closeRow();
            this.onDeleteExpressionPress(rowData.item);
          }}>
          <Text style={styles.expressionRowBackText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render = () => {
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
      let modalOnPress = this.onSaveExpressionPress;

      if (this.state.isEditing) {
        modalTitle = "Edit Expression";
        modalOnPress = this.onEditExpressionPress;
      }

      modal = (
        <Modal isVisible={this.state.isModalVisible} onBackdropPress={this.resetState}>
          <Card title={modalTitle} containerStyle={styles.modalCard}>
            <FormLabel>New Expression</FormLabel>
            <FormInput onChangeText={(expression) => {
              let newExpression = this.state.expression;
              newExpression.content = expression;
              this.setState({ expression: newExpression });
            }}
            />
            <Button title='Save' onPress={modalOnPress} />
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
                onPress={() => this.onAddExpressionPress(1)}
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
                onPress={() => this.onAddExpressionPress(2)}
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

