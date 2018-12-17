import React, { Component } from 'react';
import { Container, Text } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { TouchableOpacity } from 'react-native';
import styles from '../styles/SwipeListViewStyle';


class SendMessageTab extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		const name = navigation.getParam('name')
		return {
			title: name,
		}
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.navigation.setParams({ handleToggle: () => this.toggleMessageFormVisibility() });
	}

	handleSendMessage(name, statement, color) {
		let data = {
			name: name,
			statement: statement,
			color: color
		}
		this.props.screenProps.handleSendMessage(data);
	}

	render() {
		return (
			<Container padder>
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
								// this.props.navigation.pop();
								// this.handleSendMessage(this.props.navigation.getParam('name'), rowData.item.statement, this.props.navigation.getParam('color'));
							}}>
							<Text style={styles.text}>
								{rowData.item.statement}
							</Text>
						</TouchableOpacity>
					)}
				/>
				
			</Container >
		);
	}
}

export default SendMessageTab;