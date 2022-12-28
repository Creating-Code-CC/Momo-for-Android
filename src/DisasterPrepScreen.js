import React, { useState, useRef  } from 'react';
import { View, TextInput, Button, Text, StyleSheet, FlatList, TouchableOpacity, DrawerLayoutAndroid} from 'react-native';
import Tts from 'react-native-tts';
const DisasterPrepScreen = ({navigation}) => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [destination, setDestination] = useState('');
    const drawer = useRef(null);

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }
    });
  
    const fetchData = async () => {
      const response = await fetch(
        'https://api.openai.com/v1/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer Your API Key'
          },
          body: JSON.stringify({
            "prompt": `What are the 10 most essential items I need to be prepared for a ${destination}. give the items in numerical order`,
            "model": "text-davinci-002",
            "max_tokens": 100,
            "top_p": 1,
            "n": 1,
            "stop": ","
          })
        }
      );
      const json = await response.json();
      setItems(json.choices[0].text.split('\n'));
    };
  
    const addItem = () => {
      setItems([...items, newItem]);
      setNewItem('');
    };
  
    const deleteItem = index => {
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    };

    const navigationView = () => (
      <View style={[styles.container, styles.navigationContainer]}>
        <Text style={styles.paragraph}>Attent Event</Text>
        <Text style={styles.paragraph} onPress={() => navigation.navigate('Plan')}>Plan Event</Text>
        <Text style={styles.paragraph} onPress={() => navigation.navigate('DisasterPrep')}>Disaster Prep</Text>
        <Text style={styles.paragraph} onPress={() => navigation.navigate('Documents')}>Documents</Text>
        <Text style={styles.paragraph} onPress={() => navigation.navigate('Attire')}>Attire</Text>
        <Button title="Close drawer" onPress={() => drawer.current.closeDrawer()}/>
      </View>
    );
  
    return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={'left'}
      renderNavigationView={navigationView}
    >
    <Button style={{width: 100}}
      title="Menu"
      onPress={() => drawer.current.openDrawer()}
        />
      <View style={styles.container}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>Disaster Prep List Generator</Text>
        <TextInput
          value={destination}
          onChangeText={text => setDestination(text)}
          placeholder="ex: Hurricane"
        />
        <Button title="Generate List" onPress={fetchData} />
        <FlatList
          data={items}
          renderItem={({ item, index }) => (
            <View style={styles.container}>
              <Text>{item}</Text>
              <TouchableOpacity onPress={() => deleteItem(index)}>
                <Text>-</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item}
        />
        <Button title="Speak List" onPress={() => Tts.speak(items.join(', '))} />
        <TextInput
          value={newItem}
          onChangeText={text => setNewItem(text)}
          placeholder="Enter a new item"
        />
        <TouchableOpacity onPress={addItem}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </DrawerLayoutAndroid>
    );
  };
  
  export default DisasterPrepScreen;