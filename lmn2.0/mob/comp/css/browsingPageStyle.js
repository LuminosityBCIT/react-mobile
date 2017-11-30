import {StyleSheet, WebView, Dimensions } from 'react-native';

module.exports = StyleSheet.create({

   containerGoogleTitle: {
        zIndex: 5,
        position: 'absolute',
        top:0,      
        width: '100%',
        height: 86,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
        flex: 4,
      
},    
    
searchGoogleCtrl: {
     
       marginBottom: 0,
       width: "73%",
       height: 40,
       flexDirection: 'row',
},

searchGoogleInp: {
       flexDirection: 'row',
       width: "100%",
       height: 40,
       marginBottom:20,
       borderRadius: 4,
        borderWidth: 2,
        borderColor: '#AFAFAF',
}, 

searchGoogleInp2: {  
       width: "80%",
       margin:5,
       marginTop:10,
       color: 'gray',
},     
    
     
refreshBut: {
       
       top:12,
       left:12,
       width: 22,
       height: 22,
    
},  

refreshBut11: {
    
       marginTop: -5, 
       marginLeft: 5,
       width: 45,
       height: 45,
      
    
},    
    
 
     bBut11: {
    
//       backgroundColor:"blue",
       width: 40,
       height: 45,
      
    
},  
 fBut11: {
    
//       backgroundColor:"red",
       width: 40,
       height: 45,
      
    
},    
    
     bBut: {
    
       top:11,
       left:5,
       width: 22,
       height: 22,
      
    
},  
 fBut: {
       left:5,
       top:11,
       width: 22,
       height: 22,
      
    
},     

   containerGoogle: {
        //overflow:{this.props.browserVisibility},
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
    
containerGoogleDiv: {  
        top:0,
        width: Dimensions.get("window").width
}, 

});