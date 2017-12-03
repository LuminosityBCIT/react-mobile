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
  
    updateDropZoneValues(event, folder_key)
    {
      this.props.updateFolderLayout(event.nativeEvent.layout, folder_key);
    }
   
    render() {

      //
      //  Create an array of folders with dummy "Unorganized" folder which is not present in Database
      //
      var folderListWithUnorganized = [];

      this.props.folderLists.forEach(function(thisFolder) {
        folderListWithUnorganized.push(thisFolder);
      });

      var unorganizedFolder = {};
      unorganizedFolder["folder_name"] = "Unorganized";
      unorganizedFolder["folder_key"] = "unorganized";
      unorganizedFolder["parent_key"] = null;
      folderListWithUnorganized.push(unorganizedFolder);


      var showFolder = folderListWithUnorganized.map((obj, i)=>{

        var imgElement = null;
        //
        //  if parent_key exists, this is subfolder, otherwise, it's parent folder
        //
        if (obj['parent_key'])
        {
            imgElement = <View style={styles.folderImgView}><Image style={styles.subFolderImg} source={require('../imgs/subFolder.png')} /></View>;
        }
        else {
            imgElement = <View style={styles.folderImgView}><Image style={styles.folderImg} source={require('../imgs/folder.png')} /></View>;
        }

        //
        //  Don't create delete button for unorganized folder
        //
        var deleteButton = null;
        if (obj['folder_key'] != "unorganized")
        {
            deleteButton = <Button title={"X"}  onPress={this.props.removeFolder.bind(this, obj.key, i)}/>;
        }

        if (this.props.isEditing)
        {
          deleteButton = null;
        }

            //
            //  passing additional parameters on onLayout event
            //  https://stackoverflow.com/questions/30203154/get-size-of-a-view-in-react-native
            //
            return (            
        <View style={styles.sidedivPic} key={i} onLayout={(event) => {this.updateDropZoneValues(event, obj.folder_key)}}>
            <View style={styles.sidedivSubPic}>   
                {imgElement} 
                <TouchableHighlight
                id="folderBtn" onPress={this.props.folderSelection.bind(this, obj.key, i, obj.folder_name)}>
                <Text style={styles.folderText}>{ ((obj.folder_name).length > this.props.maxLimit) ? (((obj.folder_name).substring(0,this.props.maxLimit-3))+ '...'):obj.folder_name } </Text>
                </TouchableHighlight>
                {deleteButton}
             </View>                                      
        </View>
            ) 
      });

      var trashIcon = null;
      var editIcon = null;

      if (this.props.isEditing)
      {
      trashIcon = (<View style={styles.editView} onLayout={(event) => {this.updateDropZoneValues(event, "delete")}}>
                <Image style={styles.editViewImage} source={require('../imgs/trash.png')} />
              </View>)
      editIcon = (
              <View style={styles.editView} onLayout={(event) => {this.updateDropZoneValues(event, "edit")}}>
                <Image style={styles.editViewImage} source={require('../imgs/editBookmark.png')} />
              </View>   )
      }

      return (
          <View>
            <ScrollView style={styles.sideScrollDiv}>
                {showFolder}
            </ScrollView>        
            {trashIcon}
            {editIcon}   
          </View>
      );
  }
};

const styles = StyleSheet.create({
    
editViewImage : {
   alignItems: "center",
},

editView : {
  width: '100%',
   alignItems: "center",
   marginBottom: 20
},

editViewContainer : {
   alignItems: "center",
},

folderImgView : {
    width: 40,
    height: 30
},

folderImg : {
    width: 31,
    height: 23,
    marginTop: 12
},

subFolderImg : {
    width: 27,
    height: 15,
    marginTop: 15
},

sidediv:{
         position: 'absolute',
         top:73,
         height:"100%",
         width:"65%",
         bottom:0,
}, 

sideScrollDiv:{
    
      height:"50%",
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
    color: "black"
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

