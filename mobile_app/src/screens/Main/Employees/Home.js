import React from 'react';
import { View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Modal from "react-native-modal";
import tinycolor from 'tinycolor2';
import NoConnectionView from '../common/components/NoConnectionView';
import Button from '../common/components/Button'
import styles from './styles';
import EmployeeFront from './components/EmployeeFront';
import EmployeeBack from './components/EmployeeBack';
import ModalCard from './components/ModalCard';
import shallowequal from 'shallowequal';
import Sounds from '../../../assets/sounds';


export default class EmployeesTab extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			headerTitleStyle: { alignSelf: 'center' },
			title: 'Employees',
			headerStyle: {
				backgroundColor: colors.logoBlue
			}
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			isModalVisible: false,
			isEditing: false
		};
		this.employee = {
			name: "",
			color: tinycolor('#' + (Math.random() * 0xFFFFFF << 0).toString(16)).toHsl(),
			ringtone: Sounds[0].name
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (!shallowequal(this.props.screenProps.employees, nextProps.screenProps.employees)) {
			return true;
		}
		else if (!shallowequal(this.state, nextState)) {
			return true;
		}
		return false;
	}

	onAddEmployeePress = () => {
		let index = Math.floor(Math.random() * 30)
		let randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });

		this.setState({ isModalVisible: true });
		this.employee = {
			name: this.employee.name,
			color: tinycolor(randomColor).toHsl(),
			ringtone: Sounds[index].name
		};
	}

	onEditEmployeePress = (employee) => {
		this.setState({ isModalVisible: true, isEditing: true });
		this.employee = {
			id: employee.id,
			name: employee.name,
			color: tinycolor(employee.color).toHsl(),
			ringtone: employee.ringtone
		}
	}

	onDeleteEmployeePress = (employee) => {
		this.props.screenProps.handleDeleteEmployee(employee);
	}

	resetState = () => {
		this.setState({ isModalVisible: false, isEditing: false });
		this.employee = {
			id: null,
			name: "",
			color: tinycolor('#70c1b3').toHsl(),
			ringtone: ""
		}
	}

	renderEmployeeFront = (rowData) => {
		return (
			<EmployeeFront
				name={rowData.item.name}
				color={rowData.item.color}
				ringtone={rowData.item.ringtone}
			/>
		);
	}

	renderEmployeeRowBack = (rowData) => {
		return (
			<EmployeeBack
				employee={rowData.item}
				onEditClick={this.onEditEmployeePress}
				onDeleteClick={this.onDeleteEmployeePress}
			/>
		);
	}

	render() {
		let mainView = <NoConnectionView />

		if (this.props.screenProps.messageBoxIsConnected) {

			let modalTitle = "Add Employee";

			if (this.state.isEditing) {
				modalTitle = "Edit Employee";
			}

			let modal = (
				<Modal isVisible={this.state.isModalVisible} onBackdropPress={this.resetState}>
					<ModalCard
						modalTitle={modalTitle}
						employee={this.employee}
						playTone={this.props.screenProps.playTone}
						handleAddEmployee={this.props.screenProps.handleAddEmployee}
						handleUpdateEmployee={this.props.screenProps.handleUpdateEmployee}
						handleResetState={this.resetState}
						isEditing={this.state.isEditing}
					/>
				</Modal>
			);

			mainView = (
				<View style={styles.mainView}>
					<View style={styles.mainSubView}>
						<View style={styles.employeesView}>
							<SwipeListView
								useFlatList
								closeOnRowBeginSwipe
								disableRightSwipe
								rightOpenValue={-250}
								stopRightSwipe={-250}
								swipeToOpenPercent={25}
								data={this.props.screenProps.employees}
								keyExtractor={(rowData) => rowData.id.toString()}
								renderItem={this.renderEmployeeFront}
								renderHiddenItem={this.renderEmployeeRowBack}
							/>
						</View>
						<Button title={"Add"} onPress={this.onAddEmployeePress} />
						{modal}
					</View>
				</View>
			);
		}

		return mainView;
	}
}