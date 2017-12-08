
import React, { Component } from 'react';
import * as firebase from 'firebase';
import { ListView, StyleSheet, Text, View, Image, TouchableHighlight, Button, TouchableOpacity, TextInput, WebView, ScrollView, NativeModules, LayoutAnimation, FlatList, Animated, Easing, AsyncStorage, Alert } from 'react-native';

import CreateBookmark from "./CreateBookmark";
import CreateFolder from "./CreateFolder";
import Cloud from "./Cloud";
import BrowsingPage from "./BrowsingPage";
import SideBar from "./SideBar";
import SearchPage from "./SearchPage";
import BookMarkRowComponent from "./BookMarkRowComponent";
import PopUpNewMark from "./PopUpNewMark";
import PopUpNewFolder from "./PopUpNewFolder";

    
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
            sideDivl: "-65%",
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
            currentlyEditingBookmark: null,
            //browserVisibility:"'hidden'"
            homeIcon:require('../imgs/google.png'),
            
            bookmarkH: 250,
            bookmarkMB: 20,
            bookmarkImgH: 200,
            
            sideP1H: "10%", 
            sideP2H: "90%",
            sideP3H: "0%",
            sideP4H: "0%",
            //editFunction: this.swithEditMode()
               
        };
        this.editButs = false;
        this.webLink = "https://www.google.ca/";
        this.imgSource = "https://apileap.com/api/screenshot/v1/urltoimage?access_key=6597e3c2daf5432cb84991dbd18c09f8&url=";
    
    this.springValue = new Animated.Value(0.3);
    this.springValue2 = new Animated.Value(1)
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
        this.setState({sideDivl: this.state.sideDivl = "-65%"})  
        
        this.setState({bookmarkH: this.state.sideDivl = 250})
        
        this.setState({bookmarkMB: this.state.sideDivl = 20}) 
        
        this.setState({bookmarkImgH: this.state.sideDivl = 200})
        
        AsyncStorage.getItem('idToken').then((res) => console.log("idT", res));
        AsyncStorage.getItem('accessToken').then((res) => console.log("acT", res));
        
    }

    editBookmark = () => {
      
       if(this.editButs == true) { 
            
            this.editButs = false;    
            LayoutAnimation.spring();
           
            this.setState({
                sideP1H: this.state.sideP1H = "10%",
                sideP2H: this.state.sideP1H = "90%",
                sideP3H: this.state.sideP1H = "0%",
                sideP4H: this.state.sideP1H = "0%",
                isEditing: !this.state.isEditing,
                cloudToggle: true
                
            })
            
            
            
            //CANT DO BOTH
//            this.setTimeout( () => {
//                this.swithEditMode();
//            },1000);
//            this.setState({
//            isEditing: !this.state.isEditing
//        });
       //this.swithEditMode();
        
            
        }
        else { 
            
            this.editButs = true;    
            LayoutAnimation.spring();
            
            this.setState({
                sideP1H: this.state.sideP1H = "10%",
                sideP2H: this.state.sideP1H = "50%",
                sideP3H: this.state.sideP1H = "20%",
                sideP4H: this.state.sideP1H = "20%",
                isEditing: !this.state.isEditing,
                cloudToggle: false
            })
            
            
            
            
            
            //this.swithEditMode();
            
//            this.setState({
//            isEditing: this.state.isEditing
//        });
       
        
            }
  
        }  
    
    
    
    burgerOnPress = () => {
        
        this.springValue2.setValue(0.3)
  Animated.spring(
    this.springValue2,
    {
      toValue: 1,
      friction: 1
    }
  ).start()  

        if(this.state.burgerbuts == true) { 
            this.state.burgerbuts = false;    
            LayoutAnimation.spring();
            this.setState({burgerl: this.state.burgerl = "53%"})
            this.setState({burgerw: this.state.burgerw = "45%"})
            this.setState({sideDivl: this.state.sideDivl = "-10%"})
            this.setState({
                burgerIcon:require('../imgs/menu_clicked.png')
            })
            
            this.setState({sideDivl: this.state.sideDivl = "-10%"})
            
            this.setState({bookmarkH: this.state.bookmarkH = 150})
            this.setState({bookmarkMB: this.state.bookmarkMB = 30})
            this.setState({bookmarkImgH: this.state.bookmarkImgH = 100})
       
            this.springValue.setValue(0.3)
            Animated.spring(
            this.springValue,
                {
                  toValue: 1,
                  friction: 1
                }
             ).start()
        }
        else { 
            this.state.burgerbuts = true;    
            LayoutAnimation.spring();
            this.setState({burgerl: this.state.burgerl = "5%"})
            this.setState({burgerw: this.state.burgerw = "90%"})
            this.setState({sideDivl: this.state.sideDivl = "-65%"})
            this.setState({
                burgerIcon:require('../imgs/menu_unclicked.png')
            })
            
            this.setState({bookmarkH: this.state.bookmarkH = 250})
            this.setState({bookmarkMB: this.state.bookmarkMB = 20})
            this.setState({bookmarkImgH: this.state.bookmarkImgH = 200}) 
            
        }  
    }
    
    changeBrowsingMode = (bool) => {
        if (bool == true){
            this.setState({
                homeIcon:require('../imgs/home.png')    
            })
        }
        
        else {
            this.setState({
                homeIcon:require('../imgs/google.png')
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
          
          //
          //    Disable folder selection when edit mode
          //
        if (this.state.isEditing)
        {
            return;
        }

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
        // s
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

                //
                //  For edit/delete, since the images are added in HomePage.js with edit button on top of listing from HomePage.js, 
                //  they have different coordinate offset
                //  
                if (key == "edit" || key == "delete")
                {
                    if ((thisLayout.y+86 < dropCoordinate.moveY && (thisLayout.y+86 + thisLayout.height) > dropCoordinate.moveY) && (thisLayout.x < dropCoordinate.moveX && (thisLayout.x + thisLayout.width) > dropCoordinate.moveX))
                    {
                        isDropZone = true;
                        droppedFolderKey = key;
                    }
                }
                //
                //  For folder items, the offset of the y coordinate is 136 (86 for the header, and 50 for edit button)
                //
                else {
                    if ((thisLayout.y+136 < dropCoordinate.moveY && (thisLayout.y+136 + thisLayout.height) > dropCoordinate.moveY) && (thisLayout.x < dropCoordinate.moveX && (thisLayout.x + thisLayout.width) > dropCoordinate.moveX))
                    {
                        isDropZone = true;
                        droppedFolderKey = key;
                    }
                }
            }
        }

        if (isDropZone)
        {

            if (droppedFolderKey == "delete")
            {
                // https://facebook.github.io/react-native/docs/alert.html
                // Works on both iOS and Android
                Alert.alert(
                  'Alert',
                  'Are you sure you want to delete this bookmark?',
                  [
                    {text: 'Cancel', onPress: () => {
                        this.editBookmark();
                        return;
                    }, style: 'cancel'},
                    {text: 'Yes', onPress: () => {

                        var newBookmarkObj = bookmark;
                        var user = firebase.auth().currentUser;
                        var bookmarkDbRef = "users/"+user.uid+"/bookmarks";

                        var newBookmarkLists = [];
                        this.state.fullBookmarkLists.forEach(function(thisBookmark) {

                            //
                            //  if it is for delete, do not add to new array if url and title are the same
                            //
                            if ((thisBookmark.url != bookmark.url) && (thisBookmark.title != bookmark.title))
                            {
                                newBookmarkLists.push(thisBookmark);
                            }
                        });

                        //
                        //  Turn off edit mode when drag & drop is done
                        //
                        firebase.database().ref(bookmarkDbRef).set(newBookmarkLists);
                        this.editBookmark();
                    }},
                  ],
                  { cancelable: false }
                )
            }
            else if (droppedFolderKey == "edit")
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
                //
                //  Turn off edit mode when drag & drop is done
                //
                this.editBookmark();
                return true;
            }
            else 
            {
                var newBookmarkObj = bookmark;
                var user = firebase.auth().currentUser;
                var bookmarkDbRef = "users/"+user.uid+"/bookmarks";

                var newBookmarkLists = [];
                this.state.fullBookmarkLists.forEach(function(thisBookmark) {
                    //
                    //  if it is for updateing the folder, change the folder key if url and title are the same
                    //
                    if ((thisBookmark.url == bookmark.url) && (thisBookmark.title == bookmark.title))
                    {
                        thisBookmark.folderkey = droppedFolderKey;
                    }

                    newBookmarkLists.push(thisBookmark);
                });

                //
                //  Turn off edit mode when drag & drop is done
                //
                firebase.database().ref(bookmarkDbRef).set(newBookmarkLists);
                this.editBookmark();
            }
        }

        return isDropZone;
    }
    
