import { Dimensions, StyleSheet } from 'react-native';
import { scale } from '../../../library/utils/ScalingAPI';

export default styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#d0e1f9',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5
  },
  mainSubView: {
    flex: 1,
    borderRadius: 5,
    flexDirection: 'row',
  },
  listView: {
    backgroundColor: '#4d648d',
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5
  },
  expressionListTitleText: {
    color: 'white',
    fontWeight: '600',
    marginBottom: scale(5)
  },
  expressionRowFront: {
    flex: 1,
    borderBottomColor: '#4d648d',
    borderBottomWidth: 1,
    paddingLeft: 15,
    justifyContent: 'center',
    minHeight: scale(40),
    borderRadius: 5
  },
  expressionRowFrontText: {
    fontSize: scale(35),
    color: "white"
  },
  expressionRowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    borderRadius: 5

  },
  expressionRowBackButton: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 125,
    borderRadius: 5
  },
  expressionRowBackButtonLeft: {
    backgroundColor: '#eb6841',
    right: 125
  },
  expressionRowBackButtonRight: {
    backgroundColor: '#cc2a36',
    right: 0
  },
  expressionRowBackText: {
		color: '#FFF',
		fontSize: scale(15),
	},
  modalCard: {
    borderRadius: 5
  }
});