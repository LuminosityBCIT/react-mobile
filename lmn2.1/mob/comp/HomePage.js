
import React, { Component } from 'react';
import * as firebase from 'firebase';
import { ListView, StyleSheet, Text, View, Image, TouchableHighlight, Button, TouchableOpacity, TextInput, WebView, ScrollView, NativeModules, LayoutAnimation, FlatList } from 'react-native';

import CreateBookmark from "./CreateBookmark";
import CreateFolder from "./CreateFolder";
import Cloud from "./Cloud";
import BrowsingPage from "./BrowsingPage";
import SideBar from "./SideBar";
import SearchPage from "./SearchPage";
    
//import CheckBox from 'react-native-checkbox';

const { UIManager } = NativeModules;

//screenshot API from ApiLeap
//const BookMarkRowComponent = (props)  => {
//    //
//    //  https://apileap.com
//    //  100 free screenshot API per month
//    //
//    let imgSource ={ uri: "https://apileap.com/api/screenshot/v1/urltoimage?access_key=6597e3c2daf5432cb84991dbd18c09f8&url="+props.bookmark.url };
//}




var firebaseConfig = {
    apiKey: "AIzaSyCvPwGe93Z5ysoPNuU_QZeHRuyOQkqf5MU",
    authDomain: "luminosity-4dc48.firebaseapp.com",
    databaseURL: "https://luminosity-4dc48.firebaseio.com",
    projectId: "luminosity-4dc48",
    storageBucket: "luminosity-4dc48.appspot.com",
    messagingSenderId: "314360845682"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);


var firebaseRef = firebase.database();

var fdDisplay = firebaseApp.database().ref('folder');


