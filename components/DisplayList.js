import React, {useState, useEffect,} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
} from 'react-native';

import Header from './Header';
import ListItem from './ListItem';
import AddItem from './AddItem';
import {v4 as uuid} from 'uuid';
import AsyncStorage from '@react-native-community/async-storage';

const DisplayList = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log('hitting load list');
    window.setTimeout(() => {
      loadList();
    }, 200);
  }, []);

  useEffect(() => {
    console.log(items);
  });

  const loadList = async () => {
    const result = await AsyncStorage.getItem(props.listName)
      .then((res) => JSON.parse(res))
      .catch((error) => console.log('error retreiving from local storage'));

    console.log('results from storage: ' + result);
    if (result != null) setItems(result);
    else setItems([]);
  };

  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id != id));
    console.log('items after delete: ' + items.filter((item) => item.id != id));
    // save to storage before re-render
    saveList(
      props.listName,
      items.filter((item) => item.id != id),
    );
  };

  const addItem = (text) => {
    if (!text) {
      Alert.alert('Error', 'Please enter an item', [{text: 'Ok'}], {
        cancelable: true,
      });
    } else {
      // update state
      setItems((prevItems) => [{id: uuid(), text}, ...prevItems]);
    }
    // show what it should be after state updates
    console.log('items after update: ' + {id: uuid(), text}, ...items);
    // kinda hacky, but save to storage before re-render
    saveList(props.listName, [{id: uuid(), text}, ...items]);
  };

  const saveList = (listName, objects) => {
    AsyncStorage.setItem(listName, JSON.stringify(objects));
  };

  return (
    <View style={styles.container}>
      <Header />
      <AddItem addItem={addItem} />
      <FlatList
        data={items}
        renderItem={({item}) => (
          <ListItem key={item.id} item={item} deleteItem={deleteItem} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DisplayList;
