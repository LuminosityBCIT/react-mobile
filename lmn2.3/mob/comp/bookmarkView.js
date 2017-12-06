import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Button, TouchableOpacity, TextInput, WebView, ScrollView, NativeModules, LayoutAnimation, Picker} from 'react-native';




const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);


 
  export default class BookmarkView extends React.Component {
  state = {
    t11: 0,
    l11: 130,
    t22: -15,
    l22: 70,
    t33: -10,
    l33: 25,
    t44: 10,
    l44: 0,
    w: 40,
    h: 40,
    cloudbuts:true,
      
    burgerl: "5%",
    burgerw: "90%",
    sideDivl: "-60%",
    burgerbuts:true,
  };


    cloudOnPress = () => {
    
    if(this.state.cloudbuts == true) { 
    this.state.cloudbuts = false;    
    LayoutAnimation.spring();
    this.setState({t11: this.state.t11 = 112, l11: this.state.l11 = 113})
    this.setState({t22: this.state.t22 = 71, l22: this.state.l22 = 113})
    this.setState({t33: this.state.t33 = 30, l33: this.state.l33 = 113})
    this.setState({t44: this.state.t44 = -10, l44: this.state.l44 = 113})
    this.setState({w: this.state.w = 0, h: this.state.h = 0})
    }
    else { 
    this.state.cloudbuts = true;    
    LayoutAnimation.spring();
    this.setState({t11: this.state.t11 = 0, l11: this.state.l11 = 130})
    this.setState({t22: this.state.t22 = -15, l22: this.state.l22 = 70})
    this.setState({t33: this.state.t33 = -10, l33: this.state.l33 = 25})
    this.setState({t44: this.state.t44 = 10, l44: this.state.l44 = 0})
    this.setState({w: this.state.w = 40, h: this.state.h = 40})
    }  
  }
    
    
    burgerOnPress = () => {
    
    if(this.state.burgerbuts == true) { 
    this.state.burgerbuts = false;    
    LayoutAnimation.spring();
    this.setState({burgerl: this.state.burgerl = "50%"})
    this.setState({burgerw: this.state.burgerw = "45%"})
    this.setState({sideDivl: this.state.sideDivl = "-15%"})
    }
    else { 
    this.state.burgerbuts = true;    
    LayoutAnimation.spring();
    this.setState({burgerl: this.state.burgerl = "5%"})
    this.setState({burgerw: this.state.burgerw = "90%"})
    this.setState({sideDivl: this.state.sideDivl = "-65%"})
    }  
  }
      callFun = () =>
  {
    alert("Image Clicked!!!");
  }
    
   
render() {
    
  
    
    return (
        
                        <View 
                        style={[styles.markView, {width: this.state.burgerw, left: this.state.burgerl}]} >  
                               <ScrollView style={styles.markView2}>
                               <View style={styles.markGalleryDisplay}>
                                  <Text style={styles.markGalleryText}>
                                   BCIT </Text>
                                  <Image style={styles.markImg}
                                   source={require('../img/D2L.png')}/>    
                               </View>
                               <View style={styles.markGalleryDisplay}>
                                  <Text style={styles.markGalleryText}>
                                   Invision </Text>
                                   <Image style={styles.markImg}
                                    source={require('../img/invisionapp.png')}/>   
                               </View>
                               <View style={styles.markGalleryDisplay}>
                                  <Text style={styles.markGalleryText}>
                                   Codepen </Text>
                                  <Image style={styles.markImg}
                                   source={require('../img/Codepen.png')}/>   
                               </View>           
                               </ScrollView>
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
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
        backgroundColor:"white",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
},
 
homeBut:{
        width:100,
        height:24,
},    
    
    
homeBut2:{
        width:100,
        height:24,
        top:22,  
},

     
    
butImg2:{
         position: "relative",
         right:70,
         top:20,
         height:32,
         width:32,
},
    
butImg:{ 
         height:32,
         width:32,    
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
  
containerHead:{
         position: 'absolute',
         bottom:0,
         right:0,  
         height:175,
         width:175,   
},
    
butCloud0:{
         top:0,
         left:0,
         height:80,
         width:70, 
},
    
butCloud1:{
         top:0,
         left:0,
         height:40,
         width:40,    
},
       
butCloud2:{
         top:0,
         left:0,
         height:40,
         width:40,    
},
    
butCloud3:{
         top:0,
         left:0,
         height:40,
         width:40,    
},
    
butCloud4:{ 
         top:0,
         left:0,
         height:40,
         width:40,   
},
    
butCloud00:{
        opacity: 1.0,
         bottom:70,
         left:100,
         height:80,
         width:70, 
},
    
butCloud11:{
         position: "relative",
         top:0,
         left:130,
         height:40,
         width:40,   
},
    
butCloud22:{
         position: "relative",
         top:-15,
         left:70,
         height:40,
         width:40,    
},
    
butCloud33:{
         position: "relative",
         top:-10,
         left:25,
         height:40,
         width:40,    
},
    
butCloud44:{
         top:10,
         left:0,
         height:40,
         width:40,   
},
    
containerTitleItems:{
         top: "-15%",    
         flexDirection:'row', 
},
   
sidediv:{
         position: 'absolute',
         top:70,
         height:"100%",
         width:"60%",
         bottom:0,
         backgroundColor:'white',
         shadowColor: '#000',
         shadowOffset: { width: 5, height: 0 },
         shadowOpacity: 0.1,
         shadowRadius: 10,
        
  }, 
  
markView:{
         top:20,
         height:"80%",
         alignItems: 'left',
         flexDirection: 'column',
},
    
markView2:{
         flexDirection: 'column',
         height:"100%",
         width:"100%",
         left:0,
},    
      
markGalleryDisplay:{
         height:"30%",
         width:"100%",
        
}, 
    
markGalleryText:{
         marginTop: 10, 
},
    
markImg:{
         width:"100%",
         height:180,
          marginTop: 10, 
         marginBottom:30,
}, 
    
sidedivPic:{
        left:"20%",
        width:"80%",
},     
    
    
});



//ScrollableView
//TouchableOpacity
