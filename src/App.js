import React, { useState,useRef } from 'react';
import { Button, View, Text, StyleSheet, Image, TouchableOpacity, DrawerLayoutAndroid } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AttendEvent from './AttendEventScreen';
import PlanEvent from './PlanEventScreen';
import Documents from './DocumentsScreen';
import DisasterPrep from './DisasterPrepScreen';
import Attire from './AttireScreen';
const App = () => {
  const Stack = createNativeStackNavigator();
return(
  <NavigationContainer>
    <Stack.Navigator initialRouteName='Attend'>
      <Stack.Screen name='Attend' component={AttendEvent}/>
      <Stack.Screen name='Plan' component={PlanEvent}/>
      <Stack.Screen name='DisasterPrep' component={DisasterPrep}/>
      <Stack.Screen name='Documents' component={Documents}/>
      <Stack.Screen name='Attire' component={Attire}/>
    </Stack.Navigator>
  </NavigationContainer>
  
)
};

export default App;

