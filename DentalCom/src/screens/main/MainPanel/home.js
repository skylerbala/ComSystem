
import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Card, CardItem, Button, Icon, Body, Left, Right, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { SwipeListView } from 'react-native-swipe-list-view';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';




class MainPanelTab extends Component {
  static navigationOptions = {
    title: 'MessagesPanel',
  }

  constructor(props) {
    super(props)
  }

  deleteMessage(data) {
    this.props.screenProps.handleDeleteMessage(data);
  }

  render() {
    let employeeButtons = this.props.screenProps.employees.map((employee) => {
      return (
        <Button
          style={{ marginRight: 15, marginBottom: 15, height: 60, backgroundColor: '#9ab7d3' }}
          onPress={() => this.props.navigation.navigate("SendMessage", {
            employeeName: employee.name
          })}
          key={employee.id}
        >
          <Text style={styles.text}>{employee.name}</Text>
        </Button>
      )
    });

    let messagesView;

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
            <View style={styles.rowFront}>
              <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={styles.text}>{rowData.item.employeeName}: {rowData.item.statement}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 10 }}>
                <Text style={styles.timeText}>{rowData.item.timeElapsed}</Text>
              </View>
            </View>
          )}
          renderHiddenItem={(rowData, rowMap) => (
            <View style={styles.rowBack}>
              <TouchableOpacity style={styles.backRightBtn} onPress={_ => {
                rowMap[rowData.item.id].closeRow()
                this.deleteMessage(rowData.item)
              }}>
                <Text style={[styles.text, styles.deleteText]}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )
    }
    else {
      messagesView = (
        <View style={styles.noConnectionView}>
          <Text style={styles.noConnectionText}>No Connection</Text>
        </View>
      )
    }

    return (
      <Container padder>
        <Grid style={{ backgroundColor: '#f7e1d3' }}>
          <Row size={2} style={{ backgroundColor: 'white', margin: 15, borderRadius: 10 }}>
            <Content padder contentContainerStyle={{ flexGrow: 1 }}>
              {messagesView}
            </Content>
          </Row>
          <Row size={1} style={{ backgroundColor: '#bdd0c4', margin: 15, borderRadius: 10 }}>
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
  text: {
    fontSize: 40,
    color: 'white'
  },
  timeText: {
    fontSize: 25,
    color: 'white'
  },
  deleteText: {
    color: "white"
  },
  noConnectionText: {
    textAlign: 'center',
    fontSize: 40
  },
  rowFront: {
    backgroundColor: '#9ab7d3',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    borderRightColor: '#CCC',
    paddingLeft: 10,
    borderRightWidth: 1,
    justifyContent: 'center',
    height: 75,
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 10
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    marginBottom: 15,
    borderRadius: 10
  },
  backRightBtn: {
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
  noConnectionView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

export default MainPanelTab;