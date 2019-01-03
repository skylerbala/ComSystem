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
import EmployeeButton from '../common/components/EmployeeButton';
import EmployeeFront from './components/EmployeeFront';
import EmployeeBack from './components/EmployeeBack';
import shallowequal from 'shallowequal';


export default class EmployeesTab extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: () => {
        return (
          <Text style={{ fontWeight: '600' }}>
            Employees
          </Text>
        );
      }
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			isModalVisible: false,
			employee: {
				id: null,
				name: "",
				color: tinycolor('#70c1b3').toHsl()
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
			color: tinycolor(this.state.employee.color).toHexString()
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
				color: tinycolor(employee.color).toHsl()
			}
		});
		this.showModal();
	}

	onUpdateEmployeeName = (name) => {
		this.setState({
			employee: {
				id: this.state.employee.id,
				name: name,
				color: this.state.employee.color
			}
		});
	}

	onDeleteEmployeePress = (employee) => {
		this.props.screenProps.handleDeleteEmployee(employee);
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

	renderEmployeeFront = (rowData) => {
		return (
			<EmployeeFront
				name={rowData.item.name}
				color={rowData.item.color}
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
					<Card title={modalTitle} containerStyle={styles.modalCard}>
						<FormLabel>Employee Name</FormLabel>
						<FormInput onChangeText={this.onUpdateEmployeeName} />
						<FormLabel>Color</FormLabel>
						<FormLabel>Hue</FormLabel>
						<HueSlider
							gradientSteps={5}
							value={this.state.employee.color.h}
							color={this.state.employee.color}
							onValueChange={this.onUpdateHue}
						/>
						<FormLabel style={styles.componentText}>Saturation</FormLabel>
						<SaturationSlider
							gradientSteps={5}
							value={this.state.employee.color.s}
							color={this.state.employee.color}
							onValueChange={this.onUpdateSaturation}
						/>
						<FormLabel style={styles.componentText}>Lightness</FormLabel>
						<LightnessSlider
							gradientSteps={5}
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