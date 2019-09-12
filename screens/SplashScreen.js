import React, {Component} from 'react';
import Video from 'react-native-video';
import {View, Text} from 'react-native';
import {getAsyncData} from './utils/AsyncUtil';
import {color_green, color_white} from './utils/ColorUtils';
import {font_stoner} from './utils/FontUtils';
import { splash_video } from './utils/Assets';

export default class SplashScreen extends React.Component {
  async componentDidMount() {
    const isUserLogin = await getAsyncData('@isLogin');

    setTimeout(() => {
      if (JSON.parse(isUserLogin)) {
        this.props.navigation.replace('Dashboard');
      } else {
        this.props.navigation.replace('Login');
      }
    }, 1500);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: null,
          height: null,
        }}>
        <Video
          source={splash_video}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: color_green,
            opacity: 0.4,
          }}
          muted={true}
          repeat={true}
          resizeMode="cover"
        />

        <Text
          style={{
            fontSize: 60,
            textAlign: 'center',
            fontFamily: font_stoner,
            color: color_white,
          }}>
          React Native Demo App
        </Text>
      </View>
    );
  }
}
