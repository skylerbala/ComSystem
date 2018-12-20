import React, { Component } from 'react';
import { Container, Text, Button, Content, Icon } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { TouchableOpacity } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from '../styles/SwipeListViewStyle';


class SendMessageTab extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		return {
			title: 'Send Message',
			headerRight: (
				<Button transparent onPress={() => params.handleSendMessage()}>
					<Icon type="FontAwesome" name="plus" />
				</Button>
			)
		}
	};
	// static navigationOptions = ({ navigation }) => {
	// 	const { params = {} } = navigation.state;
	// 	const name = navigation.getParam('name')
	// 	return {
	// 		title: name,
	// 	}
	// };

	// state = {
	// 	message: []
	// }
	// constructor(props) {
	// 	super(props);
	// 	this.state.message = [this.props.navigation.getParam('name')];
	// }
	state = {
		message: []
	}
	constructor(props) {
		super(props);
		this.state.message = [];
	}

	componentDidMount() {
		this.props.navigation.setParams({ handleSendMessage: () => this.handleSendMessage() });
		this.state.statements = this.props.screenProps.statements.map(statement => {
			statement.selected = false;
		});
	}

	handleSendMessage() {
		this.props.navigation.pop();
		let data = {
			name: this.props.navigation.getParam('name'),
			statement: this.state.message.join(' '),
			color: this.props.navigation.getParam('color')
		}

		this.props.screenProps.handleSendMessage(data);

	}


	render() {
		return (
			<Container padder>
				<Grid style={styles.gridContainer}>
					<Row size={7} style={styles.rowContainer}>
						<Content padder contentContainerStyle={{ flexGrow: 1 }}>
							<SwipeListView
								useFlatList
								disableRightSwipe
								rightOpenValue={-200}
								swipeToOpenPercent={50}
								data={this.props.screenProps.statements}
								keyExtractor={(rowData, index) => {
									return rowData.id.toString();
								}}
								renderItem={(rowData, rowMap) => (
									<TouchableOpacity
										style={styles.rowFront}
										onPress={_ => {
											rowData.item.selected = !rowData.item.selected;
											if (rowData.item.selected) {
												this.state.message.push(rowData.item.statement);
											}
											else {
												this.state.message = this.state.message.filter((message) => {
													return message != rowData.item.statement;
												});
											}
										}}>
										<Text style={styles.text}>
											{rowData.item.statement}
										</Text>
									</TouchableOpacity>
								)}
							/>
						</Content>
					</Row>
					<Row size={1} style={styles.rowContainer}>
						<Content padder contentContainerStyle={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: this.props.navigation.getParam('color') }}>
								<Text style={styles.text}>
									Message:{"\n"}
									{this.props.navigation.getParam('name')} {this.state.message.join(' ')}
							</Text>
						</Content>
					</Row>
				</Grid >
			</Container>
		);
	}
}

export default SendMessageTab;