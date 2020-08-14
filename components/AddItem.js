import React, {useState,} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const AddItem = ({addItem}) => {
    const [text, setText] = useState('');

    const onChange = (textValue) => setText(textValue);

    const addItemAndClearText = (text) => {
        addItem(text);
        setText('');
    }
    
    return (
        <View style={styles.header}>
        <TextInput 
            value={text} placeholder="Add Item..." style={styles.input} 
            onChangeText={onChange} onSubmitEditing={() => addItemAndClearText(text)}
        />
        <TouchableOpacity style={styles.btn} onPress={() => addItemAndClearText(text)}>
            <Text style={styles.btnText}>Add Item<FontAwesome5 name={'plus'} /></Text>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 60,
        padding: 8,
        fontSize: 16,
    },
    btn: {
        backgroundColor: '#c2bad8',
        padding: 9,
        margin: 5,
    },
    btnText: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center',
    },
});

export default AddItem;