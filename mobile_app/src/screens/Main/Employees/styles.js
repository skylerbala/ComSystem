import { Dimensions, StyleSheet } from 'react-native';
import { scale } from '../../../library/utils/ScalingAPI';

export default styles = StyleSheet.create({
	mainView: {
		backgroundColor: '#d0e1f9',
		flex: 1,
		padding: 10
	},
	mainSubView: {
		backgroundColor: '#4d648d',
		flex: 1,
		flexDirection: 'column',
		borderRadius: 5,
		padding: 10
	},
	employeesView: {
		flex: 10,
	},
	modalCard: {
		borderRadius: 5
	},
});