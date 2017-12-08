import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Button, TouchableOpacity, TextInput, WebView, ScrollView, NativeModules, LayoutAnimation, Picker} from 'react-native';
//import CheckBox from 'react-native-checkbox';

import styles from './css/createFolderStyle';

//
//  https://www.npmjs.com/package/react-native-material-dropdown
//
import { Dropdown } from 'react-native-material-dropdown';
 
  export default class CreateFolder extends React.Component {
      
  constructor(props) {
      super();
      this.state = { 
          titleValue: "New Folder",
          selectedParentFolder: null 
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

        var parent_key = null;

        if (this.state.selectedParentFolder)
        {
          parent_key = this.state.selectedParentFolder["folder_key"];
        }

        var folder = {
            folder_name: this.state.titleValue,
            folder_key: this.generateRandomString(),
            parent_key: parent_key
        }
        
        this.setState({
          selectedParentFolder: null
        });

        this.props.submitFolder(folder);
        this.props.cloudState(true);
        
        this.props.selectPopUp(7);
        
      }
  }
    
  cancelFunction = () =>{
      this.props.selectPopUp(1);
      this.props.cloudState(true);
  }

  onParentFolderSelectionChange = (text) =>
  {
      var selectedFolder = null;

      this.props.folderLists.forEach(function(folder) {
          if (folder['folder_name'] == text)
          {
              selectedFolder = folder;
          }
      });

      this.setState({
          selectedParentFolder : selectedFolder
      });
  }

  generateRandomString = () =>
  {
      //
      //  Same code used in extension to generate random string
      //
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 20; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
  }

         
         
render() {
    //
    // create a new array just for the parent folders
    // there is no need to display sub folders when creating a folder
    //
    var parentFolders = [];

    this.props.folderLists.forEach(function(folder) {
        if (!folder['parent_key'])
        {
            parentFolders.push(folder);
        }
    });
    
    return (
        
        
<View
 style={styles.containerAdd}>
    
        
   <View
    style={styles.containerDiv}>
        
        <Text style={styles.addMarkText}>
         Add Folder</Text>

        <View style={styles.addMarkPic1}> 
             <Image style={styles.addTitle}
              source={require('../imgs/folder_Icon.png')}/>
             <View
              style={styles.addMarkInp2}>
                   <TextInput
                        style={styles.addMarkInp}  
                        onChangeText={this.titlefunction}
                        ref={(folderNameInput) => { this.inputFocus = folderNameInput; }}
                        />
             </View>   
        </View>

        <View style={styles.folderDropDown}>  
              <Dropdown
                label='Choose parent folder'
                data={parentFolders}
                onChangeText={this.onParentFolderSelectionChange}
              />
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

     <TouchableOpacity  style={styles.containerRemove} onPress={this.cancelFunction}>        
    </TouchableOpacity>
</View>
    );
  }
};


