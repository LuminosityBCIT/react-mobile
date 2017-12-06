import React from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';

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
 
componentDidMount(){
 this.checkToken();
}
 
async checkToken(){ 
    let getIdToken = await AsyncStorage.getItem('idToken'); 
    let getAccessToken = await AsyncStorage.getItem('accessToken'); 

    this.setState({
        idToken:getIdToken,
        accessToken:getAccessToken
    })
  
    AsyncStorage.getItem('idToken').then((res) => console.log("homepage idT", res));
    
    AsyncStorage.getItem('accessToken').then((res) => console.log("homepage acT", res));

//    if (this.state.idToken != null && this.state.accessToken != null){
//    
//    this.setState({
//        page:"homepage"
//    })
//}
    
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
      
    else if (this.state.page == "homepage"){
        comp = <HomePage 
                idToken={this.state.idToken}
                accessToken={this.state.accessToken}
                changePage={this.changePage}
                />
    }
      
    return (
      <View style={styles.container}>
        <Image source={require('./imgs/background.png')} 
        style={styles.entireBg}
        />
        {comp}
       
        
      </View>
    );
  }
}
