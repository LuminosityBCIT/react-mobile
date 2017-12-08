import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import Login from "./comp/Login";
import HomePage from "./comp/HomePage";

import BookMarkRowComponent from './comp/BookMarkRowComponent';

import styles from './comp/css/appStyle';


export default class App extends React.Component {
    constructor(props){
        super(props);
      
        this.state = {
            page:"",
            idToken:"",
            accessToken:"",
            //cloud: ""
            
            
        }
    
    this.changePage = this.changePage.bind(this);
    this.setIdToken = this.setIdToken.bind(this);
    this.setAccessToken = this.setAccessToken.bind(this);
    //this.showCloud = this.showCloud.bind(this);
   
        
    }
    
    
changePage(data){
    this.setState({
        page:data
    })
}
    
setIdToken(data){
    this.setState({
        idToken:data
    })
    
//console.log("idToken " + data);
}
    
setAccessToken(data){
    this.setState({
        accessToken:data
    })

//console.log("acToken " + data);
}
    
//showCloud(bool){
//    this.setState({
//        cloud:bool
//    })
//}
        
  render() {
      
    var comp = null;
      
    if (this.state.page == ""){
        comp = <Login 
            changePage={this.changePage}
            setIdToken={this.setIdToken}
            setAccessToken={this.setAccessToken}
            signInCheck={this.signInCheck}
            />
    }
      
    else if (this.state.page == "unorganized"){
        comp = <HomePage 
                idToken={this.state.idToken}
                accessToken={this.state.accessToken}  
                changePage={this.changePage}
                />
    }
      
    //var cloud = null;
      
//    if (this.state.cloud == "true"){
//        cloud = <CloudIcon />
//    }
      
      
    return (
      <View style={styles.container}>
        <Image source={require('./imgs/background.png')} style={styles.entireBg}
        />
        {comp}
       
        
      </View>
    );
  }
}
