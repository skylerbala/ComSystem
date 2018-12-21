
import React, { Component } from 'react';
import { Container, Content, Form, Item, Label, Input, Text, Fab, Body, Icon, alert, Header, Left, Right, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import DialogInput from 'react-native-dialog-input';
import { SwipeListView } from 'react-native-swipe-list-view';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import styles from '../../../screens/Main/styles/SwipeListViewStyle';
import NoConnectionView from '../common/components/NoConnectionView';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import Modal from "react-native-modal";


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
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleToggle: () => this.toggleModal() });
  }

  onAddExpression() {
    this.props.screenProps.handleAddExpression(this.state.expression);
    this.toggleModal();
    this.setState({
      isModalVisible: false,
      expression: {
        content: "",
        type: null,
      }
    })
  }

  onEditExpression(id) {
    let newExpression = this.state.expression;
    this.setState({
      isModalVisible: false,
      expression: {
        content: "",
        type: null,
        id: null,
      },
      isEditing: false,
    });
    this.props.screenProps.handleUpdateExpression(newExpression);
  }

  onDeleteExpression(id) {
    this.props.screenProps.handleDeleteExpression(id);
  }

  toggleModal() {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    })
  }

  render() {
    let view = <NoConnectionView />

    let expressions1 = this.props.screenProps.expressions.filter((expression) => {
      return expression.type == 1
    });

    let expressions2 = this.props.screenProps.expressions.filter((expression) => {
      return expression.type == 2
    });

    if (this.props.screenProps.isConnected) {
      let modal = null;

      if (this.state.isEditing) {
        modal = (
          <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.setState({ isModalVisible: false })}
          >
            <Card
              title={"Edit Message"}
            >
              <FormLabel>New Message</FormLabel>
              <FormInput onChangeText={(expression) => {
                let newExpression = this.state.expression;
                newExpression.content = expression;
                this.setState({ expression: newExpression });
              }}
              />
              <Button
                raised
                title='Add'
                onPress={() => {
                  this.onEditExpression();
                }}
                style={{
                  margin: 10
                }}
              />
            </Card>
          </Modal>
        )
      }
      else {
        modal = (
          <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.setState({ isModalVisible: false })}
          >
            <Card
              title={"Add Message"}
            >
              <FormLabel>New Message</FormLabel>
              <FormInput onChangeText={(expression) => {
                let newExpression = this.state.expression;
                newExpression.content = expression;
                this.setState({ expression: newExpression });
              }}
              />
              <Button
                raised
                title='Add'
                onPress={() => {
                  this.onAddExpression();
                }}
                style={{
                  margin: 10
                }}
              />
            </Card>
          </Modal>
        )
      }

      view = (
        <Grid style={styles.gridContainer}>
          <Col size={1}>
            <Card
              title={"Messages 1"}
            >
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
                  <View style={{
                    backgroundColor: '#91bbd1',
                    borderBottomColor: '#CCC',
                    borderBottomWidth: 1,
                    borderRightColor: '#CCC',
                    paddingLeft: 15,
                    borderRightWidth: 1,
                    justifyContent: 'center',
                    height: 75,
                  }}>
                    <Text style={{
                      fontSize: 35,
                      color: "white"
                    }}>{rowData.item.content}</Text>
                  </View>
                )}
                renderHiddenItem={(rowData, rowMap) => (
                  <View style={{
                    alignItems: 'center',
                    backgroundColor: '#DDD',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingLeft: 15,
                  }}>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        bottom: 0,
                        justifyContent: 'center',
                        position: 'absolute',
                        top: 0,
                        width: 100,
                        backgroundColor: 'blue',
                        right: 100
                      }}
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

                      <Text style={{

                      }}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        bottom: 0,
                        justifyContent: 'center',
                        position: 'absolute',
                        top: 0,
                        width: 100,
                        backgroundColor: '#da635d',
                        right: 0
                      }}
                      onPress={_ => {
                        rowMap[rowData.item.id].closeRow()
                        this.onDeleteExpression(rowData.item)
                      }}>
                      <Text style={{

                      }}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
              <Button
                title={"Add New Message"}
                color={'black'}
                style={{
                  margin: 10
                }}
                backgroundColor="#91bbd1"
                onPress={() => {
                  let newExpression = this.state.expression;
                  newExpression.type = 1;
                  this.setState({ expression: newExpression });
                  this.toggleModal();
                }}
              />
            </Card>
          </Col>
          <Col size={1}>
            <Card
              title={"Messages 2"}
            >
              <SwipeListView
                useFlatList
                closeOnRowBeginSwipe
                disableRightSwipe
                rightOpenValue={-200}
                stopRightSwipe={-200}
                swipeToOpenPercent={50}
                data={expressions2}
                keyExtractor={(rowData, index) => {
                  return rowData.id.toString();
                }}
                renderItem={(rowData, rowMap) => (
                  <View style={{
                    backgroundColor: '#478375',
                    borderBottomColor: '#CCC',
                    borderBottomWidth: 1,
                    borderRightColor: '#CCC',
                    paddingLeft: 15,
                    borderRightWidth: 1,
                    justifyContent: 'center',
                    height: 75,
                  }}>
                    <Text style={{
                      fontSize: 35,
                      color: "white"
                    }}>{rowData.item.content}</Text>
                  </View>
                )}
                renderHiddenItem={(rowData, rowMap) => (
                  <View style={{
                    alignItems: 'center',
                    backgroundColor: '#DDD',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingLeft: 15,
                  }}>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        bottom: 0,
                        justifyContent: 'center',
                        position: 'absolute',
                        top: 0,
                        width: 100,
                        backgroundColor: 'blue',
                        right: 100
                      }}
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

                      <Text style={{

                      }}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        bottom: 0,
                        justifyContent: 'center',
                        position: 'absolute',
                        top: 0,
                        width: 100,
                        backgroundColor: '#da635d',
                        right: 0
                      }}
                      onPress={_ => {
                        rowMap[rowData.item.id].closeRow()
                        this.onDeleteExpression(rowData.item)
                      }}>
                      <Text style={{

                      }}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />


              <Button
                title={"Add New Message"}
                color={'black'}
                style={{
                  margin: 10,
                }}
                backgroundColor="#478375"
                onPress={() => {
                  let newExpression = this.state.expression;
                  newExpression.type = 2;
                  this.setState({ expression: newExpression });
                  this.toggleModal();
                }}
              />
            </Card>
          </Col>
          {modal}
        </Grid>
      )
    }

    return (
      <Container style={{ backgroundColor: '#dce9ef' }}>
        {view}
      </Container >
    );
  }
}
