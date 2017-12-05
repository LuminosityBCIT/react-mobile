import React, { Component } from "react";
import { View, Text, StyleSheet, Image, PanResponder, Animated, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'column',
    alignItems: 'center',
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
});

//
//  All Drag and Drop Reference
//  https://blog.reactnativecoach.com/creating-draggable-component-with-react-native-132d30c27cb0
//
class BookMarkRowComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDraggable: true,
      dropAreaValues: null,
      pan: new Animated.ValueXY(),
      opacity: new Animated.Value(1)
    };
  }

  componentWillMount() {
    this._val = { x:0, y:0 }
    this.state.pan.addListener((value) => this._val = value);

    this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gesture) => true,
        onPanResponderGrant: (e, gesture) => {
          this.state.pan.setOffset({
            x: this._val.x,
            y:this._val.y
          })
          this.state.pan.setValue({ x:0, y:0})
        },
        onPanResponderMove: Animated.event([ 
          null, { dx: this.state.pan.x, dy: this.state.pan.y }
        ]),
        onPanResponderRelease: (e, gesture) => {
          if (this.props.isEditing)
          {

            this.props.isDropZone(gesture, this.props.obj)
            
            //
            //  Animation reference
            //  https://moduscreate.com/blog/animated_drag_and_drop_with_react_native/
            //
            Animated.spring(            //Step 1
                this.state.pan,         //Step 2
                {toValue:{x:0,y:0}}     //Step 3
            ).start();
          }
        }
      });
  }

  openBrowser = () => {
    this.props.openBrowser(this.props.url);
  }

  render() {
    
    var panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    if (!this.props.isEditing)
    {
      panStyle = null;
    }

    return (
       <Animated.View
        {...this.panResponder.panHandlers}
        style={[panStyle, styles.markGalleryDisplay]} onLayout={this.checkVisible}>
            <Text style={styles.markGalleryText}>
                {this.props.obj.title}
            </Text>            
            <TouchableOpacity
            style={styles.markImg22}
            onPress={this.openBrowser}
            activeOpacity={1}>
                <Image style={styles.markImg}
                source={{uri:this.props.url}}/>
            </TouchableOpacity> 
        </Animated.View>
    );
  }
}

export default BookMarkRowComponent