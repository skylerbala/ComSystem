import React from 'react';
import { Text, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Modal from "react-native-modal";
import { HueSlider, SaturationSlider, LightnessSlider } from 'react-native-color';
import tinycolor from 'tinycolor2';
import { Card } from 'react-native-elements';
import { FormLabel, FormInput } from 'react-native-elements';
import NoConnectionView from '../common/components/NoConnectionView';
import Button from '../common/components/Button'
import styles from './styles';
import EmployeeButton from '../common/components/EmployeeButton';
import EmployeeFront from './components/EmployeeFront';
import EmployeeBack from './components/EmployeeBack';
import ModalCard from './components/ModalCard';
import shallowequal from 'shallowequal';
import RNPickerSelect from 'react-native-picker-select';
import { scale } from '../../../library/utils/ScalingAPI';
import Sounds from '../../../assets/sounds';


export default class EmployeesTab extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: () => {
				return (
					<Text style={{ fontWeight: '600' }}>
						Employees
          </Text>
				);
			},
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			isModalVisible: false,
			employee: {
				name: "",
				color: tinycolor('#70c1b3').toHsl(),
				ringtone: Sounds[0].name
			},
			isEditing: false
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

	onSaveEmployeePress = () => {
		let newEmployee = {
			id: this.state.employee.id,
			name: this.state.employee.name,
			color: tinycolor(this.state.employee.color).toHexString(),
			ringtone: this.state.employee.ringtone
		}
		if (this.state.isEditing) {
			this.props.screenProps.handleUpdateEmployee(newEmployee);
		}
		else {
			this.props.screenProps.handleAddEmployee(newEmployee);
		}
		this.resetState();
	}

	onEditEmployeePress = (employee) => {
		this.setState({
			isEditing: true,
			employee: {
				id: employee.id,
				name: employee.name,
				color: tinycolor(employee.color).toHsl(),
				ringtone: employee.ringtone
			}
		});
		this.showModal();
	}

	onUpdateEmployeeName = (name) => {
		this.setState({
			employee: {
				id: this.state.employee.id,
				name: name,
				color: this.state.employee.color,
				ringtone: this.state.employee.ringtone
			}
		});
	}

	onDeleteEmployeePress = (employee) => {
		this.props.screenProps.handleDeleteEmployee(employee);
	}

	onRingtoneChange = (ringtone) => {
		this.setState({
			employee: {
				id: this.state.employee.id,
				name: this.state.employee.name,
				color: this.state.employee.color,
				ringtone: ringtone
			}
		});
		this.props.screenProps.playRingtone(ringtone);
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
				color: tinycolor('#70c1b3').toHsl(),
				ringtone: ""
			},
		});
	}

	onUpdateHue = (h) => {
		this.setState({
			employee: {
				id: this.state.employee.id,
				name: this.state.employee.name,
				color: { ...this.state.employee.color, h },
				ringtone: this.state.employee.ringtone
			}
		});
	}

	onUpdateSaturation = (s) => {
		this.setState({
			employee: {
				id: this.state.employee.id,
				name: this.state.employee.name,
				color: { ...this.state.employee.color, s },
				ringtone: this.state.employee.ringtone
			}
		});
	}

	onUpdateLightness = (l) => {
		this.setState({
			employee: {
				id: this.state.employee.id,
				name: this.state.employee.name,
				color: { ...this.state.employee.color, l },
				ringtone: this.state.employee.ringtone
			}
		});
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
		console.log('Employee')

		let mainView = <NoConnectionView />

		if (this.props.screenProps.messageBoxIsConnected) {

			let modalTitle = "Add Employee";

			if (this.state.isEditing) {
				modalTitle = "Edit Employee";
			}

			let modal = (
				<Modal isVisible={this.state.isModalVisible} onBackdropPress={this.resetState}>
					{/* <ModalCard
						modalTitle={modalTitle}
						employee={this.state.employee}
						playRingtone={this.props.screenProps.playRingtone}
					/> */}
					<Card title={modalTitle} containerStyle={styles.modalCard}>
						<FormLabel labelStyle={{ fontSize: scale(14) }}>Employee Name</FormLabel>
						<FormInput onChangeText={this.onUpdateEmployeeName} />
						<FormLabel labelStyle={{ fontSize: scale(14) }}>Message Ringtone</FormLabel>
						<View
							style={{
								marginLeft: 20,
								marginRight: 20,
								marginTop: 15,
								marginBottom: 5,
							}}
						>
							<RNPickerSelect
								placeholder={{
									label: 'Select a ringtone...',
									value: null,
									color: '#bdc6cf',
									fontSize: scale(30),
								}}
								style={{
									fontColor: "#bdc6cf",
									fontSize: scale(16),
								}}
								placeholderTextColor={"#bdc6cf"}
								items={Sounds}
								onValueChange={(value) => this.onRingtoneChange(value)}
								value={this.state.employee.ringtone}
								hideIcon
								useNativeAndroidPickerStyle={false}
							/>
						</View>
						<FormLabel labelStyle={{ fontSize: scale(14) }}>Color</FormLabel>
						<FormLabel>Hue</FormLabel>
						<HueSlider
							gradientSteps={100}
							value={this.state.employee.color.h}
							color={this.state.employee.color}
							onValueChange={this.onUpdateHue}
						/>
						<FormLabel style={styles.componentText}>Saturation</FormLabel>
						<SaturationSlider
							gradientSteps={100}
							value={this.state.employee.color.s}
							color={this.state.employee.color}
							onValueChange={this.onUpdateSaturation}
						/>
						<FormLabel style={styles.componentText}>Lightness</FormLabel>
						<LightnessSlider
							gradientSteps={100}
							value={this.state.employee.color.l}
							color={this.state.employee.color}
							onValueChange={this.onUpdateLightness}
						/>
						<View style={{ flex: 1, alignItems: 'center', marginBottom: 50 }}>
							<EmployeeButton
								name={this.state.employee.name}
								color={tinycolor(this.state.employee.color).toHexString()}
								onClick={null}
							/>
						</View>
						<Button title='Save' onPress={this.onSaveEmployeePress} />
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
								renderItem={this.renderEmployeeFront}
								renderHiddenItem={this.renderEmployeeRowBack}
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