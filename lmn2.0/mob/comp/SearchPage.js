import React, { Component } from 'react';

import { StyleSheet, Text, View, Image, TouchableHighlight, Button, TouchableOpacity, TextInput, WebView, ScrollView, NativeModules, LayoutAnimation, Picker, Dimensions } from 'react-native';

//import CheckBox from 'react-native-checkbox';

import styles from "./css/searchPageStyle";

export default class SearchMark extends React.Component {
      
 constructor(props) {
  super();
}
    
componentDidMount(){
    this.inputFocus.focus();
  }      
       
         
cancelFunction = () =>{
      this.props.selectPopUp(1);
      this.props.cloudState(true);
  }
     
      
render() {
    
  
    
    return (
        
        
<View
 style={styles.containerSearch}>
    
        
   <View
    style={styles.containerSearchDiv}>
        
                <Text style={styles.searchText}>
                 Search</Text>
        
                <View style={styles.searchPic1}> 
                     
                     <View
                      style={styles.searchInp2}>
                           <TextInput
                            style={styles.searchInp}  
                            placeholder="Search Bookmarks"
                            ref={(titleInput) => { this.inputFocus = titleInput; }}
                           />
                            <Image style={styles.searchBut}
                             source={require('../imgs/searchBut.png')}/>
                     </View>   
                </View>

          <View style={styles.searchDisplay}>   
          <ScrollView style={styles.searchDisplay2}>   
              
              
                <View style={styles.searchFolderPic1}>  
                     <Image style={styles.searchMyFolder}
                      source={require('../imgs/folder.png')}/>
                     <Text style={styles.searchFolderText}>Folder</Text>
                     <Text style={styles.searchFolderText2}>></Text>
                     <Text style={styles.searchFolderText}>Subfolder</Text>
                     <Text style={styles.searchFolderText2}>></Text>
                     <Text style={styles.searchFolderText}></Text>
                </View>

           <Image style={styles.searchMarkImg}
            source={require('../imgs/invisionapp.png')}/>
                                            
                <View style={styles.searchFolderPic1}>  
                     <Text style={styles.searchFolderText}>Bookmark</Text>
                     <Text style={styles.searchFolderText2}>-</Text>
                <Text style={styles.searchFolderText}>https://www.google.ca/</Text>
                </View>
                
                        <View style={styles.searchFolderPic1}>  
                     <Image style={styles.searchMyFolder}
                      source={require('../imgs/folder.png')}/>
                     <Text style={styles.searchFolderText}>Folder</Text>
                     <Text style={styles.searchFolderText2}>></Text>
                     <Text style={styles.searchFolderText}>Subfolder</Text>
                     <Text style={styles.searchFolderText2}>></Text>
                     <Text style={styles.searchFolderText}></Text>
                </View>

           <Image style={styles.searchMarkImg}
            source={require('../imgs/invisionapp.png')}/>
                                            
                <View style={styles.searchFolderPic1}>  
                     <Text style={styles.searchFolderText}>Bookmark</Text>
                     <Text style={styles.searchFolderText2}>-</Text>
                <Text style={styles.searchFolderText}>https://www.google.ca/</Text>
                </View>

         </ScrollView>
        
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
                     >
                         <Text style={styles.containerDivButText}>
                          Save</Text>
                    </TouchableHighlight> 
              </View>    
                
         </View>

   </View>
        
                          
</View>
    );
  }
};

