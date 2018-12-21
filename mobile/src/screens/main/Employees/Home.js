import React from 'react';
import { Container, Content, Text, Fab, Body, alert, Header, Left, Right, Title, Form, Input, Item, Label } from 'native-base';
import DialogInput from 'react-native-dialog-input';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ColorWheel } from 'react-native-color-wheel';
import {
	Dimensions,
	TouchableOpacity,
	StyleSheet,
	View,
	TextInput
} from 'react-native';
import Modal from "react-native-modal";
import ColorPalette from 'react-native-color-palette';
import { Col, Row, Grid } from 'react-native-easy-grid';
import NoConnectionView from '../common/components/NoConnectionView';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

import {
	HueSlider,
	SaturationSlider,
	LightnessSlider
} from 'react-native-color';
import tinycolor from 'tinycolor2';




export default class EmployeesTab extends React.Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		return {
			title: 'Employees',
			headerRight: (
				<Button
					icon={{ name: 'plus', type: 'font-awesome', color: '#007aff' }}
					onPress={() => params.handleToggle()}
					backgroundColor='transparent'
				/>
			)
		}
	};

	state = {
		isModalVisible: false,
		id: null,
		color: tinycolor('#70c1b3').toHsl(),
		name: "",
		isEditing: false,
	};

	updateHue = h => this.setState({ color: { ...this.state.color, h } });
	updateSaturation = s => this.setState({ color: { ...this.state.color, s } });
	updateLightness = l => this.setState({ color: { ...this.state.color, l } });

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.navigation.setParams({ handleToggle: () => this.toggleModal() });
	}

	toggleModal() {
		// this.props.navigation.navigate("PickColor")
		this.setState({ isModalVisible: !this.state.isModalVisible });
	}

	onNameChange(name) {
		this.setState({ name: name })
	}

	onAddEmployee() {
		let newEmployee = {
			name: this.state.name,
			color: tinycolor(this.state.color).toHexString()
		}
		this.props.screenProps.handleAddEmployee(newEmployee);
		this.setState({
			isModalVisible: false,
			color: tinycolor('#70c1b3').toHsl(),
			name: "",
		});
	}

	onEditEmployee() {
		let newEmployee = {
			id: this.state.id,
			name: this.state.name,
			color: tinycolor(this.state.color).toHexString()
		}
		this.setState({
			isModalVisible: false,
			isEditing: false,
			color: tinycolor('#70c1b3').toHsl(),
			name: "",
		});
		this.props.screenProps.handleUpdateEmployee(newEmployee);
	}

	onDeleteEmployee(data) {
		this.props.screenProps.handleDeleteEmployee(data);
	}

	render() {
		console.log(this.state)
		let view = <NoConnectionView />
		let modal = null
		if (this.state.isEditing) {
			modal = (
				<Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.setState({ isModalVisible: false, isEditing: false,
				})}
					>
						<Card
							title={"Edit Staff"}
						>
							<FormLabel>Staff Name</FormLabel>
							<FormInput onChangeText={(name) => this.onNameChange(name)} />
							<View style={{ height: 50, backgroundColor: tinycolor(this.state.color).toHslString(), margin: 10 }}>
								<Text style={{ fontSize: 40, color: 'white', alignSelf: 'center' }}>{this.state.name}</Text>
							</View>
							<FormLabel style={styles.sectionText}>Color</FormLabel>
							<FormLabel style={styles.componentText}>Hue</FormLabel>
							<HueSlider
								style={styles.sliderRow}
								gradientSteps={40}
								value={this.state.color.h}
								onValueChange={this.updateHue}
							/>
							<FormLabel style={styles.componentText}>Saturation</FormLabel>
							<SaturationSlider
								style={styles.sliderRow}
								gradientSteps={20}
								value={this.state.color.s}
								color={this.state.color}
								onValueChange={this.updateSaturation}
							/>
							<FormLabel style={styles.componentText}>Lightness</FormLabel>
							<LightnessSlider
								style={styles.sliderRow}
								gradientSteps={20}
								value={this.state.color.l}
								color={this.state.color}
								onValueChange={this.updateLightness}
							/>
							<Button
								raised
								title='Save'
								onPress={() => this.onEditEmployee()}
							/>
						</Card>
					</Modal>
			)
		}
		else {
			modal = (
				<Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.setState({ isModalVisible: false })}
					>
						<Card
							title={"Add Staff"}
						>
							<FormLabel>Staff Name</FormLabel>
							<FormInput onChangeText={(name) => this.onNameChange(name)} />
							<View style={{ height: 50, backgroundColor: tinycolor(this.state.color).toHslString(), margin: 10 }}>
								<Text style={{ fontSize: 40, color: 'white', alignSelf: 'center' }}>{this.state.name}</Text>
							</View>
							<FormLabel style={styles.sectionText}>Color</FormLabel>
							<FormLabel style={styles.componentText}>Hue</FormLabel>
							<HueSlider
								style={styles.sliderRow}
								gradientSteps={40}
								value={this.state.color.h}
								onValueChange={this.updateHue}
							/>
							<FormLabel style={styles.componentText}>Saturation</FormLabel>
							<SaturationSlider
								style={styles.sliderRow}
								gradientSteps={20}
								value={this.state.color.s}
								color={this.state.color}
								onValueChange={this.updateSaturation}
							/>
							<FormLabel style={styles.componentText}>Lightness</FormLabel>
							<LightnessSlider
								style={styles.sliderRow}
								gradientSteps={20}
								value={this.state.color.l}
								color={this.state.color}
								onValueChange={this.updateLightness}
							/>
							<Button
								raised
								title='Save'
								onPress={() => this.onAddEmployee()}
							/>
						</Card>
					</Modal>
			)
		}

		if (this.props.screenProps.isConnected) {
			view = (
				<View>
					<View style={{ margin: 15 }}>
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
								<View style={{
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
								}}>
									<Text style={styles.text}>{rowData.item.name}</Text>
									<View style={{ backgroundColor: rowData.item.color, height: 50, width: 50, justifyContent: 'center', marginRight: 15 }}></View>
								</View>
							)}
							renderHiddenItem={(rowData, rowMap) => (
								<View style={styles.rowBack}>
									<Text>Left</Text>
									<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={_ => {
										rowMap[rowData.item.id].closeRow()
										this.setState({ isEditing: true, id: rowData.item.id });
										this.toggleModal();
									}}>
										<Text style={styles.backTextWhite}>Edit</Text>
									</TouchableOpacity>
									<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={_ => {
										rowMap[rowData.item.id].closeRow()
										this.onDeleteEmployee(rowData.item)
									}}>
										<Text style={styles.backTextWhite}>Delete</Text>
									</TouchableOpacity>
								</View>
							)}
						/>
					</View>


					{modal}
				</View>
			);
		}

		return (
			<Container style={{ backgroundColor: '#dce9ef' }}>
				{view}
			</Container >
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
	},
	trash: {
		height: 25,
		width: 25,
	},


	text: {
		fontSize: 35,
		color: 'white',
		flex: 1,
		justifyContent: 'flex-start'
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