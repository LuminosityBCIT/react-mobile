import {StyleSheet, Dimensions } from 'react-native';

module.exports = StyleSheet.create({

containerSearch: {
        position:"absolute",
        top:0,
        left:0,
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
},

containerRemove:{
        position:"absolute",
        top:0,
        left:0,
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex:-19,      
},
    
containerSearchDiv: {  
        position: "absolute",
        width: "90%",
        height: 450,
        top:"5%",
        backgroundColor:"white",
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "rgba(255, 255, 255, 0.3)",
},
    
searchText: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor:"white",
        marginTop:25,
        marginBottom:10,
},
    
  
searchPic1: {
       marginTop: 10,
       marginBottom: 15,
       width: "70%",
       height: 50,
       flexDirection: 'row',
},

searchInp2: {
       flexDirection: 'row',
       width: "100%",
       height: 50,
       top:"0%",
       marginBottom:20,
       borderRadius: 4,
        borderWidth: 2,
        borderColor: '#787878',
}, 

searchInp: {  
       width: "80%",
       margin:5,
       marginTop:10,
       color: 'gray',
},     
    
     
searchBut: {
    
       marginTop: 8, 
       marginLeft: 10,
       width: 30,
       height: 30,
    
}, 
    
searchFolderPic1: {
      marginLeft:"10%",
      marginTop: 0,
       width: "80%",
       height: 50,
       flexDirection: 'row',
},    
    
searchMyFolder: {
       width: 30,
       height: 21,
       margin:10,
       marginLeft: 0,
},     
    
searchFolderText: {
        fontSize: 15,
//        fontWeight: 'bold',
        backgroundColor:"white",
        margin:10,     
},    
    
searchFolderText2: {
        fontSize: 15,
//        fontWeight: 'bold',
        backgroundColor:"white",
        marginTop:10,     
},    
       
searchMarkImg:{
         marginLeft:"20%",
         width:"60%",
         height:120,
          marginTop: 10, 
          marginBottom: 10, 
},     
    
 searchDisplay:{
         width:"80%",
         height:"50%",
         left:"6%",
         alignItems: 'center',
},        
    
 searchDisplay2:{
         width:"100%",
         height:"100%", 
         flexDirection: 'column',
      
},      
    
containerDivButs: {
        marginTop:5,
        top: "1%",
        width: "90%",
        height: "10%",
        alignItems: 'center',

},

containerDivBut1: {
      
        top:0,
      
        backgroundColor:"#FF6633",
        width: "30%",
        height: "100%",
        borderRadius: 10,
},
    
containerDivBut2: {
        position: "relative",
        top:"-100%",
        left:"60%",
        backgroundColor:"#3399FF",
        width: "30%",
        height: "100%",
        borderRadius: 10,
}, 
    
containerDivButText:{
        fontSize: 20,
        fontWeight: 'bold',
        color:"white",
        alignSelf:"center",
        marginTop: 9, 
},
    
markView:{
         top:40,
         height:"80%",
       
         flexDirection: 'column',
},
    
markView2:{
         flexDirection: 'column',
         height:"100%",
         width:"100%",
         left:0,
         marginLeft: 15
},    
      
markGalleryDisplay:{
         height:"30%",
         width:"100%",
        
}, 
    
markGalleryText:{
         marginTop: 10, 
},
    
markImg:{
         width:"90%",
         height:170,
          marginTop: 10, 
         marginBottom:30,
}, 
        
    
});