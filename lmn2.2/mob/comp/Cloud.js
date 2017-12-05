import React, { Component } from 'react';

import { StyleSheet, Text, View, Image, TouchableHighlight, Button, TouchableOpacity, TextInput, WebView, ScrollView, NativeModules, LayoutAnimation, Picker} from 'react-native';


const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

import styles from './css/cloudStyle';
 
  export default class Cloud extends React.Component {
   
      constructor(props){

        super(props);

        this.state = {
                t11: 10,
                l11: 150,
                t22: -20,
                l22: 75,
                t33: -15,
                l33: 20,
                t44: 5,
                l44: -5,
                w: 57,
                h: 57,
                cloudbuts:true,
                browserWindow:false
                    };

       
      }
 
    cloudOnPress = () =>{
    
    if(this.state.cloudbuts == true) { 
    this.state.cloudbuts = false;    
    LayoutAnimation.spring();
    this.setState({t11: this.state.t11 = 180, l11: this.state.l11 = 157})
    this.setState({t22: this.state.t22 = 123, l22: this.state.l22 = 157})
    this.setState({t33: this.state.t33 = 66, l33: this.state.l33 = 157})
    this.setState({t44: this.state.t44 = 10, l44: this.state.l44 = 157})
    this.setState({w: this.state.w = 0, h: this.state.h = 0})
    }
    else { 
    this.state.cloudbuts = true;    
    LayoutAnimation.spring();
    this.setState({t11: this.state.t11 = 10, l11: this.state.l11 = 150})
    this.setState({t22: this.state.t22 = -20, l22: this.state.l22 = 75})
    this.setState({t33: this.state.t33 = -15, l33: this.state.l33 = 20})
    this.setState({t44: this.state.t44 = 5, l44: this.state.l44 = -5})
    this.setState({w: this.state.w = 57, h: this.state.h = 57})
    }  
  }
    

      
openBookmarkWindow = () =>{    
    this.props.selectPopUp(2);
    
    var toggle = false;
    
    this.props.cloudState("false");
}
      
openFolderWindow = () =>{
    this.props.selectPopUp(3);
    
    var toggle = false;
    
    this.props.cloudState("false");
}   

openBrowserWindow = () =>{
    if (this.state.browserWindow === false){
        this.setState({
            browserWindow:true,
            homeIcon:require('../imgs/home.png')
        })
        
        this.props.selectWindow(4);    
    }
    
    else {
        this.setState({
            browserWindow:false,
            homeIcon: require('../imgs/google.png')
        })
    
        this.props.selectWindow(1);    
    }
    
}

openSearchWindow = () =>{
    this.props.selectPopUp(5);
    
    var toggle = false;
    
    this.props.cloudState("false");
} 
   
render() {
    
    return (  
        
        <View style={styles.containerHead}>  

              <TouchableOpacity
               onPress ={this.openBookmarkWindow}
               activeOpacity={1}   
               style={[styles.butCloud11, {top: this.state.t11, left: this.state.l11}]}>
                    <Image
                    style={[styles.butCloud1, {width: this.state.w, height: this.state.h}]} 
                    source={require('../imgs/bmkBut.png')}/>           
              </TouchableOpacity>                

              <TouchableOpacity
               onPress={this.openFolderWindow}
               activeOpacity={2}   
               style={[styles.butCloud22, {top: this.state.t22, left: this.state.l22}]} >
                    <Image        
                    style={[styles.butCloud2, {width: this.state.w, height: this.state.h}]} 
                    source={require('../imgs/pluBut.png')}/> 
              </TouchableOpacity> 

              <TouchableOpacity 
               onPress ={this.openSearchWindow}
               activeOpacity={1}   
               style={[styles.butCloud33, {top: this.state.t33, left: this.state.l33}]} >                  
                    <Image
                    style={[styles.butCloud3, {width: this.state.w, height: this.state.h}]} 
                    source={require('../imgs/search.png')}/>
              </TouchableOpacity> 

               <TouchableOpacity
                onPress ={this.openBrowserWindow}
                activeOpacity={1}   
                style={[styles.butCloud44, {top: this.state.t44, left: this.state.l44}]} >               
                    <Image
                    style={[styles.butCloud4, {width: this.state.w, height: this.state.h}]} 
                    source={this.props.homeIcon}/>
               </TouchableOpacity> 

              <TouchableOpacity 
               onPress={this.cloudOnPress} 
               activeOpacity={1}     
               style={styles.butCloud00}>                
                    <Image
                    style={styles.butCloud0}
                    source={require('../imgs/cluBut.png')}/>  
              </TouchableOpacity>

        </View>           



    );
  }
};

