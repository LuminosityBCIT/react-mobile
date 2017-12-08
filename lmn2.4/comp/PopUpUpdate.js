import React, { Component } from 'react';

import { StyleSheet, Text, View, Image, TouchableHighlight, Button, TouchableOpacity, TextInput, WebView, ScrollView, NativeModules, LayoutAnimation, Picker, Dimensions } from 'react-native';

//import CheckBox from 'react-native-checkbox';



export default class PopUpUpdate extends React.Component {
      
 constructor(props) {
  super();
     
    this.state = {
      
    }
}
    

cancelFunction = () =>{
      this.props.selectPopUp(1);
      this.props.cloudState(true);
  }

      
render() {
    
   
    
 
    
    return (
        
        
<View
 style={styles.containerUpdate}>
    
        
   <View
    style={styles.containerUpdateDiv}>
        
                <Text style={styles.UpdateText}>
                  Your bookmark has been successfully updated.</Text>
              

            <View
              style={styles.containerUpdateButs}>       
        
        
             <TouchableHighlight
                     style={styles.containerUpdateBut1}
                     onPress ={this.cancelFunction}>
                         <Text style={styles.containerUpdateButText}>
                         OK</Text>
             </TouchableHighlight> 
        
        
                 

                     
              </View>   
   </View>
            
                          
</View>
    );
  }
};

const styles = StyleSheet.create({

containerUpdate: {
        position:"absolute",
        top:0,
        left:0,
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
},


    
containerUpdateDiv: {  
        position: "absolute",
        width: "90%",
        height: 300,
        top:"5%",
        backgroundColor:"white",
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "rgba(255, 255, 255, 0.3)",
},
    
UpdateText: {
        fontSize: 20,
        width:'80%',
      
        fontWeight: 'bold',
        marginTop:65,
        marginBottom:20,
},
    

    
containerUpdateButs: {
        marginTop:35,
        width: "90%",
        height: "15%",
     alignItems: 'center',
       
},   
    
containerUpdateBut1: {
      
         position: "relative",
        top:0,
      
        backgroundColor:"#3399FF",
        width: "30%",
        height: "100%",
        borderRadius: 10,
},
   
 
    
containerUpdateButText:{
        fontSize: 20,
        fontWeight: 'bold',
        color:"white",
        alignSelf:"center",
        marginTop: 9, 
},
   
  
    
    
});

