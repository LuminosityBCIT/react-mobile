import React, { Component } from 'react';

import { StyleSheet, Text, View, Image, TouchableHighlight, Button, TouchableOpacity, TextInput, WebView, ScrollView, NativeModules, LayoutAnimation, Picker,Dimensions} from 'react-native';

//import CheckBox from 'react-native-checkbox';

import styles from './css/browsingPageStyle';

var WEBVIEW_REF = 'webview';
var DEFAULT_URL = 'https://www.google.ca/';

export default class App extends React.Component {
      
 constructor(props) {
  super(props);
     
this.state = {  
    url: DEFAULT_URL,
    fnavButton: require('../imgs/fButClicked.png'),
    bnavButton: require('../imgs/bButClicked.png'),
    fdisabledButton: require('../imgs/fBut.png'),
    bdisabledButton: require('../imgs/bBut.png'),
    backButtonEnabled: false,
    forwardButtonEnabled: false,
    }

}

componentWillMount(){
    this.props.changeBrowsingMode(true);
}    

componentWillUnmount(){
    this.props.changeBrowsingMode(false);
}    
    
    
componentDidMount(){
    this.inputFocus.focus();
    
    var openBookmark = this.props.webLink;
    
    this.setState({
        url:openBookmark
    })
  }    

goBack(){
        this.refs[WEBVIEW_REF].goBack();
        }
goForward(){
        this.refs[WEBVIEW_REF].goForward();
       }
reload(){
    this.refs[WEBVIEW_REF].reload();
  }
handleTextInputChange(event) {
    var url = event.nativeEvent.text;
    
    
    if (!/^[a-zA-Z-_]+:/.test(url)) {
      url = "https://www.google.ca/search?q=" + url;
    } 
   
    this.inputText = url;
  }
    
onSubmitEditing(event) {
    var url = event.nativeEvent.text;
    if(url != ""){
    
    this.pressGoButton();
  }
    
}
    
  pressGoButton() {

    var url = this.inputText.toLowerCase();
    if (url === this.state.url) {
      this.reload();
    } else {
      this.setState({
        url: url,
      });
    }
    // dismiss keyboard
  
  }  
    
_onNavigationStateChange = (webViewState) => {
var userlink = webViewState.url;

this.setState({
      backButtonEnabled: webViewState.canGoBack,
      forwardButtonEnabled: webViewState.canGoForward,
    });
        
this.props.urlStateChange(userlink);
    
console.log("link is " + userlink);
}
    
    
render() {
    

    
    return (
        
        
<View style={styles.containerGoogle}>
        
              <Image
               source={require('../imgs/bg_googleHeader.png')}
               style={styles.containerGoogleTitle}>
                   
                      <TouchableOpacity
                           style={styles.bBut11}
                           onPress={this.goBack.bind(this)}
                           activeOpacity={1}>                                         
                              <Image style={styles.bBut}
                                source={this.state.backButtonEnabled ? this.state.bnavButton : this.state.bdisabledButton}/>                 
                      </TouchableOpacity>  
                                  
                      <TouchableOpacity
                           style={styles.fBut11}
                           onPress={this.goForward.bind(this)}
                           activeOpacity={1}>
                              <Image style={styles.fBut}
                                source={this.state.forwardButtonEnabled ? this.state.fnavButton : this.state.fdisabledButton}/>
                      </TouchableOpacity>  

                <View style={styles.searchGoogleCtrl}> 
                    <View
                     style={styles.searchGoogleInp}>
                       <TextInput
                            style={styles.searchGoogleInp2}  
                            placeholder="Search Google or type URL"
                            onChange={this.handleTextInputChange.bind(this)}
                            onSubmitEditing={this.onSubmitEditing.bind(this)}
                            autoCapitalize="none"
                            clearButtonMode="while-editing"
                            ref={(urlInput) => { this.inputFocus = urlInput; }}
                            underlineColorAndroid={'rgba(0,0,0,0)'}
                            />
                       <TouchableOpacity
                             style={styles.refreshBut11}
                             onPress={this.reload.bind(this)}
                             activeOpacity={1}>
                           <Image style={styles.refreshBut}
                            source={require('../imgs/refresh.png')}/>
                       </TouchableOpacity>     
                    </View>   
                </View> 
             </Image>
            <View style={{position: 'absolute',
                height:Dimensions.get("window").height*0.9,
                           top: 75,         }}>
             <WebView     
                ref={WEBVIEW_REF}
                source={{uri: this.state.url}}
                style={styles.containerGoogleDiv}
                
                onNavigationStateChange={this._onNavigationStateChange.bind(this)}    
            
                />
            </View>
                                      
</View>

    );
  }
};

