import React from 'react';
import { StyleSheet,
   Text,
    View,
    Keyboard,
    AsyncStorage,
    Alert,
    TouchableWithoutFeedback,
    ScrollView
      } from 'react-native';

import { Form, Input, Item ,Label, Button } from "native-base"




export default class AddNewContactScreen extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      fname: "",
      lname: "",
      phone:"",
      email:"",
      address:"",

    }
  }


  static navigationOptions = {
    title: "Contact App"
    }

saveContact = async() =>{
  if (
    this.state.fname !=="" &&
    this.state.lname !=="" &&
    this.state.email !=="" &&
    this.state.phone !=="" &&
    this.state.address !==""

  ) {
      // contact object
      var contact = {

        fname:this.state.fname ,
        lname:this.state.lname ,
        phone:this.state.email ,
        email:this.state.phone ,
        address:this.state.address 
    

      }

      await AsyncStorage.setItem( Date.now().toString(),
      JSON.stringify(contact),

      )
      .then( () =>{
        this.props.navigation.goBack();

      })
      .catch(error =>{console.error()
      })

    
  }else {
    Alert.alert("Sab fields bharo... Dimaag kharab hai aapka...")
  }
}

  render(){
  return (
    
    <TouchableWithoutFeedback
    onPress = {
      ()=>{ Keyboard.dismiss
    } }
    >
    <ScrollView style = {styles.container} >

    
    <Form>

      <Item style = {styles.inputItem} >
          <Label> First Name</Label>
          <Input
          autoCorrect= {false} 
          autoCapitalize= "none" // Documentation not false , use none in ""
          keyboardType = "default"
          // onChangeText = { fname => this.setState({ fname: fname})} This line works exactly same as below line 
          onChangeText = { fname => this.setState({ fname})}

          />

      </Item>

      <Item style = {styles.inputItem} >
          <Label> Last Name</Label>
          <Input
          autoCorrect= {false} 
          autoCapitalize= "none" // Documentation not false , use none in ""
          keyboardType = "default"
          // onChangeText = { fname => this.setState({ fname: fname})} This line works exactly same as below line 
          onChangeText = { lname => this.setState({ lname})}

          />

      </Item>

      <Item style = {styles.inputItem} >
          <Label> Mobile No. </Label>
          <Input
          autoCorrect= {false} 
          autoCapitalize= "none" // Documentation not false , use none in ""
          keyboardType = "decimal-pad"
          // onChangeText = { fname => this.setState({ fname: fname})} This line works exactly same as below line 
          onChangeText = { phone => this.setState({ phone })}

          />

      </Item>

      <Item style = {styles.inputItem} >
          <Label>Mail Id</Label>
          <Input
          autoCorrect= {false} 
          autoCapitalize= "none" // Documentation not false , use none in ""
          keyboardType = "default"
          // onChangeText = { fname => this.setState({ fname: fname})} This line works exactly same as below line 
          onChangeText = { email => this.setState({ email })}

          />

      </Item>

      <Item style = {styles.inputItem} >
          <Label>Address</Label>
          <Input
          autoCorrect= {false} 
          autoCapitalize= "none" // Documentation not false , use none in ""
          keyboardType = "default"
          // onChangeText = { fname => this.setState({ fname: fname})} This line works exactly same as below line 
          onChangeText = { address => this.setState({ address })}

          />

      </Item>

      

    </Form>
    <Button 
      style={styles.button}
      full
      onPress = { () => {
        this.saveContact();
        this.forceUpdate()
        
      }}
    >
      <Text style = {styles.buttonText}> Save Contact </Text>
 

    </Button>
     
    <View style = {styles.empty}
    // We need to add an empty view with style of height 600 just for scroll to work.. and see address bar filling :) 
    ></View>
   
    </ScrollView>
    </TouchableWithoutFeedback>
    
  );
}
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    height: 500
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "#B83227",
    marginTop: 40
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  empty: {
    height: 600,
    backgroundColor: "#FFF"
  }
});




