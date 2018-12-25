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
	employeeRowFront: {
		backgroundColor: '#1e1f26',
		borderBottomColor: '#4d648d',
		borderBottomWidth: 1,
		paddingLeft: 10,
		paddingRight: 10,
		minHeight: scale(30),
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 5
	},
	employeeRowFrontText: {
    fontSize: scale(35),
		color: 'white',
		flex: 1,
	},
	employeeRowFrontColorBox: {
		height: scale(35),
		width: scale(35),
		borderRadius: 5
	},
	employeeRowBack: {
		flex: 1,
	},
	employeeRowBackButton: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 125,
		borderRadius: 5,
	},
	employeeRowBackButtonLeft: {
		backgroundColor: '#eb6841',
		right: 125
	},
	employeeRowBackButtonRight: {
		backgroundColor: '#cc2a36',
		right: 0
	},
	employeeRowBackText: {
		color: '#FFF',
		fontSize: scale(15),
	},
	modalCard: {
		borderRadius: 5
	},
});