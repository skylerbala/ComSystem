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
import { Card, ListItem, Button, Icon } from 'react-native-elements'


import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'


import {
	SlidersColorPicker,
	HueGradient,
	SaturationGradient,
	LightnessGradient,
	HueSlider,
	SaturationSlider,
	LightnessSlider
} from 'react-native-color';
import tinycolor from 'tinycolor2';




class StaffTab extends React.Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		return {
			title: 'Staff',
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
		color: tinycolor('#70c1b3').toHsl(),
		name: "",
	};

	updateHue = h => this.setState({ color: { ...this.state.color, h } });
	updateSaturation = s => this.setState({ color: { ...this.state.color, s } });
	updateLightness = l => this.setState({ color: { ...this.state.color, l } });

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.navigation.setParams({ handleToggle: () => this._toggleModal() });
	}

	_toggleModal() {
		// this.props.navigation.navigate("PickColor")
		this.setState({ isModalVisible: !this.state.isModalVisible });
	}

	_handleNameChange(name) {
		this.setState({ name: name })
	}

	_handleAddEmployee() {
		let data = {
			name: this.state.name,
			color: tinycolor(this.state.color).toHexString()
		}
		this.props.screenProps.handleAddEmployee(data);
		this.setState({ isModalVisible: false });
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

		let view = <NoConnectionView />

		if (this.props.screenProps.connected) {
			view = (
				<View>
					<View style={{ margin: 15 }}>
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
								<View style={{
									backgroundColor: rowData.item.color,
									borderBottomColor: '#CCC',
									borderBottomWidth: 1,
									borderRightColor: '#CCC',
									paddingLeft: 15,
									borderRightWidth: 1,
									justifyContent: 'center',
									height: 75,
								}}>
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
					</View>


					<Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.setState({ isModalVisible: false })}
					>
						<Card
							title={"Add Staff"}
						>
							<FormLabel>Staff Name</FormLabel>
							<FormInput onChangeText={(name) => this._handleNameChange(name)} />
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
								onPress={() => this._handleAddEmployee()}
							/>
						</Card>
					</Modal>
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
	text: {
		fontSize: 35,
		color: 'white'
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
		width: 200,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		bottom: 0,
		top: 0,
		right: 0
	},
	noConnectionView: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center'
	}
});

export default StaffTab;
