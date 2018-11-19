import React, { Component } from 'react';
import { Container, Text } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { TouchableOpacity } from 'react-native';
import styles from '../styles/SwipeListViewStyle';


class SendMessageTab extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		const employeeName = navigation.getParam('employeeName')
		return {
			title: employeeName,
		}
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.navigation.setParams({ handleToggle: () => this.toggleMessageFormVisibility() });
	}

	handleSendMessage(employeeName, statement) {
		let data = {
			employeeName: employeeName,
			statement: statement
		}
		this.props.screenProps.handleSendMessage(data);
	}

	render() {
		return (
			<Container padder>
				<SwipeListView
					useFlatList
					closeOnRowBeginSwipe
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
								this.props.navigation.pop();
								this.handleSendMessage(this.props.navigation.getParam('employeeName'), rowData.item.statement);
							}}>
							<Text style={styles.text}>{rowData.item.statement}</Text>
						</TouchableOpacity>
					)}
				/>
			</Container >
		);
	}
}

export default SendMessageTab;