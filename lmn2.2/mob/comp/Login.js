
import React from 'react';
import { Stylesheet, Text, View, TextInput, Button, Image, WebView, Linking, TouchableOpacity, AsyncStorage } from 'react-native';
import Expo from "expo";


//Use google sign in fonts(for whole body text), sidebar, 50%? 40%? need to use react for the project?;

export default class Gcontrols extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            num:0,
            itemName:""
        }
        
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        
    }
    
    //GoogleSignin.signIn()
    
    login = async() => {
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId: "314360845682-p3kvt4iogn8d1s4bli7b7bb549vqaooi.apps.googleusercontent.com",
                iosClientId: "314360845682-dnu615bl3jc76omfgssh6779o29h49je.apps.googleusercontent.com",
                scopes:['profile']
            }).then ((user)=>{
                if(user.type == "success"){
                    //var token = resp.token;
                    
                    
                    var page = "unorganized";
//                    console.log(resp);
                    
                    //var cloud = "true";
                    
                    //this.props.showCloud(cloud);
                    
                    this.props.setIdToken(user.idToken);
                    this.props.setAccessToken(user.accessToken);
                    
                    AsyncStorage.setItem('idToken', user.idToken);
                    
                    AsyncStorage.setItem('accessToken', user.accessToken).then(() => (this.props.changePage(page));
                                                                               
                    
                    console.log(user);
                    
                }
            })
            
            console.log(result);
        } catch(e){
            console.log(e);
            
        }
        
    }
    
    signup(){
        Linking.openURL('http://accounts.google.com/SignUp?hl=en')
            
    }
    
    render(){
        
        
    
        return(
            
            <View>
                <View style={{justifyContent: 'center',
                alignItems: 'center'}}>
            
                    <Image style={{width:150, height:180, marginBottom:70}} source={require('../imgs/logo.png')}
                    />
                    
                </View>
                    
                    
                    <TouchableOpacity style={{width: 300, height: 55,  marginTop:10, marginBottom:15, backgroundColor:"#4C8BF5", padding:10}} onPress={this.login}>
                     
                    <Image style={{top:13, left: 15, position:'absolute', width:30, height:30}} source={require('../imgs/google_login.png')} />
                    
                    <Text style={{top:15, right: 32, position:'absolute', width:200, height:30, fontSize: 20, color: "white"}} >Login With Google</Text>
                
                    </TouchableOpacity> 
                
                
                <TouchableOpacity style={{width: 300, height: 55,  marginTop:15, marginBottom:10, backgroundColor:"#4C8BF5", padding:10}} onPress={this.login}>
                     
                    <Image style={{top:13, left: 15, position:'absolute', width:30, height:30}} source={require('../imgs/google_login.png')} />
                    
                    <Text style={{top:15, right: 90, position:'absolute', width:100, height:30, fontSize: 20, color: "white"}} >Sign Up</Text>
                
                    </TouchableOpacity> 
            
            </View>
        
        );       
    }   
}