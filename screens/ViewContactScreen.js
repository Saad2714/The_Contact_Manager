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
    // will != Will

  navigation.addListener("willFocus", ()=> {
    // Param !=Params
    var key = this.props.navigation.getParam("key","")
    // Below linewill import everything..
    this.getContact(key)
    
  })
  
}

  getContact =  async key => {  
    await AsyncStorage.getItem(key)
    .then(contactjsonstring => {
      var contact = JSON.parse(contactjsonstring)
      contact["key"] = key
      this.setState(contact)
    })
    .catch(error =>{
      console.log(error)
    })
  }


  
  callAction = phone =>{
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telpromt: ${phone}`
    } else {
      phoneNumber = `tel:${phone}`
    }

    Linking.canOpenURL(phoneNumber)
    .then( supported => {
      if (!supported) {
        Alert.alert("Phone number is not available")
      } else {
        return Linking.openURL(phoneNumber)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  smsAction = phone =>{
    let phoneNumber = phone;
    phoneNumber= `sms:${phone}`


    Linking.canOpenURL(phoneNumber)
    .then( supported => {
      if (!supported) {
        Alert.alert("Phone number is not available")
      } else {
        return Linking.openURL(phoneNumber)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  editContact = (key) => {
    this.props.navigation.navigate("Edit", {key:key})
  }

render(){
  return (
    <ScrollView style={styles.container}>

      <View style={styles.contactIconContainer}>
        <Text style={styles.contactIcon }>
          {this.state.fname[0].toUpperCase()}
        </Text>
        <View style={styles.nameContainer}>
        <Text style={styles.name}>
          {this.state.fname} {this.state.lname}
        </Text>
      </View>
    </View>

      

    <View style={styles.infoContainer}>
      
      <Card>
        <CardItem bordered> 
          <Text style={styles.infoText}>Phone</Text>
        </CardItem>
        <CardItem>
          <Text style={styles.infoText}>{this.state.phone}</Text>
        </CardItem>
      </Card>

      <Card>
        <CardItem bordered> 
          <Text style={styles.infoText}>Email</Text>
        </CardItem>
        <CardItem>
          <Text style={styles.infoText}>{this.state.email}</Text>
        </CardItem>
      </Card>

      <Card>
        <CardItem bordered> 
          <Text style={styles.infoText}>Address</Text>
        </CardItem>
        <CardItem>
          <Text style={styles.infoText}>{this.state.address}</Text>
        </CardItem>
      </Card>

    </View>

    <Card style={styles.actionContainer}>
      <CardItem style={styles.actionButton} bordered >
        <TouchableOpacity onPress ={ () => {
          this.smsAction(this.state.phone)
        }}>
          <Entypo
            name= "message"
            size ={ 30 }
            color = "#B83227"/>
        <Text style= {styles.actionText}> Message</Text>

        </TouchableOpacity>

      </CardItem>

      <CardItem style={styles.actionButton} bordered >
        <TouchableOpacity onPress ={ () => {
          this.callAction(this.state.phone)
        }}>
          <Entypo
            name= "phone"
            size ={ 30 }
            color = "#B83227"/>
            <Text style= {styles.actionText}> Call</Text>

        </TouchableOpacity>

      </CardItem>
    </Card>


    <Card style={styles.actionContainer}>
      <CardItem style={styles.actionButton} bordered >
        <TouchableOpacity onPress ={ () => {
          this.editContact(this.state.key)

        }}>
          <Entypo
            name= "edit"
            size ={ 30 }
            color = "#B83227"/>
            <Text style= {styles.actionText}> Edit</Text>
        </TouchableOpacity>

      </CardItem>

      <CardItem style={styles.actionButton} bordered >
        <TouchableOpacity onPress ={ () => {
          this.deleteContact(this.state.key)

        }}>
          <Entypo
            name= "trash"
            size ={ 30 }
            color = "#B83227"/>
            <Text style= {styles.actionText}> Delete</Text>

        </TouchableOpacity>

      </CardItem>
    </Card>

    </ScrollView>
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contactIconContainer: {
    height: 200,
    backgroundColor: "#B83227",
    alignItems: "center",
    justifyContent: "center"
  },
  contactIcon: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#fff"
  },
  nameContainer: {
    width: "100%",
    height: 70,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0
  },
  name: {
    fontSize: 24,
    color: "#000",
    fontWeight: "900"
  },
  infoText: {
    fontSize: 18,
    fontWeight: "300"
  },
  actionContainer: {
    flexDirection: "row"
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  actionText: {
    color: "#B83227",
    fontWeight: "900"
  },
  infoContainer: {
    flexDirection: "column"
  },
});