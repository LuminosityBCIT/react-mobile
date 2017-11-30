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

containerSearchDiv: {  
       
        width: "90%",
        height: Dimensions.get("window").height*0.7,
        backgroundColor:"white",
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#787878',
},
    
searchText: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor:"white",
        marginTop:40,
        marginBottom:20,
},
    
  
searchPic1: {
       marginTop: 10,
       marginBottom: 20,
       width: "80%",
       height: 50,
       flexDirection: 'row',
},

searchInp2: {
       flexDirection: 'row',
       width: "100%",
       height: 50,
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
         width:"100%",
         height:"60%",
        alignItems: 'center',
},        
    
 searchDisplay2:{
         width:"100%",
         height:"100%", 
         flexDirection: 'column',
      
},      
    
containerDivButs: {
        top:"5%",
        width: "90%",
        height: "15%",
},

containerDivBut1: {
        position: "relative",
        top:0,
        left:"10%",
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
}           
        
    
});