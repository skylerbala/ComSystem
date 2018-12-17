
import React from 'react';
import { Container, Content, Button, Text, Fab, Body, Icon, alert, Header, Left, Right, Title, Form, Input, Item, Label } from 'native-base';
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
import Modal from "react-native-simple-modal";
import ColorPalette from 'react-native-color-palette';
import { Col, Row, Grid } from 'react-native-easy-grid';





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
		// this.setState({ isStaffFormVisible: true })
		console.log(this.state.isStaffFormVisible)
		this.props.navigation.navigate("PickColor")
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

		let view;

		if (this.props.screenProps.connected) {
			view = (
				<View>
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

			);
		}
		else {
			view = (
				<View style={styles.noConnectionView}>
					<Text style={styles.noConnectionText}>No Connection</Text>
				</View>
			)
		}

		return (
			<Container padder>
				{view}
				<Modal
					open={this.state.isStaffFormVisible}
					modalDidOpen={this.modalDidOpen}
					modalDidClose={() => this.setState({ isStaffFormVisible: false })}
					style={{ alignItems: "center" }}
				>
					<View  style={{ flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
						<View>
							<TextInput
								placeholder={"Staff Name"}
								onChangeText={(text) => this.handleEmployeeNameInputChange(text)}
								value={this.state.name}
							/>
						</View>

						<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginRight: 200, marginLeft: 200 }}>
							<ColorPalette
								colors={['#980000', '#980078', '#720098', '#2B0098', '#005898', '#009498', '#00985B', '#289800', '#988B00', '#985F00', '#983900', '#FF0000', '#FF7B00', '#FFC900', '#91FF00', '#000000', '#009DFF', '#F500FF', '#1A00FF', '#006A4E', '#000759']}
								title={"Controlled Color Palette:"}
								icon={
									<Icon name={'check-circle-o'} size={25} color={'black'} />
									// React-Native-Vector-Icons Example
								}
							/>
						</View>
					</View>
				</Modal>
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