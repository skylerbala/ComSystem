import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Modal from "react-native-modal";
import { HueSlider, SaturationSlider, LightnessSlider } from 'react-native-color';
import tinycolor from 'tinycolor2';
import { Card } from 'react-native-elements';
import { FormLabel, FormInput } from 'react-native-elements';
import NoConnectionView from '../common/components/NoConnectionView';
import Button from '../common/components/Button'
import styles from './styles';

export default class EmployeesTab extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Employees',
		}
	};

	state = {
		isModalVisible: false,
		employee: {
			id: null,
			name: "",
			color: tinycolor('#70c1b3').toHsl()
		},
		isEditing: false
	};

	constructor(props) {
		super(props);
	}

	onAddEmployee = () => {
		let newEmployee = {
			name: this.state.employee.name,
			color: tinycolor(this.state.employee.color).toHexString()
		}
		this.props.screenProps.handleAddEmployee(newEmployee);
		this.resetState();
	}

	onEditEmployee = () => {
		let newEmployee = this.state.employee;
		newEmployee.color = tinycolor(newEmployee.color).toHexString();
		this.props.screenProps.handleUpdateEmployee(this.state.employee);
		this.resetState();
	}

	onUpdateEmployeeName = (name) => {
		let newEmployee = this.state.employee;
		newEmployee.name = name;
		this.setState({ employee: newEmployee });
	}

	onDeleteEmployee = (data) => {
		this.props.screenProps.handleDeleteEmployee(data);
	}

	showModal = () => {
		this.setState({ isModalVisible: true });
	}

	resetState = () => {
		this.setState({
			isModalVisible: false,
			isEditing: false,
			employee: {
				id: null,
				name: "",
				color: tinycolor('#70c1b3').toHsl()
			},
		});
	}

	onUpdateHue = (h) => {
		this.setState({
			employee: {
				id: this.state.employee.id,
				name: this.state.employee.name,
				color: { ...this.state.employee.color, h }
			}
		});
	}

	onUpdateSaturation = (s) => {
		this.setState({
			employee: {
				id: this.state.employee.id,
				name: this.state.employee.name,
				color: { ...this.state.employee.color, s }
			}
		});
	}

	onUpdateLightness = (l) => {
		this.setState({
			employee: {
				id: this.state.employee.id,
				name: this.state.employee.name,
				color: { ...this.state.employee.color, l }
			}
		});
	}

	renderEmployeeRowFront = (rowData) => {
		return (
			<View style={styles.employeeRowFront}>
				<Text style={styles.employeeRowFrontText}>{rowData.item.name}</Text>
				<View style={[styles.employeeRowFrontColorBox, { backgroundColor: rowData.item.color }]}></View>
			</View>
		);
	}

	renderEmployeeRowBack = (rowData, rowMap) => {
		return (
			<View style={styles.employeeRowBack}>
				<TouchableOpacity style={[styles.employeeRowBackButton, styles.employeeRowBackButtonLeft]} onPress={_ => {
					rowMap[rowData.item.id].closeRow()
					this.setState({
						isEditing: true,
						employee: {
							id: rowData.item.id,
							name: rowData.item.name,
							color: tinycolor(rowData.item.color).toHsl()
						}
					});
					this.showModal();
				}}>
					<Text style={styles.employeeRowBackText}>Edit</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.employeeRowBackButton, styles.employeeRowBackButtonRight]}
					onPress={_ => {
						rowMap[rowData.item.id].closeRow()
						this.onDeleteEmployee(rowData.item)
					}}>
					<Text style={styles.employeeRowBackText}>Delete</Text>
				</TouchableOpacity>
			</View>
		);
	}

	render = () => {
		let mainView = <NoConnectionView />

		if (this.props.screenProps.messageBoxIsConnected) {

			let modalTitle = "Add Employee";
			let modalOnPress = this.onAddEmployee;

			if (this.state.isEditing) {
				modalTitle = "Edit Employee";
				modalOnPress = this.onEditEmployee;
			}

			let modal = (
				<Modal isVisible={this.state.isModalVisible} onBackdropPress={this.resetState}>
					<Card title={modalTitle} containerStyle={styles.modalCard}>
						<FormLabel>Employee Name</FormLabel>
						<FormInput onChangeText={(name) => this.onUpdateEmployeeName(name)} />
						<FormLabel>Color</FormLabel>
						<FormLabel>Hue</FormLabel>
						<HueSlider
							gradientSteps={40}
							value={this.state.employee.color.h}
							color={this.state.employee.color}
							onValueChange={(h) => this.onUpdateHue(h)}
						/>
						<FormLabel style={styles.componentText}>Saturation</FormLabel>
						<SaturationSlider
							gradientSteps={20}
							value={this.state.employee.color.s}
							color={this.state.employee.color}
							onValueChange={(s) => this.onUpdateSaturation(s)}
						/>
						<FormLabel style={styles.componentText}>Lightness</FormLabel>
						<LightnessSlider
							gradientSteps={20}
							value={this.state.employee.color.l}
							color={this.state.employee.color}
							onValueChange={(l) => this.onUpdateLightness(l)}
						/>
						<View style={[styles.employeeRowFront, { backgroundColor: tinycolor(this.state.employee.color).toHexString() }]}>
							<Text style={styles.employeeRowFrontText}>{this.state.employee.name}</Text>
						</View>
						<Button title='Save' onPress={modalOnPress} />
					</Card>
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
								renderItem={(rowData) => this.renderEmployeeRowFront(rowData)}
								renderHiddenItem={(rowData, rowMap) => this.renderEmployeeRowBack(rowData, rowMap)}
							/>
						</View>
						<Button title={"Add"} onPress={this.showModal} />
						{modal}
					</View>
				</View>
			);
		}

		return mainView;
	}
}