export default class HomePage extends Component {
    
constructor(props) {
        super(props);
        
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            bookmarkLists:[],
            folderLists: [],            
            titleValue:"",
            urlValue:"",
            folderValue:"",
            currentUser: null,
            dataSource: null,
            dataSource: ds,
            burgerl: "5%",
            burgerw: "90%",
            sideDivl: "-60%",
            burgerbuts:true,
            window:1,
            fbDatabase: null,
            userID:"",
            credential:"",
            folderkey:"unorganized",
            //userlink:"",
            selectedLink:"http://www.google.ca",
            popUpType:1,
            burgerIcon:require('../imgs/menuBut.png'),
            cloudToggle:true,
            maxLimit: 9,
            clickedValue: "Home"
            //browserVisibility:"'hidden'"
               
        };
        this.webLink = "https://www.google.ca/";
    this.imgSource = "https://apileap.com/api/screenshot/v1/urltoimage?access_key=6597e3c2daf5432cb84991dbd18c09f8&url=";
    }
 
    componentWillMount(){
        this.listenForAuth();
        
        const credential = firebase.auth.GoogleAuthProvider.credential(this.props.idToken, this.props.accessToken);
            
        return firebase.auth().signInWithCredential(credential);
    
    }
    
    componentDidMount(){
        
        var firebaseDbh = firebase.database();
        var user = firebase.auth().currentUser;
        
        this.setState({
            userID:user.uid
        })
        
        console.log("userID = " + user.uid);
        
/*// connect to a Firebase table
       
        
//KAYLIE!!
        
//        var dbRefValue = "users/"+user.uid+"/bookmarks";
//
//        
//        var dbref = firebaseDbh.ref(dbRefValue);
//        dbref.on('value', (e) => {
//            var rows = [];
//            if ( e && e.val() && e.val().map ) {
//                e.val().map((v) => rows.push ( v ));
//            }
//            var ds = this.state.dataSource.cloneWithRows(rows);
//            this.setState({
//                dataSource: ds
//            });
            
            //console.log("ds " + ds);
//        });
//        
//        var firebaseRef = firebase.database().ref('folder');
//        firebaseRef.on('value', (snapshot) => {
//
//            var folderArr = [];
//            
//            snapshot.forEach(function(childSnapshot) {
//
//                var folder_name = snapshot.child("folder_name").val();
//                var obj = {
//                    folder_name: folder_name,
//                    key: snapshot.key
//                }
//                folderArr.push(childSnapshot);
//            });
//
//            this.setState({
//                folderLists: folderArr
//            });
//        });*/

    var bookmarkRef = firebase.database().ref("users/"+user.uid+"/bookmarks");  
        
    var folderRef = firebase.database().ref("users/"+user.uid+"/folders");     

    var bmDisplay = bookmarkRef;    
    var fdDisplay = folderRef;    
    var self = this;
        
        //loop through snapshot on load
        bmDisplay.once('value', function(snapshot){     
            var bookmarkArr = self.state.bookmarkLists;
            
            snapshot.forEach(function(bookmarkSnapshot) {
                
            var bmTitle = bookmarkSnapshot.child("title").val();
            var bmURL = bookmarkSnapshot.child("url").val();
            var fkey = bookmarkSnapshot.child("folderkey").val();
            
            if(bmTitle == null){
                return false;
            }    
                
            var obj = {
                title:bmTitle,
                url:bmURL,
                key:bookmarkSnapshot.key,
                //index:bookmarkArr.length,
                folderkey: fkey
            }
            bookmarkArr.push(obj);
         
            });
            
               self.setState({
                bookmarkLists: bookmarkArr
            })
         
                             
            //console.log("bookmark", bookmarkArr);
            //console.log("CDM done");
        });
        
        //loop through bookmark on add
        bmDisplay.on('child_added', function(snapshot){     
            var bookmarkArr = self.state.bookmarkLists;
            
            snapshot.forEach(function(bookmarkSnapshot) {
                
            var bmTitle = bookmarkSnapshot.child("title").val();
            var bmURL = bookmarkSnapshot.child("url").val();
            var fkey = bookmarkSnapshot.child("folderkey").val();
        
            if(bmTitle == null){
                return false;
            }  

            var obj = {
                title:bmTitle,
                url:bmURL,
                key:bookmarkSnapshot.key,
                //index:bookmarkArr.length,
                folderkey: fkey
            }
            bookmarkArr.push(obj);
         
            });
            
               self.setState({
                bookmarkLists: bookmarkArr
            })
         
                             
            //console.log("bookmark", bookmarkArr);
            //console.log("CDM done");
        });

        
        fdDisplay.once('value', function(snapshot){     
            
            var folderArr = self.state.folderLists;
            
            snapshot.forEach(function(folderSnapshot) {
                
            var folder_name = folderSnapshot.child("folder_name").val();
            //console.log(snapshot.child("folderkey").val());
            if(folder_name == null){
                return false;
            }
            var obj = {
                folder_name:folder_name,
                key:folderSnapshot.key,
                //index:folderArr.length
            }
            folderArr.push(obj);
            
            });
            
               self.setState({
                folderLists: folderArr
            })
         
   
            //console.log("folder", folderArr);
            //console.log("CDM done");
        });
        
        fdDisplay.on('child_added', function(snapshot){     
            var folderArr = self.state.folderLists;
            
            snapshot.forEach(function(folderSnapshot) {
              
            var folder_name = folderSnapshot.child("folder_name").val();
            //console.log(snapshot.child("folderkey").val());
            
            if(folder_name == null){
                return false;
            }  
            
                var obj = {
                folder_name:folder_name,
                key:folderSnapshot.key,
                //index:folderArr.length
            }
            folderArr.push(obj);
            
            });
            
               self.setState({
                folderLists: folderArr
            })
         
   
            //console.log("folder", folderArr);
            //console.log("CDM done");
        });
        
        
        
      
        //burger menu state
        this.state.burgerbuts = true;
        this.setState({burgerl: this.state.burgerl = "5%"})
        this.setState({burgerw: this.state.burgerw = "90%"})
        this.setState({sideDivl: this.state.sideDivl = "-60%"})    
        
    }
    
