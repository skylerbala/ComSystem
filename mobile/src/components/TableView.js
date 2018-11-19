
import React, { Component } from 'react';
import { Text } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { View, TouchableOpacity, StyleSheet } from 'react-native';


const TableView = (props) => {
  return (
    <SwipeListView
      useFlatList
      closeOnRowBeginSwipe
      disableRightSwipe
      rightOpenValue={-200}
      swipeToOpenPercent={50}
      data={props.data}
      keyExtractor={(rowData, index) => {
        return rowData.id.toString();
      }}
      renderItem={(rowData, rowMap) => props.rowFront}
      renderHiddenItem={(rowData, rowMap) => (
        <TouchableOpacity
          style={[styles.deleteButton]}
          onPress={_ => {
            rowMap[rowData.item.id].closeRow()
            props.onDelete()
          }}>
          <View>
            <Text style={[styles.text, styles.deleteText]}>Delete</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
  },
  deleteText: {
    color: "white"
  },
  rowFront: {
    backgroundColor: 'white',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    borderRightColor: '#CCC',
    paddingLeft: 15,
    borderRightWidth: 1,
    justifyContent: 'center',
    height: 100,
  },
  deleteButton: {
    backgroundColor: 'red',
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0
  },
});

export default TableView;