import React from 'react';
import { Container, Text } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import {
	Dimensions,
	TouchableOpacity,
	StyleSheet,
	View,
} from 'react-native';
import Modal from "react-native-modal";
import NoConnectionView from '../common/components/NoConnectionView';
import { Card } from 'react-native-elements';
import { FormLabel, FormInput } from 'react-native-elements';
import {
	HueSlider,
	SaturationSlider,
	LightnessSlider
} from 'react-native-color';
import tinycolor from 'tinycolor2';
import Button from '../common/components/Button'





export default class EmployeesTab extends React.Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
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

		this.onAddEmployee = this.onAddEmployee.bind(this);
		this.onEditEmployee = this.onEditEmployee.bind(this);
		this.showModal = this.showModal.bind(this);
		this.resetState = this.resetState.bind(this);

	}

	onAddEmployee() {
		let newEmployee = {
			name: this.state.employee.name,
			color: tinycolor(this.state.employee.color).toHexString()
		}
		this.props.screenProps.handleAddEmployee(newEmployee);
		this.resetState();
	}

	onEditEmployee() {
		let newEmployee = this.state.employee;
		newEmployee.color = tinycolor(newEmployee.color).toHexString();
		this.props.screenProps.handleUpdateEmployee(this.state.employee);
		this.resetState();
	}

	onDeleteEmployee(data) {
		this.props.screenProps.handleDeleteEmployee(data);
	}

	showModal() {
		this.setState({ isModalVisible: true });
	}

	resetState() {
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

	updateHue(h) {
		this.setState({
			employee: {
				id: this.state.employee.id,
				name: this.state.employee.name,
				color: { ...this.state.employee.color, h }
			}
		});
	}

	updateSaturation(s) {
		this.setState({
			employee: {
				id: this.state.employee.id,
				name: this.state.employee.name,
				color: { ...this.state.employee.color, s }
			}
		});
	}

	updateLightness(l) {
		this.setState({
			employee: {
				id: this.state.employee.id,
				name: this.state.employee.name,
				color: { ...this.state.employee.color, l }
			}
		});
	}

	render() {
		let mainView = <NoConnectionView />

		if (this.props.screenProps.isConnected) {
			let modalTitle = "Add Employee";
			let modalOnPress = this.onAddEmployee;

			if (this.state.isEditing) {
				modalTitle = "Edit Employee";
				modalOnPress = this.onEditEmployee;
			}

			const modal = (
				<Modal isVisible={this.state.isModalVisible} onBackdropPress={this.resetState}>
					<Card title={modalTitle}>
						<FormLabel>Employee Name</FormLabel>
						<FormInput onChangeText={
							(name) => {
								let newEmployee = this.state.employee;
								newEmployee.name = name;
								this.setState({ employee: newEmployee });
							}} />
						<FormLabel>Color</FormLabel>
						<FormLabel>Hue</FormLabel>
						<HueSlider
							gradientSteps={40}
							value={this.state.employee.color.h}
							color={this.state.employee.color}
							onValueChange={(h) => this.updateHue(h)}
						/>
						<FormLabel style={styles.componentText}>Saturation</FormLabel>
						<SaturationSlider
							gradientSteps={20}
							value={this.state.employee.color.s}
							color={this.state.employee.color}
							onValueChange={(s) => this.updateSaturation(s)}
						/>
						<FormLabel style={styles.componentText}>Lightness</FormLabel>
						<LightnessSlider
							gradientSteps={20}
							value={this.state.employee.color.l}
							color={this.state.employee.color}
							onValueChange={(l) => this.updateLightness(l)}
						/>
						<View style={
							[
								styles.employeePreview,
								{ backgroundColor: tinycolor(this.state.employee.color).toHexString() }
							]
						}>
							<Text style={styles.employeePreviewText}>{this.state.employee.name}</Text>
						</View>
						<Button title='Save' onPress={modalOnPress} />
					</Card>
				</Modal>
			)

			mainView = (
				<View style={styles.mainContainer}>
					<View style={styles.employeesView}>
						<SwipeListView
							useFlatList
							closeOnRowBeginSwipe
							disableRightSwipe
							rightOpenValue={-250}
							stopRightSwipe={-250}
							swipeToOpenPercent={50}
							data={this.props.screenProps.employees}
							keyExtractor={(rowData, index) => {
								return rowData.id.toString();
							}}
							renderItem={(rowData, rowMap) => (
								<View style={styles.employeeRow}>
									<Text style={styles.employeeRowText}>{rowData.item.name}</Text>
									<View style={[styles.employeeRowColorBox, { backgroundColor: rowData.item.color }]}></View>
								</View>
							)}
							renderHiddenItem={(rowData, rowMap) => (
								<View style={styles.employeeRowBack}>
									<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={_ => {
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
										<Text style={styles.backTextWhite}>Edit</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={[styles.backRightBtn, styles.backRightBtnRight]}
										onPress={_ => {
											rowMap[rowData.item.id].closeRow()
											this.onDeleteEmployee(rowData.item)
										}}>
										<Text style={styles.backTextWhite}>Delete</Text>
									</TouchableOpacity>
								</View>
							)}
						/>
					</View>
					<View style={{ flex: .1, }}>
						<Button title={"Add Employee"} onPress={this.showModal} />
					</View>
					{modal}
				</View>
			);
		}

		return (
			<Container style={{ backgroundColor: '#dce9ef' }}>
				{mainView}
			</Container >
		);
	}
}

const styles = StyleSheet.create({
	employeePreview: {
		height: 50,
		margin: 10
	},
	employeePreviewText: {
		fontSize: 40,
		color: 'white',
		alignSelf: 'center'
	},
	mainContainer: {
		flex: 1,
		flexDirection: 'column',
		margin: 15,
		borderRadius: 15,
		backgroundColor: "#91bbd1",
	},
	employeesView: {
		flex: 1,
		margin: 10
	},
	employeeRow: {
		backgroundColor: '#478375',
		borderBottomColor: '#CCC',
		borderBottomWidth: 1,
		borderRightColor: '#CCC',
		paddingLeft: 15,
		borderRightWidth: 1,
		height: 75,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	employeeRowText: {
		fontSize: 35,
		color: 'white',
		flex: 1,
		justifyContent: 'flex-start'
	},
	employeeRowColorBox: {
		height: 50,
		width: 50,
		justifyContent: 'center',
		marginRight: 15
	},
	employeeRowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	container: {
		backgroundColor: 'white',
		flex: 1
	},
	backTextWhite: {
		color: '#FFF',
		fontSize: 35,
	},
	rowFront: {
		alignItems: 'center',
		backgroundColor: '#CCC',
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		justifyContent: 'center',
		height: 50,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 125
	},
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 125
	},
	backRightBtnRight: {
		backgroundColor: '#da635d',
		right: 0
	},
	deleteText: {
		color: "white"
	},
	noConnectionText: {
		textAlign: 'center',
		fontSize: 40,
		justifyContent: 'center'
	},
	deleteButton: {
		backgroundColor: '#da635d',
		width: 100,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		bottom: 0,
		top: 0,
		right: 0
	},
});