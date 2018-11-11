import React, { Component } from 'react';
import { Container, Button, Content, Form, Item, Label, Input, Text, Fab, Body, Icon, alert, Header, Left, Right, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import DialogInput from 'react-native-dialog-input';
import { SwipeListView } from 'react-native-swipe-list-view';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

class SendMessageTab extends Component {
	static navigationOptions = {
		title: 'SendMessage',
	}

	state = {
		isStaffFormVisible: false
	}

	constructor(props) {
		super(props);
	}


	addMessage(staffName, message) {
		this.props.screenProps.onMessageAdd(staffName, message);
	}

	render() {
		console.log(this.props.screenProps.staff)
		return (
			<Container padder>
				<SwipeListView
					useFlatList={true}
					closeOnRowBeginSwipe
					disableRightSwipe
					disableLeftSwipe
					data={this.props.screenProps.messageOptions}
					renderItem={(rowData, rowMap) => (
						<TouchableOpacity
							style={styles.rowFront}
							onPress={_ => {
								this.props.navigation.pop();
								this.addMessage(this.props.navigation.getParam('staffName'), rowData.item.message);
							}}>
							<Text style={styles.text}>{rowData.item.message}</Text>
						</TouchableOpacity>
					)}
				/>
			</Container >
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

export default SendMessageTab;