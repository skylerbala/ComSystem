
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
            <Text>{rowData.item.name}</Text>
          </View>
        )}
        renderHiddenItem={(rowData, rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={_ => {
              rowMap[rowData.item.key].closeRow()
              this.deleteStaff(rowData.item.name)
            }}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-75}
      />
    );
  }
}


const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1
	},
	standalone: {
		marginTop: 30,
		marginBottom: 30,
	},
	standaloneRowFront: {
		alignItems: 'center',
		backgroundColor: '#CCC',
		justifyContent: 'center',
		height: 50,
	},
	standaloneRowBack: {
		alignItems: 'center',
		backgroundColor: '#8BC645',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15
	},
	backTextWhite: {
		color: '#FFF'
	},
	rowFront: {
		backgroundColor: 'white',
		borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderRightColor: 'black',
		borderRightWidth: 1,
		justifyContent: 'center',
		height: 50,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0
	},
	controls: {
		alignItems: 'center',
		marginBottom: 30
	},
	switchContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 5
	},
	switch: {
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'black',
		paddingVertical: 10,
		width: Dimensions.get('window').width / 4,
	}
});

export default TableView;