
import React from 'react';
import { Stylesheet, Text, View, TextInput, Button, Image, WebView, Linking, TouchableOpacity, AsyncStorage } from 'react-native';
import Expo from "expo";


//Use google sign in fonts(for whole body text), sidebar, 50%? 40%? need to use react for the project?;

export default class Gcontrols extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            loginState:1
        }
        
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        
    }
    
    
//   componentWillMount(){
//       
//       AsyncStorage.getItem('idToken').then((res) => {
//        this.props.setIdToken(res);        
//        //console.log("idToken got" + res);   
//        
//        });
//
//        AsyncStorage.getItem('accessToken').then((res) => {
//            this.props.setIdToken(res);
//        //console.log("accToken got" + res);   
//
//        });
//       
//   } 
//    
//componentDidMount(){
//    if (this.props.idToken != "" && this.props.accessToken != "" ){
//        this.props.changePage("homepage");
//    }
//}
    
    
    //GoogleSignin.signIn()
    
    login = async() => {
        
        setTimeout(()=>{
                this.setState({
            loginState:2
        })    
        }, 2000)
        
//        this.setState({
//            loginState:2
//        })
        
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId: "314360845682-p3kvt4iogn8d1s4bli7b7bb549vqaooi.apps.googleusercontent.com",
                iosClientId: "314360845682-dnu615bl3jc76omfgssh6779o29h49je.apps.googleusercontent.com",
                scopes:['profile']
            }).then ((user)=>{
                if(user.type == "success"){
                    //var token = resp.token;
                    
                    console.log("login success");
                    console.log(user);
                    
                    var page = "homepage";
                    
                    
                    //console.log(user);
                    
                    //var cloud = "true";
                    
                    //this.props.showCloud(cloud);
                    
                    AsyncStorage.setItem('idToken', user.idToken);
                    AsyncStorage.setItem('accessToken', user.accessToken);
                    
                    this.props.setIdToken(user.idToken);
                    this.props.setAccessToken(user.accessToken);
                    this.props.changePage(page);
                    
                    //console.log(user);
                    
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
        
        var loginDisplay = null;
        
        if (this.state.loginState == 1){
            loginDisplay = (
                
                <View>
                <View style={{justifyContent: 'center',
                alignItems: 'center'}}>
            
                    <Image style={{width:150, height:180, marginBottom:70}} source={require('../imgs/logo.png')}
                    />
                    
                </View>
                    
                    
                    <TouchableOpacity style={{width: 300, height: 55,  marginTop:10, marginBottom:15, backgroundColor:"#BADADD", padding:10, borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#00263A', }} onPress={this.login}>
                     
                    <Image style={{top:13, left: 40, position:'absolute', width:30, height:30}} source={require('../imgs/google.png')} />
                    
                    <Text style={{top:15, right: 20, position:'absolute', width:200, height:30, fontSize: 20, color: "#00263A"}} >Log In With Google</Text>
                
                    </TouchableOpacity> 
                
            
            </View>
            
            )
        }
        
        else if (this.state.loginState == 2){
            loginDisplay = (
                
                <View style={{justifyContent: 'center',
                alignItems: 'center'}}>
            
                    <Image style={{width:150, height:180, marginBottom:70}} source={require('../imgs/logo.png')}
                    />
                
                
                    <Text>Please wait while we hack your phone...</Text>
                </View>
            )
        }
        
        
    
        return(
            
            <View>
                {loginDisplay}
            </View>
        
        );       
    }   
}