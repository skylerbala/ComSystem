
import React, { Component } from 'react';
import { Container, Content, Text, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { SwipeListView } from 'react-native-swipe-list-view';
import { View, TouchableOpacity, StyleSheet } from 'react-native';





class MainPanelTab extends Component {
  static navigationOptions = {
    title: 'MainPanel',
  }

  constructor(props) {
    super(props)
  }

  deleteMessage(data) {
    this.props.screenProps.handleDeleteMessage(data);
  }

  render() {
    let messagesView;
    let employeeButtons;

    employeeButtons = this.props.screenProps.employees.map((employee) => {
      return (
        <Button
          style={styles.staffButton}
          onPress={() => this.props.navigation.navigate("SendMessage", {
            employeeName: employee.name
          })}
          key={employee.id}
        >
          <Text style={styles.staffButtonText}>{employee.name}</Text>
        </Button>
      )
    });

    if (this.props.screenProps.connected) {
      messagesView = (
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
            <View style={styles.messagesRowFront}>
              <View style={styles.messagesContent}>
                <Text style={styles.text}>
                  {rowData.item.employeeName}: {rowData.item.statement}
                </Text>
              </View>
              <View style={styles.messagesTimer}>
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
      )
    }
    else {
      messagesView = (
        <View style={styles.noConnectionView}>
          <Text style={styles.noConnectionText}>
            No Connection
          </Text>
        </View>
      )
    }

    return (
      <Container>
        <Grid style={styles.gridContainer}>
          <Row size={2} style={styles.rowContainer}>
            <Content padder contentContainerStyle={{ flexGrow: 1 }}>
              {messagesView}
            </Content>
          </Row>
          <Row size={1} style={styles.rowContainer}>
            <Content padder contentContainerStyle={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
              {employeeButtons}
            </Content>
          </Row>
        </Grid >
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  gridContainer: {
    backgroundColor: '#dce9ef'
  },
  rowContainer: {
    backgroundColor: '#91bbd1',
    margin: 15,
    borderRadius: 10
  },
  messagesRowFront: {
    backgroundColor: '#00356a',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 113,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10
  },
  messagesContent: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  messagesTimer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  noConnectionText: {
    textAlign: 'center',
    fontSize: 40
  },
  noConnectionView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  text: {
    fontSize: 40,
    color: 'white',
    flex: 1,
    flexWrap: 'wrap'
  },
  timeText: {
    fontSize: 25,
    color: 'white'
  },
  staffButton: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
    height: 60,
    width: 169,
    backgroundColor: '#3286aa',
  },
  staffButtonText: {
    fontSize: 40,
    color: 'white',
    flex: 1,
    textAlign: 'center'
  }
});

export default MainPanelTab;