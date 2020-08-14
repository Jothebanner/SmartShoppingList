import React, {useState, useEffect,} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Router, Scene } from 'react-native-router-flux';

import DisplayLists from './components/DisplayLists';
import DisplayList from './components/DisplayList';
import ScarletScreen from './components/ScarletScreen';
import GreyScreen from './components/GreyScreen';

export default function App() {
 
  return (
    <Router>
      <Scene key ='root'>
        <Scene key='scarlet' component={ScarletScreen} title='Scarlet' />
        <Scene key='grey' component={GreyScreen} title='Grey' />
        <Scene key='displayLists' component={DisplayLists} title='Display Lists' initial />
        <Scene key='displayList' component={DisplayList} title='Display List' />
      </Scene>
    </Router>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
