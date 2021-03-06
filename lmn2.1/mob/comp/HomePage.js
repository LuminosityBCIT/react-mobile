
import React, { Component } from 'react';
import * as firebase from 'firebase';
import { ListView, StyleSheet, Text, View, Image, TouchableHighlight, Button, TouchableOpacity, TextInput, WebView, ScrollView, NativeModules, LayoutAnimation, FlatList } from 'react-native';

import CreateBookmark from "./CreateBookmark";
import CreateFolder from "./CreateFolder";
import Cloud from "./Cloud";
import BrowsingPage from "./BrowsingPage";
import SideBar from "./SideBar";
import SearchPage from "./SearchPage";
import BookMarkRowComponent from "./BookMarkRowComponent";
    
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
            folderkey:null,
            //userlink:"",
            selectedLink:"http://www.google.ca",
            popUpType:1,
            burgerIcon:require('../imgs/menuBut.png'),
            cloudToggle:true,
            maxLimit: 9,
            clickedValue: "Home",
            selectedFolder: null,
            fullBookmarkLists: [],
            isEditing: false,
            folderLayouts: {},
            currentlyVisibleItems: [],
            currentlyEditingBookmark: null
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

        var bookmarkRef = firebase.database().ref("users/"+user.uid+"/bookmarks");  
            
        var folderRef = firebase.database().ref("users/"+user.uid+"/folders");     

        var bmDisplay = bookmarkRef;    
        var fdDisplay = folderRef;    
        var self = this;
                   
        // connect to a Firebase table
        //
        //KAYLIE!!
        //
        //
        //  Following code is to retrieve data snapshot from Firebase for user's bookmark data
        //  and converting it into datasource for ListView instaed of ScrollView which causes some problem on display multiple items in rows
        //  Reference can be found in https://medium.com/@mpr312/a-simple-react-native-app-using-firebase-realtime-database-ce794ecdc47d
        //
        //  Also, using Firebase, there is no point on subscribing for two events, "once('value')", and "on('child_added')"
        //  as "on('value')" will automatically detect any child added or any data updated in REAL TIME. 
        //
        var bookmarkDbRefValue = "users/"+user.uid+"/bookmarks";   
        var firebaseBookmarkRef = firebase.database().ref(bookmarkDbRefValue);   
        firebaseBookmarkRef.on('value', (snapshot) => {

            var bookmarkArr = [];

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
                    folderkey: fkey
                };

                bookmarkArr.push(obj);
            });

            console.log(JSON.stringify(bookmarkArr));
            self.setState({
                bookmarkLists: bookmarkArr,
                fullBookmarkLists: bookmarkArr
            });
        });

        var folderDbRefValue = "users/"+user.uid+"/folders";
        var firebaseRef = firebase.database().ref(folderDbRefValue);
        firebaseRef.on('value', (snapshot) => {

            var folderArr = [];
            
            var parentFolders = [];
            var childFolders = [];
            var combinedOrderedFolder = [];

            snapshot.forEach(function(childSnapshot) {

                var folder_name = childSnapshot.child("folder_name").val();
                var folder_key = childSnapshot.child("folder_key").val();
                var parent_key = childSnapshot.child("parent_key").val();

                var obj = {
                    folder_name: folder_name,
                    folder_key: folder_key,
                    parent_key: parent_key,
                    value: folder_name,
                    key: snapshot.key
                };

                folderArr.push(obj);
            });

            //
            //  split parent, and child folders
            //
            folderArr.forEach(function(thisFolder) {

                //
                //  if parent key exists, save it in child folders
                //
                if (thisFolder["parent_key"])
                {
                    childFolders.push(thisFolder);
                }
                //
                //  if parent key does not exist, save it in parent folders
                //
                else {
                    parentFolders.push(thisFolder);
                }
            });

            //
            //  loop through parent folder array to save them in order with child
            //
            parentFolders.forEach(function(thisFolder) {

                combinedOrderedFolder.push(thisFolder);
                childFolders.forEach(function(child) {

                    if (child['parent_key'] == thisFolder['folder_key'])
                    {
                        combinedOrderedFolder.push(child);
                    }
                });
            });

            // alert(JSON.stringify(parentFolders));

            this.setState({
                folderLists: combinedOrderedFolder
            });
        });
      
        //burger menu state
        this.state.burgerbuts = true;
        this.setState({burgerl: this.state.burgerl = "5%"})
        this.setState({burgerw: this.state.burgerw = "90%"})
        this.setState({sideDivl: this.state.sideDivl = "-60%"})    
        
    }


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
        var newBookmarkObj = obj;
        var user = firebase.auth().currentUser;
        var bookmarkDbRef = "users/"+user.uid+"/bookmarks";

        firebase.database().ref(bookmarkDbRef).once('value').then(function(snapshot) {
            var snapshotArray = [];

            snapshot.forEach(function(childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;
                snapshotArray.push(item);
            });
            snapshotArray.unshift(newBookmarkObj);
            firebase.database().ref(bookmarkDbRef).set(snapshotArray);
        });
    }     

    updateBookmark = (obj, originalBookmark) => {

        console.log("original", JSON.stringify(originalBookmark));
        console.log("new", JSON.stringify(obj));

        var newBookmarkObj = obj;
        var user = firebase.auth().currentUser;
        var bookmarkDbRef = "users/"+user.uid+"/bookmarks";

        firebase.database().ref(bookmarkDbRef).once('value').then(function(snapshot) {
            var snapshotArray = [];

            snapshot.forEach(function(childSnapshot) {
            
                var item = childSnapshot.val();
                item.key = childSnapshot.key;
                if (originalBookmark.title == childSnapshot.child('title').val() && originalBookmark.url == childSnapshot.child('url').val() && originalBookmark.folderkey == childSnapshot.child('folderkey').val())
                {

                }
                else
                {
                    snapshotArray.push(item);
                }
            });
            snapshotArray.unshift(newBookmarkObj);
            firebase.database().ref(bookmarkDbRef).set(snapshotArray);
        });
        this.setState({
            currentlyEditingBookmark: null
        });
    }
    

    submitFolder = (obj) => {
        var newFolderObj = obj;
        var user = firebase.auth().currentUser;
        var folderDbRefValue = "users/"+user.uid+"/folders";

        firebase.database().ref(folderDbRefValue).once('value').then(function(snapshot) {
            
            var snapshotArray = [];

            snapshot.forEach(function(childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;
                snapshotArray.push(item);
            });
            snapshotArray.unshift(newFolderObj);
            firebase.database().ref(folderDbRefValue).set(snapshotArray);
        });
    }
    

    folderSelection = (key, index, name, snapshot) =>{
          
        var whichFolder = name;
        var selectedFolder = null;

        this.state.folderLists.forEach(function(folder) {

            if (folder["folder_name"] == name)
            {
                selectedFolder = folder;
            }
        });

        this.setState({
            clickedValue:whichFolder
        });

        var selected_folder_key = "";

        if (selectedFolder)
        {
            selected_folder_key = selectedFolder["folder_key"];
        }
        else if (name == "Unorganized")
        {
            selected_folder_key = "unorganized";
        }

        if (selected_folder_key)
        {
            var filteredBookmarks = [];
            this.state.fullBookmarkLists.forEach(function(bookmark) {

                console.log("Bookmark Name: " + bookmark["name"] + " // folder key: " + bookmark["folderkey"] + " // selected folder key: " +selected_folder_key);
                if (selected_folder_key == bookmark["folderkey"])
                {
                    filteredBookmarks.push(bookmark);
                }
            });

            console.log("List of bookmarks: " + JSON.stringify(filteredBookmarks));
            this.setState({
                folderkey:selected_folder_key,
                bookmarkLists:filteredBookmarks
            });
        }
    }

    removeFolder = (key, index) => {

        //
        //  Do the same thing as what I did for adding a new bookmark
        //  except that I don't add a new bookmark, and skip the index that I am deleting.
        //
        var user = firebase.auth().currentUser;
        var folderDbRefValue = "users/"+user.uid+"/folders";

        var snapshotArray = [];
        var i = 0;
        this.state.folderLists.forEach(function(folder) {

            if (i != index)
            {
                snapshotArray.push(folder);
            }
            i++;
        });
        firebase.database().ref(folderDbRefValue).set(snapshotArray);
    }

    updateFolderLayout = (folderLayout, folder_key) => {
        var folderLayouts = this.state.folderLayouts;
        folderLayouts[folder_key] = folderLayout;

        this.setState({
            folderLayouts: folderLayouts
        });
    }

    isDropZone = (dropCoordinate, bookmark) => {

        var isDropZone = false;
        var droppedFolderKey = "";

        //
        //  https://stackoverflow.com/questions/684672/how-do-i-loop-through-or-enumerate-a-javascript-object
        //
        for (var key in this.state.folderLayouts)
        {
            if (this.state.folderLayouts.hasOwnProperty(key))
            {
                var thisLayout = this.state.folderLayouts[key];

                    console.log("====");
                    console.log("layout", JSON.stringify(thisLayout));
                    console.log("dropCoordinate", JSON.stringify(dropCoordinate));
                    console.log("key", key);
                    console.log("====");
                //
                // Double check if the drop coordinate is within the boundary of folder
                // height of top bar should be added to the folder's y position
                //
                if ((thisLayout.y+86 < dropCoordinate.moveY && (thisLayout.y+86 + thisLayout.height) > dropCoordinate.moveY) && (thisLayout.x < dropCoordinate.moveX && (thisLayout.x + thisLayout.width) > dropCoordinate.moveX))
                {
                    isDropZone = true;
                    droppedFolderKey = key;
                }
            }
        }

        if (isDropZone)
        {
            if (droppedFolderKey == "edit")
            {
                var folderName = "undefined";
                this.state.folderLists.forEach(function(folder){
                    if (folder['folder_key'] == bookmark.folderkey)
                    {
                        folderName = folder['folder_name'];
                    }
                });

                bookmark['folder_name'] = folderName;

                this.setState({
                    popUpType: 2,
                    currentlyEditingBookmark: bookmark
                })
                this.swithEditMode();

                return true;
            }
            else 
            {
                var newBookmarkObj = bookmark;
                var user = firebase.auth().currentUser;
                var bookmarkDbRef = "users/"+user.uid+"/bookmarks";

                var newBookmarkLists = [];
                this.state.fullBookmarkLists.forEach(function(thisBookmark) {

                    if (droppedFolderKey == "delete")
                    {
                        //
                        //  if it is for delete, do not add to new array if url and title are the same
                        //
                        if ((thisBookmark.url != bookmark.url) && (thisBookmark.title != bookmark.title))
                        {
                            newBookmarkLists.push(thisBookmark);
                        }
                    }
                    else {
                        //
                        //  if it is for updateing the folder, change the folder key if url and title are the same
                        //
                        if ((thisBookmark.url == bookmark.url) && (thisBookmark.title == bookmark.title))
                        {
                            thisBookmark.folderkey = droppedFolderKey;
                        }

                        newBookmarkLists.push(thisBookmark);
                    }
                });
                firebase.database().ref(bookmarkDbRef).set(newBookmarkLists);
                this.swithEditMode();
            }
        }

        return isDropZone;
    }
    
    swithEditMode = () =>
    {
        this.setState({
            isEditing: !this.state.isEditing
        });

        //
        //  display burger view while editing
        //
        if (this.state.isEditing && !this.state.burgerbuts)
        {
            this.burgerOnPress();
        }
        //
        //  When editing is done, hide the burger view
        //
        if (!this.state.isEditing && this.state.burgerbuts)
        {
            this.burgerOnPress();
        }
    }
    
    cloudState = (data) =>{
        this.setState({
            cloudToggle:data
        });
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

    //
    //  Use FlatList for rendering rows
    //  https://facebook.github.io/react-native/docs/flatlist.html
    //
    _renderItem = ({item}) => (
        <BookMarkRowComponent url={this.imgSource+item.url} obj={item} key={item.key} isEditing={this.state.isEditing} isDropZone={this.isDropZone} openBrowser={this.openBrowser}/>
    );

    //
    //  Detect currently visible items since when editing mode enters the FlatList will be switched to View 
    //  which will only disply the first few items in the list
    //  If we do not do this, when entering the edit mode will result in always display the first few items
    //  even if user enters the edit mode in the middle of the list
    //
    //  Stackoverflow reference: https://stackoverflow.com/a/45869559
    //
    _onViewableItemsChanged = (viewableItems, changed) => {
        // console.log('Visible items are', viewableItems.viewableItems);
        if (!this.state.isEditing)
        {
            this.setState({
                currentlyVisibleItems: viewableItems.viewableItems
            })
        }
    }


render() {
    
    
    var listingBookmarks = this.state.bookmarkLists;
    var showBookmark = null;

    if (this.state.isEditing)
    {
        // console.log('Visible items are', JSON.stringify(this.state.currentlyVisibleItems));
        showBookmark = this.state.currentlyVisibleItems.map((obj, i)=>{
            var bookmark = obj.item;            
            return (
                <BookMarkRowComponent url={this.imgSource+bookmark.url} obj={bookmark} key={i} isEditing={this.state.isEditing} isDropZone={this.isDropZone}/>                                        
            ) 
        });
    }
    else {
        //
        //  filtering the bookmark if selected folder key exists
        //
        if (this.state.fullBookmarkLists && this.state.folderkey)
        {
            listingBookmarks = [];
            var selectedFolderKey = this.state.folderkey;

            this.state.fullBookmarkLists.forEach(function(bookmark) {
            
                if (selectedFolderKey == bookmark.folderkey)
                {
                    listingBookmarks.push(bookmark);
                }
            });
        }
        showBookmark = <FlatList style={styles.markView2} data={listingBookmarks} renderItem={this._renderItem} onViewableItemsChanged={this._onViewableItemsChanged}/>
    }


// var flatList = <FlatList data={listingBookmarks} renderItem={this._renderItem}/>


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
                    folderLists={this.state.folderLists}
                    selectPopUp={this.selectPopUp}
                    selectWindow={this.selectWindow}
                    submitBookmark={this.submitBookmark}
                    folderkeyValue={this.state.folderkey}
                    webLink={this.webLink}
                    cloudState={this.cloudState}
                    updateBookmark={this.updateBookmark}
                    currentlyEditingBookmark = {this.state.currentlyEditingBookmark}
                    //userlink={this.state.userlink}
                />            
              ) 
        }  

        //Create Folder Page
        else if(this.state.popUpType == 3){
             popUpDisplay = (
                    <CreateFolder 
                        folderLists={this.state.folderLists}
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

        //
        //  if isEditing is true, hide cloud toggle
        //
        var editButtonText = "";
        if (this.state.isEditing)
        {
            cloudDisplay = null;
            editButtonText = "Cancel";
        }
        else {
            editButtonText = "Edit";
        }

        //
        //  if the bookmark is being edited, display bookmark row elements in flat view instaed of scrollview
        //  Also, hide cloud button while editing
        //
        var bookmarkListElement = null;
        if (this.state.isEditing)
        {
            bookmarkListElement = <View style={styles.markView2}>
                {showBookmark}
            </View>
        }
        else {
            bookmarkListElement = showBookmark
        }

    return (
    <View style={styles.container}>

        <Image
            source={require('../imgs/bg_Header.png')}
            style={styles.containerTitle}>   


    <View style={styles.titlePart1}>
        <TouchableOpacity
         style={styles.butImg2}
         activeOpacity={1}
         onPress={this.burgerOnPress}>
            <Image
             style={styles.butImg}
             source={this.state.burgerIcon} />
        </TouchableOpacity>  
    </View>


    <View style={styles.titlePart2}>
          <Image
             style={styles.homeBut}
             source={require('../imgs/folder_Icon.png')} />

          <Text
            style={styles.homeButText}
                 >
                 { ((this.state.clickedValue).length > this.state.maxLimit) ? (((this.state.clickedValue).substring(0,this.state.maxLimit-3))+ '...'):this.state.clickedValue }</Text>
    </View>
<TouchableOpacity onPress={this.swithEditMode}>
    <Text>{editButtonText}</Text>
</TouchableOpacity>
     <View style={styles.titlePart3}>                         
      </View>                                           
                                                 
                                                        
                        </Image>             
                     
        <Image
        source={require('../imgs/bg_bar.png')}
         style={[styles.sidediv, {left: this.state.sideDivl}]} >

                  <SideBar 
                    maxLimit={this.state.maxLimit}
                    folderLists={this.state.folderLists}
                    folderSelection={this.folderSelection}
                    removeFolder={this.removeFolder}
                    isEditing={this.state.isEditing}
                    updateFolderLayout={this.updateFolderLayout}
                />

        </Image>
                 
        <View 
            style={[styles.markView, {flex:1, width: this.state.burgerw, left: this.state.burgerl}]} >  
            {bookmarkListElement}
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
       
        marginRight: 10,
       
       
        width:40,
        height:40,
      
     
},       
    
    
homeBut2:{
        width:100,
        height:24,
        top:22,  
},

     
    
butImg2:{
         
        
         height:60,
         width:60,
        
        
},
    
butImg:{ margin:12,
         height:37,
         width:37,    
}, 
    
titlePart1:{
         height:"75%",
         width:"20%",
        
        alignItems: 'center',
        flexDirection:'row',
}, 
titlePart2:{
         height:"75%",
         width:"60%",
        
         alignItems: 'center',
         justifyContent: 'center',
         flexDirection:'row',
}, 
titlePart3:{ 
         height:"75%",
         width:"20%",
         
        alignItems: 'center',
        flexDirection:'row',
},     
    
    
    
homeButText:{
          
           height:25,
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
