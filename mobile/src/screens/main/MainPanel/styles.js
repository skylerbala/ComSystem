
import { Dimensions, StyleSheet } from 'react-native';
import { scale } from '../../../library/utils/ScalingAPI';

export default styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#d0e1f9',
    padding: 10
  },
  messagesView: {
    flex: 3,
    backgroundColor: '#4d648d',
    borderRadius: 5,
    marginBottom: 10
  },
  messagesScrollView: {
    flex: 1,
    flexDirection: 'column',
    padding: 10
  },
  messageRowFront: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: scale(30),
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  messageRowFrontContent: {
    flex: 9,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  messageRowFrontContentText: {
    fontSize: scale(25), // change?
    color: 'white',
  },
  messageRowFrontTimer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  messageRowFrontTimerText: {
    fontSize: scale(10),
    color: 'white'
  },
  messageRowBack: {
    flex: 1,
    marginBottom: 10
  },
  messageRowBackDeleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cc2a36',
    width: 200,
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    borderRadius: 5
  },
  messageRowBackDeleteButtonText: {
    color: "white",
    fontSize: scale(25),
  },
  employeeButtonsView: {
    flex: 1,
    backgroundColor: '#4d648d',
    borderRadius: 5
  },
  employeeButtonsScrollView: {
    padding: 5, // mnn
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  listContainer: {
    alignItems: 'center'
  },
  employeeButtons: {
    justifyContent: 'center',
    height: Dimensions.get('window').height / 24,
    width: Dimensions.get('window').width / 4.5,
    margin: 5,
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5
  },
  employeeButtonsText: {
    fontSize: scale(10),
    color: 'white',
    alignSelf: 'center'
  },
  modalCard: {
    borderRadius: 5
  },
  expressionsView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5
  },
  expressionButton: {
    justifyContent: 'center',
    height: Dimensions.get('window').height / 24,
    width: Dimensions.get('window').width / 4,
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    margin: 5
  },
  expressionsText: {
    fontSize: scale(10),
    color: 'white',
    alignSelf: 'center'
  },
});