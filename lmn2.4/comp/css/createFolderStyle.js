import {StyleSheet} from 'react-native';

module.exports = StyleSheet.create({

folderDropDown: {
       width: "80%"
},    

containerHead:{
         position: 'absolute',
         bottom:0,
         right:0,  
         height:175,
         width:175,   
},
    
containerAdd: {
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
        fontFamily: "Futura"
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

containerDiv: {  
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
    
    
addChoose: {
       marginTop: 4, 
       marginLeft: 0,
       width: 70,
       height: 14,
       margin:10,
},      
    
addMarkText: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor:"white",
        marginTop:25,
        marginBottom:10,
        fontFamily: "Futura"
},
    
addMarkPic1: {
      marginTop: 20,
       width: "80%",
       height: 50,
       flexDirection: 'row',
},
    
addMarkPic: {
       left:0,
       width: "78%",
       height: "100%",
       marginBottom:20,
       borderRadius: 4,
       borderWidth: 2,
       borderColor: '#787878',
},    
    
    
addTitle: {
       marginTop: 5, 
       marginLeft: 0,
       width: 50,
       height: 40,
       margin:10,
},       
    
addFolder: {
       width: 40,
       height: 30,
       margin:10,
       marginLeft: 0,
},   
    
addSubFolder: {
       width: 40,
      height: 22,
       margin:10,
     marginLeft: 0,
},     
    
    
    
addMarkInp: {  
       margin:5,
       marginTop:10,
       color: 'gray',
}, 

addMarkInp2: {
       width: "78%",
       height: 50,
       marginBottom:20,
       borderRadius: 4,
        borderWidth: 2,
        borderColor: '#787878',
},     

containerDivButs: {
       
        marginTop:40,
        width: "90%",
        height: "10%",
        top:"28%"
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
        fontFamily: "Futura"
}       
    
});