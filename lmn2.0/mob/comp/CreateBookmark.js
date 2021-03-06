import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Button, TouchableOpacity, TextInput, WebView, ScrollView, NativeModules, LayoutAnimation, Picker} from 'react-native';

import styles from './css/createBookmarkStyle';

 
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
            autoFocus:false
      };
      this.closeWindow = this.closeWindow.bind(this);
}
      
componentDidMount(){
    this.inputFocus.focus();
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

addBookmark = () => {

        if (this.state.titleValue != ""){
            //if (this.state.urlValue != ""){
                var bookmark = {
                    title: this.state.titleValue,
                    url: this.props.webLink,
                    folderkey: this.props.folderkeyValue
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




render() {
    

    
    return (
        
        
<View
 style={styles.containerAdd}>
    
        
   <View
    style={styles.containerDiv}>
        
                <Text style={styles.addMarkText}>
                 Add Bookmark</Text>
        
                <View style={styles.addMarkPic1}> 
                     <Image style={styles.addTitle}
                      source={require('../imgs/title.png')}/>
                     <View
                      style={styles.addMarkInp2}>
                           <TextInput
                            ref={(titleInput) => { this.inputFocus = titleInput; }}
                            style={styles.addMarkInp}  
                            type="text" 
                            onChangeText={this.titlefunction} 
                            placeholder="title"
                            
                            />
                     </View>   
                </View>

                <View style={styles.addMarkPic1}>  
                     <Image style={styles.addFolder}
                      source={require('../imgs/folder.png')}/>
                     <View style={styles.addMarkPic}>   
                     </View>
                </View>
                
                <View style={styles.addMarkPic1}>   
                     <Image style={styles.addSubFolder}
                      source={require('../imgs/subFolder.png')}/>
                     <View style={styles.addMarkPic}>  
                    <TextInput type="text" onChangeText={this.urlfunction} placeholder="url" value={this.props.webLink} />
                     </View>
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
                         onPress={this.addBookmark}>
                             <Text style={styles.containerDivButText}>
                              Save</Text>
                        </TouchableHighlight> 
                  </View>
  
   </View>
        
                          
</View>
    );
  }
};