//    
    
    burgerOnPress = () => {
        if(this.state.burgerbuts == true) { 
            this.state.burgerbuts = false;    
            LayoutAnimation.spring();
            this.setState({burgerl: this.state.burgerl = "50%"})
            this.setState({burgerw: this.state.burgerw = "45%"})
            this.setState({sideDivl: this.state.sideDivl = "-10%"})
            this.setState({
                burgerIcon:require('../imgs/menu_clicked.png')
            })
        }
        else { 
            this.state.burgerbuts = true;    
            LayoutAnimation.spring();
            this.setState({burgerl: this.state.burgerl = "5%"})
            this.setState({burgerw: this.state.burgerw = "90%"})
            this.setState({sideDivl: this.state.sideDivl = "-60%"})
            this.setState({
                burgerIcon:require('../imgs/menu_unclicked.png')
            })
        }  
    }

    selectWindow = (index) =>{
        this.setState({
            window:index
        })
    }
    
    selectPopUp = (index) =>{
        this.setState({
            popUpType:index
        })
    }
    
    submitBookmark = (obj) => {
        console.log(this.state.bookmarkLists);
    
       //var bookmarkRef = this.state.bookmarkRef;
    
    var bookmarkRef = firebase.database().ref("users/"+this.state.userID).child("bookmarks");    
            bookmarkRef.push(obj);
            console.log("bookmark sent");  

    }     
    

    submitFolder = (obj) => {
        /*var folderValue = this.state.folderValue;
        firebase.database().ref("folder").once('value').then(function(snapshot) {
            
            var snapshotArray = [];

            snapshot.forEach(function(childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;
                snapshotArray.push(item);
            });

            var newFolder = {};
            newFolder["folder_name"] = folderValue;
            snapshotArray.unshift(newFolder);

            firebase.database().ref("folder").set(snapshotArray);
        });
        this.state.changeWindows = null;
        */
        
        
        var folderRef = firebase.database().ref("users/"+this.state.userID).child("folders");
       
            folderRef.push(obj);
            console.log("new folder created");   
        }
    

    folderSelection = (key, index, name, snapshot) =>{
            
        var folderkeyRef = firebase.database().ref("users/"+this.state.userID).child("folders");
          
        var whichFolder = name;
        this.setState({
            clickedValue:whichFolder
        })
        // this.setState({
        //     folderkey: folderKeyRef.key
        // });
         
        // console.log(name + " key: " + folderKeyRef.key);

        // var folderNameDisplay = this.state.folderNameDisplay;
        // folderNameDisplay.innerHTML = name;  
    }

    removeFolder = (key, index) => {
        // var filter = this.state.bookmarkLists.filter((obj, i)=>{
            
        //     return (obj.folderkey == key)
        // });
        
        // for(var i in filter){
        //     console.log(filter[i]);
        //     firebase.database().ref("bookmarks/"+filter[i].key).remove();
        // }
        // firebaseApp.database().ref("folder/"+key).remove();
        
        // var folderArr = this.state.folderLists;
        // folderArr.splice(index, 1);
        
        // //console.log(folderArr);
        // this.setState({
        //     folderLists: folderArr
        // })    
    }
    
    
    cloudState = (data) =>{
        this.setState({
            cloudToggle:data
        })
        
        
    }

    //
    //  Reference
    //  https://stackoverflow.com/questions/43019528/react-native-firebase-onauthstatechanged 
    //
    listenForAuth() {
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    currentUser: user
                })
            } 
        })
    }
    
    
    urlStateChange = (data) => {
        //var userlink = webViewState.url;
        
            this.webLink = data;
        
//            this.setState({
//                userlink:data
//            })
        
        //console.log("nav state " + data);
    }
    
    
    openBrowser = (data) => {
    //var link = JSON.stringify(data);
    
    //console.log(this.state.changeWindows);
    if (data != ""){
    
//    Linking.openURL(link); 
//            
        this.setState({
            selectedLink: data
        });
        
    this.setState({
        window:4
    })
    //console.log("herelink", data); 
        
    
        
    }
    
    else {
        alert("Not a valid URL!");
    }
}
    
    removeBookmark = ()=>{}

