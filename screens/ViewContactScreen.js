import React from 'react';
import { StyleSheet, Text, View,ScrollView, TouchableOpacity, Linking, Platform, Alert, AsyncStorage, } from 'react-native';
import { Card, CardItem} from "native-base"
import {Entypo} from "@expo/vector-icons"

export default class ViewContactScreen extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      fname: "Patel",
      lname:"Patel",
      phone: "Patel",
      email: "Patel",
      address: "Patel", 
      key: "Patel",

    }
  }
  static navigationOptions = {
    title: "View Contact"
}

  componentDidMount(){
    const { navigation } = this.props;
  navigation.addListener("WillFocus", ()=> {
    var key = this.props.navigation.getParam("key","")
    
  })
  
}

getContact =  async key => {  
  await AsyncStorage.getItem(key)
  .then(contactjsonstring => {
    var contact = JSON.parse(contactjsonstring)
    contact[key] = key
    this.setState(contact)
  })
  .catch(error =>{
    console.log(error)
  })
}

render(){
  return (
    <View style={styles.container}>
      <Text>view</Text>
    </View>
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
