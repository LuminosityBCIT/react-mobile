import React, { Component } from 'react';

import { StyleSheet, Text, View, Image, TouchableHighlight, Button, TouchableOpacity, TextInput, WebView, ScrollView, NativeModules, LayoutAnimation, Picker, Dimensions } from 'react-native';

//import CheckBox from 'react-native-checkbox';



export default class Confirmation extends React.Component {
      
 constructor(props) {
  super();
     
    this.state = {
        searchInput:""
    }
}
    

cancelFunction = () =>{
      this.props.selectPopUp(1);
      this.props.cloudState(true);
  }

      
render() {
    
   
    
 
    
    return (
        
        
<View
 style={styles.containerConfirm}>
    
        
   <View
    style={styles.containerConfirmDiv}>
        
                <Text style={styles.confirmText}>
                 Are you sure you want to delete this bookmark?</Text>
                <Text style={styles.confirmLink}> </Text>

            <View
              style={styles.containerConfirmButs}>       
        
        
         <TouchableHighlight
                     style={styles.containerConfirmBut1}
                     onPress ={this.cancelFunction}>
                         <Text style={styles.containerConfirmButText}>
                         Cancel</Text>
             </TouchableHighlight> 
        
        
                    <TouchableHighlight
                     style={styles.containerConfirmBut2}
                     >
                         <Text style={styles.containerConfirmButText}>
                         Yes</Text>
             </TouchableHighlight> 

                     
              </View>   
   </View>
            
                          
</View>
    );
  }
};

const styles = StyleSheet.create({

containerConfirm: {
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


    
containerConfirmDiv: {  
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
    
confirmText: {
        fontSize: 20,
        width:'80%',
      
        fontWeight: 'bold',
        marginTop:25,
        marginBottom:10,
},
    
confirmLink: {
        fontSize: 20,
        color: 'red',
        width:'80%',
        
      
       color: 'red',
        marginTop:15,
        marginBottom:10,
},  
    
containerConfirmButs: {
        marginTop:35,
        width: "90%",
        height: "15%",
},   
    
containerConfirmBut1: {
      
         position: "relative",
        top:0,
        left:"10%",
        backgroundColor:"#FF6633",
        width: "30%",
        height: "100%",
        borderRadius: 10,
},
    
containerConfirmBut2: {
      
       
        position: "relative",
        top:"-100%",
        left:"60%",
        backgroundColor:"#3399FF",
        width: "30%",
        height: "100%",
        borderRadius: 10,
},     
    
 
 
    
containerConfirmButText:{
        fontSize: 20,
        fontWeight: 'bold',
        color:"white",
        alignSelf:"center",
        marginTop: 9, 
},
   
  
    
    
});

