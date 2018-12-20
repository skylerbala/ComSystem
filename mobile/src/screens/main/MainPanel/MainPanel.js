import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Text, Card, FormLabel, FormInput } from 'react-native-elements';
import { Container, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { SwipeListView } from 'react-native-swipe-list-view';
import NoConnectionView from '../common/components/NoConnectionView';
import Modal from "react-native-modal";
import tinycolor from 'tinycolor2';

class MainPanel extends Component {
  static navigationOptions = {
    title: 'MainPanel',
  }

  state = {
    isModalVisible: false,
    name: null,
    color: null,
    message: []
  }

  constructor(props) {
    super(props);
  }

  deleteMessage(data) {
    this.props.screenProps.handleDeleteMessage(data);
  }


  handleSendMessage() {
    this.props.navigation.pop();
    let data = {
      name: this.state.name,
      statement: this.state.message.join(' '),
      color: this.state.color
    }

    this.props.screenProps.handleSendMessage(data);
    this.setState({ isModalVisible: false });

  }

  _toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  render() {
    let messagesView = (<NoConnectionView />);

    let statements = this.props.screenProps.statements.map((statement) => {
      return (
        <TouchableOpacity
          key={statement.id}

          style={{
            margin: 5,
            height: 46,
            width: 190,
            borderRadius: 5,
            padding: 5,
            backgroundColor: 'blue'
          }}
          onPress={() => {
            statement.selected = !statement.selected;
            if (statement.selected) {
              this.state.message.push(statement.statement);
            }
            else {
              this.state.message = this.state.message.filter((message) => {
                return message != statement.statement;
              });
            }
          }}
        >
          <Text style={{
            fontSize: 25,
            fontWeight: '600', color: 'white', alignSelf: 'center'
          }}>{statement.statement}</Text>
        </TouchableOpacity>
      )
    });

    let employeeButtons = this.props.screenProps.employees.map((employee) => {
      return (
        <TouchableOpacity
          key={employee.id}

          style={{
            backgroundColor: employee.color,
            margin: 5,
            height: 46,
            width: 150,
            borderRadius: 5,
            padding: 5,
          }}
          onPress={() => {
            // this.props.navigation.navigate("SendMessage", {
            //   name: employee.name,
            //   color: employee.color
            // })
            this.setState({ name: employee.name, color: employee.color })
            this._toggleModal();
          }}
        >
          <Text style={{ fontSize: 25, color: 'white', alignSelf: 'center' }}>{employee.name}</Text>
        </TouchableOpacity>
      )
    });

    // {%<Button
    //   key={employee.id}
    //   backgroundColor={employee.color}
    //   borderRadius={5}
    //   fontSize={40}
    //   fontWeight={'600'}
    //   onPress={() => {
    //     // this.props.navigation.navigate("SendMessage", {
    //     //   name: employee.name,
    //     //   color: employee.color
    //     // })
    //     this.setState({name: employee.name, color: employee.color})
    //     this._toggleModal();
    //   }}
    //   raised
    //   title={employee.name}
    //   style={{marginTop: 5, marginBottom: 5}}
    // />
    // %}

    if (this.props.screenProps.connected) {
      messagesView = (
        <View>
          <SwipeListView
            useFlatList
            closeOnRowBeginSwipe
            disableRightSwipe
            rightOpenValue={-200}
            stopRightSwipe={-200}
            swipeToOpenPercent={50}
            data={this.props.screenProps.messages}
            keyExtractor={(rowData, index) => {
              return rowData.id.toString();
            }}
            renderItem={(rowData, rowMap) => (
              <View style={{
                backgroundColor: rowData.item.color,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 65,
                borderRadius: 10,
                marginBottom: 15,
                paddingLeft: 10,
                paddingRight: 10,
              }}>
                <View style={{ flex: 8, flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <Text style={styles.text}>
                    {rowData.item.name}: {rowData.item.statement}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Text style={styles.timeText}>
                    {rowData.item.timeElapsed}
                  </Text>
                </View>
              </View>
            )}
            renderHiddenItem={(rowData, rowMap) => (
              <View style={styles.messagesRowBack}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={_ => {
                    rowMap[rowData.item.id].closeRow()
                    this.deleteMessage(rowData.item)
                  }}>
                  <Text style={styles.deleteButtonText}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.setState({ isModalVisible: false })}
          >
            <Card
              title={"Send Message"}
            >
              <View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {statements}
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {statements}
                </View>
              </View>
              <View style={{ height: 75, backgroundColor: tinycolor(this.state.color).toHslString(), padding: 10, justifyContent: 'center', margin: 10 }}>
                <Text style={{ fontSize: 40, color: 'white', }}>{this.state.name}: {this.props.navigation.getParam('name')} {this.state.message.join(' ')}
                </Text>
              </View>
              <Button
                raised
                title='Send'
                onPress={() => this.handleSendMessage()}
              />
            </Card>
          </Modal>
        </View>
      )
    }

    return (
      <Container style={{ backgroundColor: '#dce9ef' }}>
        <Grid>
          <Row size={2.5} style={styles.rowContainer}>
            <ScrollView contentContainerStyle={{ flex: 1, flexDirection: 'column', margin: 10 }}>
              {messagesView}
            </ScrollView>
          </Row>
          <Row size={1} style={styles.rowContainer}>
            <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
              {employeeButtons}
            </ScrollView>
          </Row>
        </Grid>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    backgroundColor: '#91bbd1',
    margin: 15,
    borderRadius: 10
  },
  messagesTimer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  messagesRowBack: {
    flex: 1,
    marginBottom: 15,
  },
  deleteButton: {
    backgroundColor: '#da635d',
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    borderRadius: 10
  },
  deleteButtonText: {
    color: "white",
    justifyContent: 'center',
    fontSize: 40,
  },
  text: {
    fontSize: 50,
    fontWeight: '600',
    color: 'white',
    flex: 1,
    flexWrap: 'wrap'
  },
  timeText: {
    fontSize: 25,
    color: 'white'
  },
  staffButtonText: {
    fontSize: 40,
    color: 'white',
    flex: 1,
    textAlign: 'center'
  }
});

export default MainPanel;