import React, { useState, useRef  } from 'react';
import { View, TextInput, Button, Text, StyleSheet, FlatList, TouchableOpacity, DrawerLayoutAndroid} from 'react-native';


const DocumentsScreen = ({navigation}) => {
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
            "prompt": `Give me 5 documents that I may need to bring for the following: ${destination}. give the 5 documents in numerical order`,
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
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>Documents List Generator</Text>
        <TextInput
          value={destination}
          onChangeText={text => setDestination(text)}
          placeholder="Enter a place"
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
        <TextInput
          value={newItem}
          onChangeText={text => setNewItem(text)}
          placeholder="Enter a new document"
        />
        <TouchableOpacity onPress={addItem}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      </DrawerLayoutAndroid>
    );
  };
  
  export default DocumentsScreen;