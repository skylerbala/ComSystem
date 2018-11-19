
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
  },
  deleteText: {
    color: "white"
  },
  noConnectionText: {
    textAlign: 'center',
    fontSize: 40,
    justifyContent: 'center'
  },
  rowFront: {
    backgroundColor: 'white',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    borderRightColor: '#CCC',
    paddingLeft: 15,
    borderRightWidth: 1,
    justifyContent: 'center',
    height: 75,
  },
  deleteButton: {
    backgroundColor: '#da635d',
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0
  },
  noConnectionView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

export default styles