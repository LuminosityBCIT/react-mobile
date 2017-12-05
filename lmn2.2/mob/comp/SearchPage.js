import React, { Component } from 'react';

import { StyleSheet, Text, View, Image, TouchableHighlight, Button, TouchableOpacity, TextInput, WebView, ScrollView, NativeModules, LayoutAnimation, Picker, Dimensions } from 'react-native';

//import CheckBox from 'react-native-checkbox';

import styles from "./css/searchPageStyle";

export default class SearchMark extends React.Component {
      
 constructor(props) {
  super();
     
    this.state = {
        searchInput:""
    }
}
    
componentDidMount(){
    this.inputFocus.focus();
  }      
       
         
cancelFunction = () =>{
      this.props.selectPopUp(1);
      this.props.cloudState(true);
  }



searchBookmark = (data) => {
    this.setState({
        searchInput:data
    })
    
    console.log("img" + this.props.imgSource);
console.log("data", data);
}
     
openBookmark = (obj) =>{
    this.props.openBrowser.bind(obj.url);
    this.props.selectWindow(4);
    
    console.log(data);
}
      
render() {
    
    var searchFilter = this.props.bookmarkLists.filter((obj, i)=>{
        return (obj.title.indexOf(this.state.searchInput)!== -1);
    })
    
    console.log(searchFilter);
    
    
    var showSearchedBookmarks =null;
    
    if (this.state.searchInput != ""){
        
        showSearchedBookmarks = searchFilter.map((obj, i)=>{
        return (

            <View style={styles.markGalleryDisplay}>
            
            <Text style={styles.markGalleryText}>
              {obj.title}
            </Text>
            
            <Image style={styles.markImg}
                source={{uri:this.props.imgSource+obj.url}}
                onPress={this.openBookmark.bind(this, obj.url)}
                                                 
            />
            
    
            </View>
                                        
        ) 
    });
    }
    
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
                            onChangeText={this.searchBookmark}
                           />
                            <Image style={styles.searchBut}
                             source={require('../imgs/searchBut.png')}/>
                     </View>   
                </View>

          <View style={styles.searchDisplay}>   
                  <ScrollView style={styles.searchDisplay2}>   

                      {showSearchedBookmarks}

                 </ScrollView>

         
                
         </View>
            <View
              style={styles.containerDivButs}>                      
                    <TouchableHighlight
                     style={styles.containerDivBut1}
                     onPress ={this.cancelFunction}>
                         <Text style={styles.containerDivButText}>
                         Cancel</Text>
             </TouchableHighlight> 

                     
              </View>   
   </View>
             <TouchableOpacity  style={styles.containerRemove} onPress={this.cancelFunction}>        
            </TouchableOpacity>
                          
</View>
    );
  }
};

