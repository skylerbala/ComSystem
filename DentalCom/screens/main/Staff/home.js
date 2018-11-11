
import React, { Component } from 'react';
import { Container, Button, Content, Form, Item, Label, Input, Text, Fab, Body, Icon, alert, Header, Left, Right, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import DialogInput from 'react-native-dialog-input';
import { SwipeListView } from 'react-native-swipe-list-view';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

class StaffTab extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		return {
			title: 'Staff',
			headerRight: (
				<Button transparent onPress={() => params.handleToggle()}>
					<Icon type="FontAwesome" name="plus" />
				</Button>
			)
		}
	};

	state = {
		isStaffFormVisible: false
	}

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.navigation.setParams({ handleToggle: () => this.toggleStaffFormVisibility() });
	}

	addStaff(name) {
		this.props.screenProps.onStaffAdd(name);
	}

	deleteStaff(id) {
		this.props.screenProps.onStaffDelete(id);
	}

	toggleStaffFormVisibility() {
		this.setState({
			isStaffFormVisible: !this.state.isStaffFormVisible
		})
	}

	render() {
		return (
			<Container padder>
				<SwipeListView
					useFlatList={true}
					closeOnRowBeginSwipe
					disableRightSwipe
					data={this.props.screenProps.staff}
					renderItem={(rowData, rowMap) => (
						<View style={styles.rowFront}>
							<Text style={styles.text}>{rowData.item.name}</Text>
						</View>
					)}
					renderHiddenItem={(rowData, rowMap) => (
						<View style={styles.rowBack}>
							<TouchableOpacity style={styles.backRightBtn} onPress={_ => {
								rowMap[rowData.item.key].closeRow()
								this.deleteStaff(rowData.item.id)
							}}>
								<Text style={[styles.text, styles.deleteText]}>Delete</Text>
							</TouchableOpacity>
						</View>
					)}
					rightOpenValue={-200}
				/>
				<DialogInput isDialogVisible={this.state.isStaffFormVisible}
					title={"Add Staff"}
					hintInput={"Name"}
					submitInput={(input) => {
						this.addStaff(input)
						this.toggleStaffFormVisibility()
					}}
					closeDialog={() => { this.toggleStaffFormVisibility() }}>
				</DialogInput>
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

export default StaffTab;