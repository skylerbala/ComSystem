
import React, { Component } from 'react';
import { Container, Text } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import { SwipeListView } from 'react-native-swipe-list-view';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import NoConnectionView from '../common/components/NoConnectionView';
import { Card, FormLabel, FormInput } from 'react-native-elements';
import Modal from "react-native-modal";
import Button from '../common/components/Button'


export default class ExpressionsTab extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
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
    this.onAddExpression = this.onAddExpression.bind(this);
    this.onEditExpression = this.onEditExpression.bind(this);
    this.showModal = this.showModal.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  onAddExpression() {
    this.props.screenProps.handleAddExpression(this.state.expression);
    this.resetState();
  }

  onEditExpression() {
    this.props.screenProps.handleUpdateExpression(this.state.expression);
    this.resetState();
  }

  onDeleteExpression(id) {
    this.props.screenProps.handleDeleteExpression(id);
  }

  showModal() {
    this.setState({ isModalVisible: true })
  }

  resetState() {
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

  render() {
    let mainView = <NoConnectionView />

    if (this.props.screenProps.isConnected) {
      const expressions1 = this.props.screenProps.expressions.filter((expression) => {
        return expression.type == 1
      });

      const expressions2 = this.props.screenProps.expressions.filter((expression) => {
        return expression.type == 2
      });

      let modalTitle = "Add Message";
      let modalOnPress = this.onAddExpression;

      if (this.state.isEditing) {
        modalTitle = "Edit Message";
        modalOnPress = this.onEditExpression;
      }

      modal = (
        <Modal isVisible={this.state.isModalVisible} onBackdropPress={this.resetState}>
          <Card title={modalTitle}>
            <FormLabel>New Message</FormLabel>
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
        <Grid>
          <Col size={1}>
            <Card title={"Expressions 1"}>
              <SwipeListView
                useFlatList
                closeOnRowBeginSwipe
                disableRightSwipe
                rightOpenValue={-200}
                swipeToOpenPercent={50}
                data={expressions1}
                keyExtractor={(rowData, index) => {
                  return rowData.id.toString();
                }}
                renderItem={(rowData, rowMap) => (
                  <View style={[styles.expressionRow, { backgroundColor: '#91bbd1' }]}>
                    <Text style={styles.expressionRowText}>{rowData.item.content}</Text>
                  </View>
                )}
                renderHiddenItem={(rowData, rowMap) => (
                  <View style={styles.expressionRowBack}>
                    <TouchableOpacity
                      style={[styles.expressionRowBackButton, {
                        backgroundColor: 'blue',
                        right: 100
                      }]}
                      onPress={_ => {
                        rowMap[rowData.item.id].closeRow();
                        this.setState({
                          isEditing: true,
                          isModalVisible: true,
                          expression: {
                            id: rowData.item.id,
                            type: 1
                          }
                        })
                      }}>
                      <Text>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.expressionRowBackButton, {
                        backgroundColor: 'red',
                        right: 0
                      }]}
                      onPress={_ => {
                        rowMap[rowData.item.id].closeRow()
                        this.onDeleteExpression(rowData.item)
                      }}>
                      <Text>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
              <Button
                title={"Add New Message"}
                onPress={() => {
                  let newExpression = this.state.expression;
                  newExpression.type = 1;
                  this.setState({ expression: newExpression });
                  this.showModal();
                }}
              />
            </Card>
          </Col>
          <Col size={1}>
            <Card title={"Expressions 2"}>
              <SwipeListView
                useFlatList
                closeOnRowBeginSwipe
                disableRightSwipe
                rightOpenValue={-200}
                swipeToOpenPercent={50}
                data={expressions2}
                keyExtractor={(rowData, index) => {
                  return rowData.id.toString();
                }}
                renderItem={(rowData, rowMap) => (
                  <View style={[styles.expressionRow, { backgroundColor: '#478375' }]}>
                    <Text style={styles.expressionRowText}>{rowData.item.content}</Text>
                  </View>
                )}
                renderHiddenItem={(rowData, rowMap) => (
                  <View style={styles.expressionRowBack}>
                    <TouchableOpacity
                      style={[styles.expressionRowBackButton, {
                        backgroundColor: 'blue',
                        right: 100
                      }]}
                      onPress={_ => {
                        rowMap[rowData.item.id].closeRow();
                        this.setState({
                          isEditing: true,
                          isModalVisible: true,
                          expression: {
                            id: rowData.item.id,
                            type: 2
                          }
                        })
                      }}>
                      <Text>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.expressionRowBackButton, {
                        backgroundColor: 'red',
                        right: 0
                      }]}
                      onPress={_ => {
                        rowMap[rowData.item.id].closeRow()
                        this.onDeleteExpression(rowData.item)
                      }}>
                      <Text>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
              <Button
                title={"Add New Message"}
                onPress={() => {
                  let newExpression = this.state.expression;
                  newExpression.type = 2;
                  this.setState({ expression: newExpression });
                  this.showModal();
                }}
              />
            </Card>
          </Col>
          {modal}
        </Grid >
      )
    }

    return (
      <Container style={{ backgroundColor: '#dce9ef' }}>
        {mainView}
      </Container >
    );
  }
}


const styles = StyleSheet.create({
  expressionRow: {
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    borderRightColor: '#CCC',
    paddingLeft: 15,
    borderRightWidth: 1,
    justifyContent: 'center',
    height: 75,
  },
  expressionRowText: {
    fontSize: 35,
    color: "white"
  },
  expressionRowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  expressionRowBackButton: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 100,
  },
  text: {
    fontSize: 35,
  },
  deleteText: {
    color: "white"
  },
  noConnectionText: {
    textAlign: 'center',
    fontSize: 40,
    justifyContent: 'center'
  },
  rowFront: {
    backgroundColor: 'white',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    borderRightColor: '#CCC',
    paddingLeft: 15,
    borderRightWidth: 1,
    justifyContent: 'center',
    height: 75,
  },
  deleteButton: {
    backgroundColor: '#da635d',
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0
  },
  noConnectionView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});