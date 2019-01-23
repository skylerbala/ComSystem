import { Dimensions, StyleSheet } from 'react-native';
import { scale } from '../../../library/utils/ScalingAPI';

export default styles = StyleSheet.create({
  mainView: {
    flex: 1,
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
  modalCard: {
    borderRadius: 5
  },
  expressionCategoryText: {
    fontWeight: '600',
    fontSize: scale(12.5),
    color: '#43484D'
  },
  expressionsView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5
  },
});