//    swithEditMode = () =>
//    {
//        this.setState({
//            isEditing: !this.state.isEditing
//        });
//
//        //
//        //  display burger view while editing
//        //
////            if (this.state.isEditing && !this.state.burgerbuts)
////            {
////                this.burgerOnPress();
////            }
//        //
//        //  When editing is done, hide the burger view
//        //
////            if (!this.state.isEditing && this.state.burgerbuts)
////            {
////                this.burgerOnPress();
////            }
//    }
    
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
//        
        //console.log("nav state " + data);
    }
    
    
    openBrowser = (data) => {
    //var link = JSON.stringify(data);
    
    //console.log(this.state.changeWindows);
    if (data != ""){
    
//    Linking.openURL(link); 
//            
//        this.setState({
//            selectedLink: data
//        });
        
        this.webLink = data;
        
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

    updateDropZoneValues(event, folder_key)
    {
      this.updateFolderLayout(event.nativeEvent.layout, folder_key);
    }
    
    logOut = () =>{
        AsyncStorage.removeItem('idToken');
        AsyncStorage.removeItem('accessToken');
        
        AsyncStorage.getItem('idToken').then((res) => console.log(" forget idT", res));
        AsyncStorage.getItem('accessToken').then((res) => console.log("forget acT", res));
        
        
        this.props.changePage("");
        
        
    }
    
    
render() {
    
    console.log("isedit", this.state.isEditing);
    
    var listingBookmarks = this.state.bookmarkLists;
    var showBookmark = null;

    if (this.state.isEditing)
    {
        // console.log('Visible items are', JSON.stringify(this.state.currentlyVisibleItems));
        showBookmark = this.state.currentlyVisibleItems.map((obj, i)=>{
            var bookmark = obj.item;            
            return (
                <BookMarkRowComponent url={this.imgSource+bookmark.url} obj={bookmark} key={i} isEditing={this.state.isEditing} isDropZone={this.isDropZone}
                bookmarkH={this.state.bookmarkH}
                bookmarkImgH={this.state.bookmarkImgH}
                bookmarkMB={this.state.bookmarkMB}
                
                />
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

    //if isEditing is true, hide cloud toggle
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
                        selectedLink=
                        {this.state.selectedLink}
                        homeIcon={this.state.homeIcon}
                        changeBrowsingMode={this.changeBrowsingMode}
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
    
        else if(this.state.popUpType == 6){
             popUpDisplay = (
                    <PopUpNewMark 
                        selectPopUp={this.selectPopUp} 
                        //selectWindow={this.selectWindow}
                        //submitFolder={this.submitFolder}
                        cloudState={this.cloudState}
                        //bookmarkLists={this.state.bookmarkLists}
                        //imgSource={this.imgSource}
                        //openBrowser={this.openBrowser}
                />
              ) 
        }
    
        else if(this.state.popUpType == 7){
             popUpDisplay = (
                    <PopUpNewFolder 
                        selectPopUp={this.selectPopUp} 
                        //selectWindow={this.selectWindow}
                        //submitFolder={this.submitFolder}
                        cloudState={this.cloudState}
                        //bookmarkLists={this.state.bookmarkLists}
                        //imgSource={this.imgSource}
                        //openBrowser={this.openBrowser}
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
                browsingMode={this.state.browsingMode}
                homeIcon={this.state.homeIcon}
                />
        }
        
        else {
            cloudDisplay = null;
            
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
         activeOpacity={0.1}
         onPress={this.burgerOnPress}>
            
            <Animated.Image
             style={{ margin:12, height:37, width:37, transform: [{scale: this.springValue2}] }}
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

        <TouchableOpacity style={styles.titlePart3} onPress={this.logOut}>
            <Text style={styles.titlePart3Text}>Sign out</Text>
        </TouchableOpacity>
                                             
                                                 
                                                        
                        </Image>             
                     
        <Image
        source={require('../imgs/bg_bar.png')}
         style={[styles.sidediv, {left: this.state.sideDivl}]} >

                  <View style={[styles.sidedivPart1, {height: this.state.sideP1H}]}> 
                  <TouchableOpacity
                  style={styles.sidedivEdit}
                  onPress={this.editBookmark}
                  activeOpacity={1}>
                        <Image
                            source={require('../imgs/dropzone.png')}
                            style={styles.sidedivPart1Img}> 
                              <Image
                                    source={require('../imgs/edit.png')}
                                    style={styles.clicktoEditImg}> 
                              </Image>      
                              <Text style={styles.clicktoEditText}>
                              Click here to Edit
                             </Text>   
                        </Image>
                  </TouchableOpacity> 
                 
             </View>
              <View style={[styles.sidedivPart2, {height: this.state.sideP2H}]}>  
                  <SideBar
                    springValue={this.springValue}
                    maxLimit={this.state.maxLimit}
                    folderLists={this.state.folderLists}
                    folderSelection={this.folderSelection}
                    removeFolder={this.removeFolder}
                    isEditing={this.state.isEditing}
                    updateFolderLayout={this.updateFolderLayout}
                />
             </View> 

              <View style={[styles.sidedivPart3, {height: this.state.sideP3H}]} onLayout={(event) => {this.updateDropZoneValues(event, "edit")}}>  
                 <Image
                            source={require('../imgs/dropzone_1.png')}
                            style={styles.sidedivPart3Img}> 
                               <Image
                                    source={require('../imgs/edit.png')}
                                    style={styles.clicktoEditImg}> 
                              </Image>      
                              <Text style={styles.clicktoEditText}>
                              Drag here to Edit
                             </Text>   
                                
                </Image>
             </View> 

             <View style={[styles.sidedivPart4, {height: this.state.sideP4H}]} onLayout={(event) => {this.updateDropZoneValues(event, "delete")}}>  
                  <Image
                            source={require('../imgs/dropzone_1.png')}
                            style={styles.sidedivPart4Img}>
                                <Image
                                    source={require('../imgs/garbage.png')}
                                    style={styles.clicktoEditImg}> 
                              </Image>      
                              <Text style={styles.clicktoEditText}>
                              Drag here to Remove 
                             </Text>  
                                
                  </Image>
             </View> 
            
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
        height: "10%",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
     
 //86     
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
titlePart3Text:{
    marginTop: "7%",
    fontFamily: "Futura"
},
    
    
    
homeButText:{
          
           height:25,
           top: 5, 
           fontSize: 20,
           fontWeight: 'bold',
            fontFamily: "Futura"
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
         top:"10%",
         height:"90%",
         width:"65%",
         bottom:0,
        
       
     
  }, 
sidedivPart4:{
        
   
 
         width:"100%",
    
  }, 
    
sidedivPart3:{
        
    
        
         width:"100%",
    
  }, 

    
    
sidedivPart2:{
        
  
         width:"100%",
    
  },  
    
sidedivEdit:{  
         height:"100%",
         width:"100%",
       
  },      
 sidedivPart1:{
  
         width:"100%",
  },   
    
  sidedivPart1Img:{
       
          marginLeft:"18%",
           height:50,
          width:"72%",
     flexDirection: 'row',
  
  },  
       clicktoEditImg:{
           marginTop:5,
          marginLeft:"5%",
           height:40,
          width:40,
          
           
  
  },  
   clicktoEditText:{
         marginTop:18,
         marginLeft:10,
         fontFamily: "Futura",
         width:110,
         fontSize: 12,
         fontWeight: 'bold',
     
  
  }, 
sidedivPart3Img:{
         marginTop:"15%",
         marginLeft:"18%",
           height:"44%",
          width:"72%",
     flexDirection: 'row',
  
  }, 
sidedivPart4Img:{
         marginTop:"5%",
          marginLeft:"18%",
           height:"44%",
          width:"72%",
     flexDirection: 'row',
  
  },     
  
markView:{
        
         top:"10%",
        
         
    
},
    
markView2:{
         
         width:"100%",
       
},    
      
markGalleryDisplay:{
         
         marginBottom:5,
         width:"100%",
    
}, 
    
markGalleryText:{
         marginTop: 10,
         marginBottom: 10,
         fontSize:20,
         width:"80%",
         marginLeft:"10%",
        fontFamily: "Futura"
},
    
markImg22:{
       
         marginLeft:"10%",
         width:"80%",
         
}, 
    markImg:{
       
         width:"100%",
         
        
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
    fontFamily: "Futura"
    
}, 
    
thumbnailContainer: {
    flex: 1,
    padding: 12,
    flexDirection: 'column',
    alignItems: 'center',
  },
    
thumbnailText: {
    fontSize: 13,
    fontFamily: "Futura"
  },
    
thumbnailImage: {
    height: 200,
    width: 200,
    borderRadius: 10,
  }    
    
});