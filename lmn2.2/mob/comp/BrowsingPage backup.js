const WEBVIEW_REF = "WEBVIEW_REF";

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Button, TouchableOpacity, TextInput, WebView, ScrollView, NativeModules, LayoutAnimation, Picker, Dimensions} from 'react-native';

import styles from "./css/browsingPageStyle";
 
  export default class BrowsingPage extends React.Component {
      
 constructor(props) {
  super(props);
     
//     this.state = {
//         backBtn:false
//     }

}
   
//backFunction = () => {
//    this.refs[WEBVIEW_REF].goBack();
//}      

//make a current Link function to read which 
//bookmark is being selected so only one browsing page will be used

_onNavigationStateChange = (webViewState) => {
var userlink = webViewState.url;

//    this.setState({
//        backBtn: webViewState.backBtn
//    })
        
this.props.urlStateChange(userlink);
    
console.log("link is " + userlink);
}


render() {
    
  
    
    return (
        
        
        <View style={styles.containerGoogle}>
                <WebView 
                    ref={WEBVIEW_REF}
                    
                    source={{uri:this.props.webLink}}
                    style={styles.containerGoogleDiv}
                
                onNavigationStateChange={this._onNavigationStateChange.bind(this)}    
            
                />
                
                       
            </View>

        
                          

    );
  }
};

