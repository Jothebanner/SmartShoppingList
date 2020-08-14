import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ListLists = ({item, deleteItem}) => {
  return (
    <TouchableOpacity style={styles.listItem} >
      <View style={styles.listItemView}>
      <Text style={styles.listItemText} onPress={() => Actions.displayList({listName: item.text})}>{item.text}</Text>
        <FontAwesome5 name={'times'} size={20} color="firebrick" 
        onPress={() => deleteItem(item.id)} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#e8e8e8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
  },
  listItemText: {
      fontSize: 18,
  }
});

export default ListLists;