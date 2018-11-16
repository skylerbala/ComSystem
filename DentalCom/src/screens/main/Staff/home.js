
import React from 'react';
import { Container, Button, Text, Fab, Body, Icon, alert, Header, Left, Right, Title } from 'native-base';
import DialogInput from 'react-native-dialog-input';
import { SwipeListView } from 'react-native-swipe-list-view';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import styles from '../../../library/styles/SwipeListViewStyles';
import { ColorWheel } from 'react-native-color-wheel';


class StaffTab extends React.Component {
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

	toggleStaffFormVisibility() {
		this.setState({
			isStaffFormVisible: !this.state.isStaffFormVisible
		})
	}
	
	addEmployee(name) {
		let data = {
			name: name
		}
		this.props.screenProps.handleAddEmployee(data);
	}

	deleteEmployee(data) {
		this.props.screenProps.handleDeleteEmployee(data);
	}

	

	render() {
		return (
			<Container padder>
				<SwipeListView
					useFlatList
					closeOnRowBeginSwipe
					disableRightSwipe
					rightOpenValue={-200}
					stopRightSwipe={-200}
					swipeToOpenPercent={50}
					data={this.props.screenProps.employees}
					keyExtractor={(rowData, index) => {
						return rowData.id.toString();
					}}
					renderItem={(rowData, rowMap) => (
						<View style={styles.rowFront}>
							<Text style={styles.text}>{rowData.item.name}</Text>
						</View>
					)}
					renderHiddenItem={(rowData, rowMap) => (
						<TouchableOpacity
							style={[styles.deleteButton]}
							onPress={_ => {
								rowMap[rowData.item.id].closeRow()
								this.deleteEmployee(rowData.item)
							}}>
							<View>
								<Text style={[styles.text, styles.deleteText]}>Delete</Text>
							</View>
						</TouchableOpacity>
					)}
				/>
				<DialogInput isDialogVisible={this.state.isStaffFormVisible}
					title={"Add Staff"}
					hintInput={"Name"}
					submitInput={(input) => {
						this.addEmployee(input)
						this.toggleStaffFormVisibility()
					}}
					closeDialog={() => { this.toggleStaffFormVisibility() }}>
				</DialogInput>
			</Container >
		);
	}
}

export default StaffTab;