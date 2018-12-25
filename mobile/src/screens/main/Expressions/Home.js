
import React, { Component } from 'react';
import { Container, Text } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import NoConnectionView from '../common/components/NoConnectionView';
import { Card, FormLabel, FormInput } from 'react-native-elements';
import Modal from "react-native-modal";
import Button from '../common/components/Button'
import { scale, verticalScale, moderateScale } from '../../../library/utils/ScalingAPI';


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

    if (this.props.screenProps.messageBoxIsConnected) {
      const expressions1 = this.props.screenProps.expressions.filter((expression) => {
        return expression.type == 1
      });

      const expressions2 = this.props.screenProps.expressions.filter((expression) => {
        return expression.type == 2
      });

      let modalTitle = "Add Expression";
      let modalOnPress = this.onAddExpression;

      if (this.state.isEditing) {
        modalTitle = "Edit Expression";
        modalOnPress = this.onEditExpression;
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
                rightOpenValue={-230}
                swipeToOpenPercent={50}
                data={expressions1}
                keyExtractor={(rowData, index) => {
                  return rowData.id.toString();
                }}
                renderItem={(rowData, rowMap) => (
                  <View style={[styles.expressionRow, { backgroundColor: '#0057e7' }]}>
                    <Text style={styles.expressionRowText}>{rowData.item.content}</Text>
                  </View>
                )}
                renderHiddenItem={(rowData, rowMap) => (
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
                            type: 1
                          }
                        })
                      }}>
                      <Text style={styles.expressionRowText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.expressionRowBackButton, styles.expressionRowBackButtonRight]}
                      onPress={_ => {
                        rowMap[rowData.item.id].closeRow()
                        this.onDeleteExpression(rowData.item)
                      }}>
                      <Text style={styles.expressionRowText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
              <Button
                title={"Add New Expression"}
                onPress={() => {
                  let newExpression = this.state.expression;
                  newExpression.type = 1;
                  this.setState({ expression: newExpression });
                  this.showModal();
                }}
              />
            </View>
            <View style={styles.listView}>
              <Text style={styles.expressionListTitleText}>Expressions 2</Text>
              <SwipeListView
                useFlatList
                closeOnRowBeginSwipe
                disableRightSwipe
                rightOpenValue={-230}
                swipeToOpenPercent={50}
                data={expressions2}
                keyExtractor={(rowData, index) => {
                  return rowData.id.toString();
                }}
                renderItem={(rowData, rowMap) => (
                  <View style={[styles.expressionRow, { backgroundColor: '#d62d20' }]}>
                    <Text style={styles.expressionRowText}>{rowData.item.content}</Text>
                  </View>
                )}
                renderHiddenItem={(rowData, rowMap) => (
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
                            type: 2
                          }
                        })
                      }}>
											<Text style={styles.expressionRowText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.expressionRowBackButton, styles.expressionRowBackButtonRight]}
                      onPress={_ => {
                        rowMap[rowData.item.id].closeRow()
                        this.onDeleteExpression(rowData.item)
                      }}>
                      <Text style={styles.expressionRowText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />

              <Button
                title={"Add New Expression"}
                onPress={() => {
                  let newExpression = this.state.expression;
                  newExpression.type = 2;
                  this.setState({ expression: newExpression });
                  this.showModal();
                }}
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


const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#d0e1f9',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5
  },
  mainSubView: {
    flex: 1,
    borderRadius: 5,
    flexDirection: 'row',
  },
  listView: {
    backgroundColor: '#4d648d',
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5
  },
  expressionRow: {
    flex: 1,
    borderBottomColor: '#4d648d',
    borderBottomWidth: 1,
    paddingLeft: 15,
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
    width: 115,
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
  expressionListTitleText: {
    color: 'white',
    marginBottom: scale(5)
  },
  expressionRowBackButtonLeft: {
    backgroundColor: '#eb6841',
    right: 115
  },
  expressionRowBackButtonRight: {
    backgroundColor: '#cc2a36',
    right: 0
  },
  modalCard: {
    borderRadius: 5
  }
});