render() {
    
    var filter = this.state.bookmarkLists.filter((obj, i)=>{
        return (obj.folderkey == this.state.folderkey);
    })
    
    //console.log("filter",filter);
    
    
    var showBookmark = filter.map((obj, i)=>{
        return (

            <View style={styles.markGalleryDisplay} key={i}>
            
            <Text style={styles.markGalleryText}>
              {obj.title}
            </Text>
            
             <TouchableOpacity
         style={styles.markImg22}
         activeOpacity={1}
         
                onPress={this.openBrowser.bind(this, obj.url)}>
            <Image style={styles.markImg}
                source={{uri:this.imgSource+obj.url}}
                
            
            />
        </TouchableOpacity> 
            
            
           
            
    
            </View>
            
                                         
        ) 
    });
//<View 
// style={styles.markGalleryDisplay}
// key={i} >
//     <View 
//     style={styles.markGallerySubDisplay}>
//    <Button 
//     style={styles.markGalleryText}
//     title={obj.title} onPress={this.openBrowser.bind(this, obj.url)}/>
//
//    <Button 
//     title={"X"} onPress={this.removeBookmark.bind(this, obj.key, i)}/>
// </View>
//</View>     

//DIRECTIONS    
//look into asyncstorage
//save id, sign out -> login page
//filter -> search input 


     var windowDisplay = null;

        //Default Home Page
        if(this.state.window == 1){
              
//                this.setState({
//                    windowVisibility:"hidden"
//                })
                  windowDisplay = null;
        
        }

        //Browsing WebView Page
        else if (this.state.window == 4){
                
//                this.setState({
//                    browserVisibility:"visible"
//                })
            
            
                windowDisplay = (
                    <BrowsingPage 
                        //defaultLink={this.state.defaultLink}
                        urlStateChange={this.urlStateChange}
                        webLink={this.webLink}
                        userlink={this.state.userlink}
                        selectedLink={this.state.selectedLink}
                        //browserVisibility={this.state.browserVisibility}
                />
            )
        }



       
    var popUpDisplay = null;    
        
        if(this.state.popUpType == 1){
              popUpDisplay = null;
        
        }
        
        //Create Bookmark Page
        else if(this.state.popUpType == 2){
             popUpDisplay = (
                 <CreateBookmark
                    selectPopUp={this.selectPopUp}
                    selectWindow={this.selectWindow}
                    submitBookmark={this.submitBookmark}
                    folderkeyValue={this.state.folderkey}
                    webLink={this.webLink}
                    cloudState={this.cloudState}
                    //userlink={this.state.userlink}
                />            
              ) 
        }  

        //Create Folder Page
        else if(this.state.popUpType == 3){
             popUpDisplay = (
                    <CreateFolder 
                        selectPopUp={this.selectPopUp} 
                        selectWindow={this.selectWindow}
                        submitFolder={this.submitFolder}
                        cloudState={this.cloudState}
                />
              ) 
        }
    
        else if(this.state.popUpType == 5){
             popUpDisplay = (
                    <SearchPage 
                        selectPopUp={this.selectPopUp} 
                        selectWindow={this.selectWindow}
                        //submitFolder={this.submitFolder}
                        cloudState={this.cloudState}
                        bookmarkLists={this.state.bookmarkLists}
                        imgSource={this.imgSource}
                        openBrowser={this.openBrowser}
                />
              ) 
        }

    var cloudDisplay = null;

        if(this.state.cloudToggle == true) {
            cloudDisplay = 
            <Cloud 
                selectWindow={this.selectWindow}
                selectPopUp={this.selectPopUp}
                cloudState={this.cloudState}
                />
        }
        
        else {
            cloudDisplay = null;
            
        }


    return (
    <View style={styles.container}>

        <Image
            source={require('../imgs/bg_Header.png')}
            style={styles.containerTitle}>   



        <TouchableOpacity
         style={styles.butImg2}
         activeOpacity={1}
         onPress={this.burgerOnPress}>
            <Image
             style={styles.butImg}
             source={this.state.burgerIcon} />
        </TouchableOpacity>  




          <Image
             style={styles.homeBut}
             source={require('../imgs/folder_Icon.png')} />

          <Text
            style={styles.homeButText}
                 >
                 { ((this.state.clickedValue).length > this.state.maxLimit) ? (((this.state.clickedValue).substring(0,this.state.maxLimit-3))+ '...'):this.state.clickedValue }</Text>


                               
                                                 
                                                 
                                                        
                        </Image>             
                     
        <Image
        source={require('../imgs/bg_bar.png')}
         style={[styles.sidediv, {left: this.state.sideDivl}]} >

                  <SideBar 
                    maxLimit={this.state.maxLimit}
                    folderLists={this.state.folderLists}
                    folderSelection={this.folderSelection}
                    removeFolder={this.removeFolder}
                />

        </Image>
                 
        <View 
            style={[styles.markView, {flex:1, width: this.state.burgerw, left: this.state.burgerl}]} >  
                <ScrollView style={styles.markView2}>
                    {showBookmark}
                </ScrollView>
        </View>     
                
        {windowDisplay} 
        {popUpDisplay}
        {cloudDisplay}
        
    </View>
    );
  }
};



