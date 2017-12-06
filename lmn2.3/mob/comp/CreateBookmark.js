import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Button, TouchableOpacity, TextInput, WebView, ScrollView, NativeModules, LayoutAnimation, Picker} from 'react-native';

import styles from './css/createBookmarkStyle';

//
//  https://www.npmjs.com/package/react-native-material-dropdown
//
import { Dropdown } from 'react-native-material-dropdown';
 
  export default class CreateBookmark extends React.Component {
      
 constructor(props) {
  super();
  this.state = {
    language: 'english', // or language: '',
  }
      this.state = { 
            text: "",
            titleValue:"",
            urlValue:"",
            folderValue:"",
            webLink:"",
            autoFocus:false,
            selectedFolder: null
      };
      this.closeWindow = this.closeWindow.bind(this);
}
      
componentDidMount(){
    this.inputFocus.focus();

    if (this.props.currentlyEditingBookmark)
    {
      this.setState({
        urlValue: this.props.currentlyEditingBookmark.url,
        titleValue: this.props.currentlyEditingBookmark.title
      });
    }
    else {
      this.setState({
        urlValue: this.props.webLink
      })
    }
  }      
      
      
closeWindow(){
        this.props.changeWindowsShow(1);
    }
   
callFun = () =>
  {
    alert("Image Clicked!!!");
  }
      
titlefunction = (text) =>
    {
        //var titleFrom = text;
        this.setState({
            titleValue:text
        });
    }

urlfunction = (text) =>
    {
        //var urlFrom = text;
        this.setState({
            urlValue:text
        });
    }


folderfunction = (text) =>
    {
        //var folderFrom = text;
        this.setState({
            folderValue:text
        });
    }

updateBookmark = () => {
  if (this.state.titleValue != ""){

    var folder_key = null;

    if (this.state.selectedFolder)
    {
      folder_key = this.state.selectedFolder["folder_key"];
    }
    //
    //  Fixed by Kaylie for updating the bookmark when folder was not modified
    // 
    else if (this.props.currentlyEditingBookmark.folder_name)
    {
      var currentlySelectedFolderName = this.props.currentlyEditingBookmark.folder_name
      this.props.folderLists.forEach(function(folder) {
          if (folder['folder_name'] == currentlySelectedFolderName)
          {
              folder_key = folder['folder_key'];
          }
      });
    }
    else {
      folder_key = "unorganized";
    }
    //if (this.state.urlValue != ""){
    var bookmark = {
      title: this.state.titleValue,
      url: this.state.urlValue,
      folderkey: folder_key
    }

    this.props.updateBookmark(bookmark, this.props.currentlyEditingBookmark);
    this.props.selectPopUp(1);
    this.props.cloudState(true);

  }

  else {
    alert("title empty");
  }
}

addBookmark = () => {

  if (this.state.titleValue != ""){

    var folder_key = null;

    if (this.state.selectedFolder)
    {
      folder_key = this.state.selectedFolder["folder_key"];
    }
    else {
      folder_key = "unorganized";
    }
    //if (this.state.urlValue != ""){
    var bookmark = {
      title: this.state.titleValue,
      url: this.state.urlValue,
      folderkey: folder_key
    }

    this.props.submitBookmark(bookmark);
    this.props.selectPopUp(1);
    this.props.cloudState(true);
    //}

    //            else {
    //                alert("url empty");
    //            }
  }

  else {
    alert("title empty");
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
          selectedFolder : selectedFolder
      });
  }




render() {
    
    var titleElement = null;
    var dropdownElement = null;

    // alert(JSON.stringify(this.props.currentlyEditingBookmark));

    var urlValue = this.state.urlValue;
    var titleValue = this.state.titleValue;
    var submitButton = null;

    if (this.props.currentlyEditingBookmark)
    {
        titleElement = (<Text style={styles.addMarkText}>Edit Bookmark</Text>)
        dropdownElement = (<Dropdown label='Choose a folder' data={this.props.folderLists} onChangeText={this.onParentFolderSelectionChange} value={this.props.currentlyEditingBookmark.folder_name}/>);

        submitButton = ( <TouchableHighlight
                         style={styles.containerDivBut2}
                         onPress={this.updateBookmark}>
                             <Text style={styles.containerDivButText}>
                              Update</Text>
                        </TouchableHighlight> );
    }
    else {
        titleElement = (<Text style={styles.addMarkText}>Add Bookmark</Text>) 
        dropdownElement = (<Dropdown label='Choose a folder' data={this.props.folderLists} onChangeText={this.onParentFolderSelectionChange} />);

        submitButton = ( <TouchableHighlight
                 style={styles.containerDivBut2}
                 onPress={this.addBookmark}>
                     <Text style={styles.containerDivButText}>
                      Save</Text>
                </TouchableHighlight> );
    }
    
    return (
        
        
<View
 style={styles.containerAdd} >
    

   <View
    style={styles.containerDiv}>
        
        
        
                {titleElement}
        
        
                 <View style={styles.addMarkPic1}>   
                     <Image style={styles.newLink}
                      source={require('../imgs/bmkBut.png')}/>
                     <View style={styles.myLinks}>  
                    <TextInput type="text" onChangeText={this.urlfunction} placeholder="url" defaultValue={urlValue} />
                     </View>
                 </View>
        
              
        
            
        
                <View style={styles.addMarkPic}> 
                   
                   
                           <TextInput
                            ref={(titleInput) => { this.inputFocus = titleInput; }}
                            style={styles.addMarkInp}  
                            type="text" 
                            onChangeText={this.titlefunction} 
                            placeholder="title"
                            defaultValue={titleValue}
                            />
                  
                </View>

                <View style={styles.folderDropDown1}>  
                  {dropdownElement}
                </View>                
           
            
                 <View
                  style={styles.containerDivButs}>                      
                        <TouchableHighlight
                         style={styles.containerDivBut1}
                         onPress ={this.cancelFunction}>
                             <Text style={styles.containerDivButText}>
                             Cancel</Text>
                        </TouchableHighlight> 
                        {submitButton}
                  </View>
  
   </View>
        
     <TouchableOpacity  style={styles.containerRemove} onPress={this.cancelFunction}>        
            </TouchableOpacity>
</View>
    );
  }
};

//{this.props.webLink}