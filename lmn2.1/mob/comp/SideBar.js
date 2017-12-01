import React, { Component } from 'react';

import { StyleSheet, Text, View, Image, TouchableHighlight, Button, TouchableOpacity, TextInput, WebView, ScrollView, NativeModules, LayoutAnimation, Picker} from 'react-native';


  export default class SideBar extends React.Component {
      
      constructor(props){
            super(props);  
          this.callFun = this.callFun.bind(this);
      }
 
    
callFun(){
        alert("Image Clicked!!!");
  }
  
           
   
render() {
    
    var showFolder = this.props.folderLists.map((obj, i)=>{
    
        return (            
    <View style={styles.sidedivPic} key={i}>
        <View style={styles.sidedivSubPic}>   
            <TouchableHighlight
            underlayColor={"#FFCC33"}
            style={styles.bmfBut}
            id="folderBtn" onPress={this.props.folderSelection.bind(this, obj.key, i, obj.folder_name)}>
            <Text style={styles.folderText}>{ ((obj.folder_name).length > this.props.maxLimit) ? (((obj.folder_name).substring(0,this.props.maxLimit-3))+ '...'):obj.folder_name } </Text>
            </TouchableHighlight>
            <Button title={"X"}  onPress={this.props.removeFolder.bind(this, obj.key, i)}/>
         </View>                                      
    </View>
        ) 
    });
   

//    <View style={styles.sidedivSubPic}>   
//        
//            <TouchableHighlight
//            underlayColor={"#FBB03B"}
//            style={styles.bmfBut}
//             onPress={this.callFun}>
//            <Text style={styles.folderText}>Text</Text>
//            </TouchableHighlight>
//        
//           <TouchableHighlight
//            underlayColor={"#ff0000"}
//            style={styles.delBut}
//             onPress={this.callFun}>
//            <Text style={styles.delText}>X</Text>
//            </TouchableHighlight>
//        
//           
//
//         </View>  

    return (
        
        <ScrollView style={styles.sideScrollDiv}>
            {showFolder}
        </ScrollView>                            
    );
  }
};

const styles = StyleSheet.create({
    
sidediv:{
         position: 'absolute',
         top:73,
         height:"100%",
         width:"65%",
         bottom:0,
       
     
  }, 

sideScrollDiv:{
    
      height:"100%",
         width:"92%",
},    
    
sidedivPic:{
        left:"30%",
        width:"70%",
       
     
}, 
    
sidedivSubPic:{
         marginTop:5,
        flexDirection: "row",
}, 

bmfBut:{

   backgroundColor:"#FFCE44",
   width: "80%",
   height:50,
   top:"5%",
   alignItems: "center",
 
},    

folderText:{
    marginTop:15,
    color: "white"
},
    
delBut:{

   backgroundColor:"#FBB03B",
   width: "10%",
   height:50,
   top:"5%",
   alignItems: "center",
 
},
    
delText:{
    top:15,
    color: "white"
},    
    
});

