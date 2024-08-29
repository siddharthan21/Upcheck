import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker } from 'react-native';
import MapView from 'react-native-maps';

export default function CreateFarmScreen({ navigation }) {
  const [farmName, setFarmName] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');
  const [farmingType, setFarmingType] = useState('');

  const handleCreateFarm = () => {
    // Handle the create farm logic here
    fetch('http://localhost:3000/createFarm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ farmName, state, district, ward, address, area, farmingType }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          navigation.navigate('Home'); // Navigate to the home page after creation
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Farm</Text>
      <TextInput
        placeholder="Farm Name"
        value={farmName}
        onChangeText={setFarmName}
        style={styles.input}
      />
      <Picker
        selectedValue={state}
        onValueChange={(itemValue, itemIndex) => setState(itemValue)}
        style={styles.input}
      >
        {/* Add your state options here */}
        <Picker.Item label="Select State" value="" />
        <Picker.Item label="State 1" value="state1" />
        <Picker.Item label="State 2" value="state2" />
      </Picker>
      <Picker
        selectedValue={district}
        onValueChange={(itemValue, itemIndex) => setDistrict(itemValue)}
        style={styles.input}
      >
        {/* Add your district options here */}
        <Picker.Item label="Select District" value="" />
        <Picker.Item label="District 1" value="district1" />
        <Picker.Item label="District 2" value="district2" />
      </Picker>
      <Picker
        selectedValue={ward}
        onValueChange={(itemValue, itemIndex) => setWard(itemValue)}
        style={styles.input}
      >
        {/* Add your ward options here */}
        <Picker.Item label="Select Ward" value="" />
        <Picker.Item label="Ward 1" value="ward1" />
        <Picker.Item label="Ward 2" value="ward2" />
      </Picker>
      <TextInput
        placeholder="House Number and Street"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      <TextInput
        placeholder="Area (ha)"
        value={area}
        onChangeText={setArea}
        style={styles.input}
      />
      <Picker
        selectedValue={farmingType}
        onValueChange={(itemValue, itemIndex) => setFarmingType(itemValue)}
        style={styles.input}
      >
        {/* Add your farming type options here */}
        <Picker.Item label="Select Farming Type" value="" />
        <Picker.Item label="Type 1" value="type1" />
        <Picker.Item label="Type 2" value="type2" />
      </Picker>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateFarm}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E0F7FA',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#00796B',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  map: {
    width: '100%',
    height: 200,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#00796B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
