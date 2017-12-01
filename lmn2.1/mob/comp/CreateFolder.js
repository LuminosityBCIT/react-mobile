import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Button, TouchableOpacity, TextInput, WebView, ScrollView, NativeModules, LayoutAnimation, Picker} from 'react-native';
//import CheckBox from 'react-native-checkbox';

import styles from './css/createFolderStyle';
 
  export default class CreateFolder extends React.Component {
      
 constructor(props) {
  super();
//  this.state = {
//    language: 'english', // or language: '',
//  }
      this.state = { 
          titleValue: "New Folder" 
    
      }
 }
      
componentDidMount(){
    this.inputFocus.focus();
  }
      
      
  titlefunction = (text) =>
    {
        //var titleFrom = text;
        this.setState({
            titleValue:text
        });
    }
      
  addFolder = () =>
    {
        if (this.state.titleValue != ""){
                var folder = {
                    folder_name: this.state.titleValue,
                    //folderkey: this.props.folderkeyValue
                }

            this.props.submitFolder(folder);
            this.props.selectPopUp(1);
            this.props.cloudState(true);
            
        }
    }
  
  cancelFunction = () =>{
      this.props.selectPopUp(1);
      this.props.cloudState(true);
  }

         
         
render() {
    
  
    
    return (
        
        
<View
 style={styles.containerAdd}>
    
        
   <View
    style={styles.containerDiv}>
        
        <Text style={styles.addMarkText}>
         Add Folder</Text>

        <View style={styles.addMarkPic1}> 
             <Image style={styles.addTitle}
              source={require('../imgs/title.png')}/>
             <View
              style={styles.addMarkInp2}>
                   <TextInput
                        style={styles.addMarkInp}  
                        onChangeText={this.titlefunction}
                        ref={(folderNameInput) => { this.inputFocus = folderNameInput; }}
                        />
             </View>   
        </View>

        <View style={styles.addMarkPic2}>  
             <Image style={styles.addChoose}
              source={require('../imgs/Choose.png')}/>
          
        </View>

        <View style={styles.addMarkPic2}> 
             <Text style={styles.subFolde}></Text>      
             
         </View>

         <View
              style={styles.containerDivButs}>                      
                    <TouchableHighlight
                     style={styles.containerDivBut1}
                     onPress ={this.cancelFunction}>
                         <Text style={styles.containerDivButText}>
                         Cancel</Text>
                    </TouchableHighlight> 

                    <TouchableHighlight
                     style={styles.containerDivBut2}
                     onPress={this.addFolder}>
                         <Text style={styles.containerDivButText}>
                          Save</Text>
                    </TouchableHighlight> 
              </View>
  
   </View>
        
                          
</View>
    );
  }
};


