import React, {useState, useEffect,} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import Header from './Header';
import {v4 as uuid} from 'uuid';
import AsyncStorage from '@react-native-community/async-storage';
import AddItem_Circle from './AddItem_Circle';
import ListLists from './ListLists';

export default function DisplayLists() {
  const [lists, setLists] = useState(
    []
  );

  const ListStorageName = 'ListStorage';

  useEffect(() => {
    console.log("hitting load list");
    window.setTimeout(() => {
    loadLists();
    }, 200);
  }, []);

  useEffect(() => {
    console.log(lists);
  });

  const loadLists = async () => {
    const result = await AsyncStorage.getItem(ListStorageName)
    .then(res => JSON.parse(res))
    .catch(error => console.log('error retreiving from local storage'));

    console.log('results from storage: ' + result);
    if (result != null)
      setLists(result);
    else
      setLists([]);
  };

  const deleteItem = (id) => {
    setLists(prevItems => prevItems.filter(item => item.id != id));
    console.log('items after delete: ' + lists.filter(item => item.id != id));
    // save to storage before re-render
    saveList(ListStorageName, lists.filter(item => item.id != id));
  }

  const addItem = (text) => {
    if (text) {
      // update state
      setLists(prevItems => [{id: uuid(), text}, ...prevItems]);
    }
    // show what it should be after state updates
    console.log("items after update: " + {id: uuid(), text}, ...lists);
    // kinda hacky, but save to storage before re-render
    saveList(ListStorageName, [{id: uuid(), text}, ...lists]);
  }

  const saveList = (listName, objects) => {
    AsyncStorage.setItem(listName, JSON.stringify(objects));
  }

  return (
    <View style={styles.container}>
        <Header />
        <FlatList
            data={lists} 
            renderItem={({item}) => <ListLists key={item.id} item={item} deleteItem={deleteItem} />}
        />
        <AddItem_Circle addItem = {addItem} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
