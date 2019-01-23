import { Dimensions, StyleSheet } from 'react-native';
import { scale } from '../../../library/utils/ScalingAPI';

export default styles = StyleSheet.create({
	mainView: {
		backgroundColor: '#DAF5FE',
		flex: 1,
		padding: 10
	},
	mainSubView: {
		backgroundColor: '#2BA7D0',
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