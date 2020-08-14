///// why is this so difficult....


import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  findNodeHandle,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const AddItem_Circle = ({addItem}) => {
    const [text, setText] = useState('');

    // why do i have all of these
    const [showInput, setShowInput] = useState(false);
    const [textValid, setTextValid] = useState(true);
    const [showButton, setShowButton] = useState(true);

    const input = useRef(null);

    const onChange = (textValue) => {
        setText(textValue);
        setTextValid(true);
    }

    const submitEditing = (text) => {
        if (text) {
            addItem(text);
            setText('');
            // destroy that key boi
            Keyboard.dismiss();
            
        }
        else
            // tell them if they f*cked up
            setTextValid(false);
    }


    // this is so dumb
    const hideInput = () => {
        setShowInput(false);
        setShowButton(true);
    }

    const revealInput = () => {
        setShowInput(true);
        setShowButton(false);
    }
    // this is so dumb
    
    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {hideInput(), console.log("keyboard hidden")}
        );

        // Clean up listener
        return () => {
            Keyboard.removeListener(
                'keyboardDidHide',
                () => {hideInput()}
            );
        };

    }, []);

    return (
        <View style={styles.header}>
            {showInput ? (
            <TextInput 
                ref={input}
                value={text} placeholder="Add Item..." style={[styles.input, !textValid ? {borderColor: 'red'}: null]} 
                onChangeText={onChange} autoFocus={true} blurOnSubmit={false} onSubmitEditing={() => submitEditing(text)}
            />
            ): null}
            
            {showButton ? ( 
            <TouchableOpacity style={styles.btn} onPress={() => revealInput()}>
                <Text style={styles.btnText}><FontAwesome5 size={30} name={'plus'} /></Text>
            </TouchableOpacity>
            ): null}
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 60,
        padding: 8,
        fontSize: 24,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'blue',
    },
    btn: {
        position: 'absolute',
        bottom: 40,
        right: 40,
        backgroundColor: '#c2bad8',
        borderRadius: 400,
        padding: 8,
        width: 80,
        height: 80,
        justifyContent: 'center',
    },
    btnText: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});

export default AddItem_Circle;