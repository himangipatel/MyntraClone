import React from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class PickImage extends React.Component {
  state = {
    pickedImage: null
  }

  pickImageHandler = () => {
    const options = {
      title: 'Pick image',
      //  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
        alert('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        alert(response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert('User tapped custom button: ', response.customButton)
      } else {
        const source = { uri: response.uri };
        //alert(response.uri)
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          pickedImage: source,
        });
      }
    });
  }

  render() {

    // if(this.state.pickedImage != null) {
    //   alert(this.state.pickedImage.uri);
    // }

    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image
            source={this.state.pickedImage}
            style={styles.previewImage} 
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Pick Image'
            onPress={this.pickImageHandler}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  }, placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 230
  }, button: {
    margin: 8
  },
  previewImage: {
    width: "100%",
    height: "100%"
}
})