const styles = StyleSheet.create({
   
    
  container: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor:'transparent',
        justifyContent: 'center',
        flexDirection: 'column',
},
    
containerTitle: {
        flex: 1,
        position: 'absolute',
        top:0,      
        width: '100%',
        height: 86,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
     
      
},
 
homeBut:{
        position: "relative",
        marginRight: 10,
        top:4,
        width:40,
        height:40,
      
     
},       
    
    
homeBut2:{
        width:100,
        height:24,
        top:22,  
},

     
    
butImg2:{
         
         position: "relative",
         left:-50,
         top:3,
         height:60,
         width:60,
         marginRight: 15,
        
},
    
butImg:{ margin:12,
         height:37,
         width:37,    
}, 
    
homeButText:{
           width:120,
           height:25,
           position: "relative",
           
           top: 5, 
           fontSize: 20,
           fontWeight: 'bold',
},        
    
butSear2:{
          position: "relative",
          left:70,
          top:20,
          height:32,
          width:32,
},
    
butSear:{
         height:32,
         width:32,    
},
  

    
containerTitleItems:{
            
         flexDirection:'row', 
},    
   
sidediv:{
         position: 'absolute',
         top:73,
         height:"100%",
         width:"65%",
         bottom:0,
       
     
  }, 
  
markView:{
        
         top:86,
         height:"80%",
          width:"80%",
         flexDirection: 'column',
    
},
    
markView2:{
         
         width:"100%",
         marginLeft: "10%"
},    
      
markGalleryDisplay:{
         height:300,
         width:"100%",
        
}, 
    
markGalleryText:{
         marginTop: 10,
         marginBottom: 10,
         fontSize:20,
         width:"80%",
},
    
markImg22:{
         width:"80%",
         height:200,
         marginBottom: 50,
}, 
    markImg:{
         width:"100%",
         height:200,
        
}, 
    
sidedivPic:{
        left:"30%",
        width:"70%",
       
     
},       

    
bmfBut:{
    
  
   backgroundColor:"#3399FF",
   width: "80%",
   height:50,
   top:"5%",
   alignItems: "center",
 
},
sidedivSubPic:{
         marginTop:5,
        flexDirection: "row",
},    
    
markGallerySubDisplay:{ 
        flexDirection: "row",
         backgroundColor:"#f1f1f1",   
},        
    
folderText:{
    marginTop:15,
    color: "white",
    fontSize: 20,
    
}, 
    
thumbnailContainer: {
    flex: 1,
    padding: 12,
    flexDirection: 'column',
    alignItems: 'center',
  },
    
thumbnailText: {
    fontSize: 13,
  },
    
thumbnailImage: {
    height: 200,
    width: 200,
    borderRadius: 10,
  }    
    
});
