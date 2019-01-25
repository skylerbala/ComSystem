import { StyleSheet } from 'react-native';
import { scale } from '../../../library/utils/ScalingAPI';

export default styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#DAF5FE',
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
    backgroundColor: '#2BA7D0',
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
  modalCard: {
    borderRadius: 5
  }
});