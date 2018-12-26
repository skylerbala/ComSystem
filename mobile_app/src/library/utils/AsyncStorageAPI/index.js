import { AsyncStorage } from 'react-native';

class AsyncStorageAPI {
  async storeItem(key, item) {
    try {
      const storedItem = await AsyncStorage.setItem(key, item);
      return storedItem;
    } catch (err) {
      // console.log(err.message);
    }
    return;
  }

  async retrieveItem(key) {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      return retrievedItem;
    } catch (err) {
      // console.log(err.message);
    }
    return 'none';
  }
}

export default AsyncStorageAPI;