import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Button } from 'react-native-elements'

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

  // snapPhoto = async () => {
  //     console.log("snap")
  //     let photo = await takePictureAsync();
  //     console.log(photo)
  // };

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
          <Camera ref={camera => this.camera = camera} style={{ flex: 1 }} type={this.state.type} flashMode={this.state.flashMode}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
            <Button
            onPress={() => {
              this.setState({
                type:
                  this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
              })}}
              title="Flip"/>

            <Button
            onPress={() => {
              this.setState({
                flashMode:
                  this.state.flashMode === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off,
              })}}
            title="Flash"/>

            <Button
            onPress={this.snapPicture.bind(this)}
            title="Capture"/>


              {/* <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
              </TouchableOpacity> */}
            </View>
          </Camera>
        </View>
      );
    }
  }
}