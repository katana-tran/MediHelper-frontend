import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Button } from 'react-native-elements'
import { Ionicons, Entypo } from '@expo/vector-icons'

export default class MyCamera extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off,
    photoCaptures: []

  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snapPicture = async () => {
    console.log("SNAP")
    if (this.camera) {
      try {
        console.log("this camera")
        const options = { quality: 0.5, base64: true };
        const photoData = await this.camera.takePictureAsync(options)

        console.log(photoData.uri);
        this.props.onPictureCaptured(photoData)
        this.setState((prevState)=>({...prevState,
          photoCaptures: [photoData, ...prevState.photoCaptures] }), () => console.log(this.state))
        // this.setCameraCaptureVisible(false);
      } catch (e) {
       // This logs the error
        console.log(e)
      }
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera 
          ref={camera => this.camera = camera} 
          style={{ flex: 1 }} 
          type={this.state.type} 
          flashMode={this.state.flashMode}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
            {/* <Button
            
              title="Flip"/> */}
          <View style={{
            flex: 1, 
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end'}}>
              {/* <Button
              type="clear"
              icon={<Ionicons
                name="ios-reverse-camera"
                color="white"
                size={60}
                />}
              onPress={() => {
              this.setState({
                type:
                  this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
              })}}>   
              </Button> */}

              <Button
              type="solid"
              buttonStyle={{color:"black"}}
              onPress={this.snapPicture.bind(this)}
              icon={<Entypo
                        name="camera"
                        color="white"
                        size={60}
                    />}>
              </Button>

              {/* <Button
              type="clear"
              icon={<Ionicons
                name={this.state.flashMode == Camera.Constants.FlashMode.off ? "md-flash" : 'md-flash-off'}
                color="white"
                size={60}
              />}
              onPress={() => {
                this.setState({
                  flashMode:
                    this.state.flashMode === Camera.Constants.FlashMode.off
                      ? Camera.Constants.FlashMode.on
                      : Camera.Constants.FlashMode.off,
                })}}>
                </Button> */}
          </View>
         
            </View>
          </Camera>
        </View>
      );
    }
  }
}