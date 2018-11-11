
import React, { Component } from 'react';
import { Container, Button, Content, Form, Item, Label, Input, Text, Fab, Body, Icon, alert, Header, Left, Right, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import DialogInput from 'react-native-dialog-input';
import { SwipeListView } from 'react-native-swipe-list-view';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

class TableView extends Component {
  state = {

  }

  render() {
    return (
      <SwipeListView
        useFlatList={true}
        closeOnRowBeginSwipe
        disableRightSwipe
        data={this.props.data}
        renderItem={(rowData, rowMap) => (
          <View style={styles.rowFront}>
            <Text style={styles.text}>{rowData.item.name}</Text>
          </View>
        )}
        renderHiddenItem={(rowData, rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity style={styles.backRightBtnRight} onPress={_ => {
              rowMap[rowData.item.key].closeRow()
              this.deleteStaff(rowData.item.name)
            }}>
              <Text style={[styles.text, styles.deleteText]}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-200}
      />
    );
  }
}


const styles = StyleSheet.create({
  text: {
    fontSize: 50,
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
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
    paddingLeft: 15,
	},
	backRightBtnRight: {
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

export default TableView;