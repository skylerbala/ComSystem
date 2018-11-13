
import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Card, CardItem, Button, Icon, Body, Left, Right, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { SwipeListView } from 'react-native-swipe-list-view';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';




class MainPanelTab extends Component {
  static navigationOptions = {
    title: 'MainPanel',
  }

  state = {
    employees: {
      row1: [],
      row2: [],
      row3: []
    }
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.screenProps.employees != []) {
      chunks = this.chunkify(nextProps.screenProps.employees, 3, true);
      newEmployees = {
        row1: chunks[0],
        row2: chunks[1],
        row3: chunks[2],
      }
  
      this.setState({
        employees: newEmployees
      })
    } 
  }

  deleteMessage(data) {
    this.props.screenProps.handleDeleteMessage(data);
  }

  chunkify(a, n, balanced) {

    if (n < 2)
      return [a];

    var len = a.length,
      out = [],
      i = 0,
      size;

    if (len % n === 0) {
      size = Math.floor(len / n);
      while (i < len) {
        out.push(a.slice(i, i += size));
      }
    }

    else if (balanced) {
      while (i < len) {
        size = Math.ceil((len - i) / n--);
        out.push(a.slice(i, i += size));
      }
    }

    else {

      n--;
      size = Math.floor(len / n);
      if (len % size === 0)
        size--;
      while (i < size * n) {
        out.push(a.slice(i, i += size));
      }
      out.push(a.slice(size * n));

    }
    return out;

  }

  render() {
    return (
      <Container padder>

        <Grid>
          <Row size={3} style={{ backgroundColor: '#635DB7' }}>
            <Content padder contentContainerStyle={{ flexGrow: 1 }}>
              <SwipeListView
                useFlatList={true}
                closeOnRowBeginSwipe
                disableRightSwipe
                data={this.props.screenProps.messages}
                renderItem={(rowData, rowMap) => (
                  <View style={styles.rowFront}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                      <Text style={styles.text}>{rowData.item.employeeName}: {rowData.item.statement}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <Text style={styles.text}>{rowData.item.timeElapsed}</Text>
                    </View>
                  </View>
                )}
                renderHiddenItem={(rowData, rowMap) => (
                  <View style={styles.rowBack}>
                    <TouchableOpacity style={styles.backRightBtn} onPress={_ => {
                      rowMap[rowData.item.key].closeRow()
                      this.deleteMessage(rowData.item)
                    }}>
                      <Text style={[styles.text, styles.deleteText]}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
                rightOpenValue={-200}
              />
            </Content>
          </Row>
          <Row size={1.5} style={{ backgroundColor: '#00CE9F' }}>
            <Content padder contentContainerStyle={{ flexGrow: 1 }}>
              <List dataArray={this.props.screenProps.employees} horizontal={true}
                removeClippedSubviews={false}
                renderRow={(item) =>
                  <Button
                    style={{ marginRight: 15 }}
                    onPress={() => this.props.navigation.navigate("SendMessage", {
                      employeeName: item.name
                    })}
                  >
                    <Text>{item.name}</Text>
                  </Button>
                }>
              </List>
              {/* <List dataArray={this.state.employees.row2} horizontal={true}
                removeClippedSubviews={false}
                renderRow={(item) =>
                  <Button
                    style={{ marginRight: 15 }}
                    onPress={() => this.props.navigation.navigate("SendMessage", {
                      employeeName: item.name
                    })}
                  >
                    <Text>{item.name}</Text>
                  </Button>
                }>
              </List>
              <List 
                dataArray={this.state.employees.row3} horizontal={true}
                removeClippedSubviews={false}
                renderRow={(item) =>
                  <Button
                    style={{ marginRight: 15 }}
                    onPress={() => this.props.navigation.navigate("SendMessage", {
                      employeeName: item.name
                    })}
                  >
                    <Text>{item.name}</Text>
                  </Button>
                }>
              </List> */}
            </Content>
          </Row>
        </Grid >
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  deleteText: {
    color: "white"
  },
  rowFront: {
    backgroundColor: 'white',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    borderRightColor: '#CCC',
    paddingLeft: 15,
    borderRightWidth: 1,
    justifyContent: 'center',
    height: 100,
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    marginBottom: 15

  },
  backRightBtn: {
    backgroundColor: 'red',
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0
  },
});

export default MainPanelTab;