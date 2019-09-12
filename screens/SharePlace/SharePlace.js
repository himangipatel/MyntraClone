import React, {Component} from 'react';
import {View, Text} from 'native-base';
import PickImage from './PickImage';
import {TouchableOpacity} from 'react-native';
import PickLocation from './PickLocation';
import {ScrollView} from 'react-native-gesture-handler';
import { saveAysncData} from '../utils/AsyncUtil'
import { signOut } from '../utils/AppUtils';

export default class SharePlace extends React.Component {
  state = {
    location: {
      value: null,
      valid: false,
    },
  };

  locationPickedHandler = location => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true,
          },
        },
      };
    });
  };

  logout = async () => {
    saveAysncData('@isLogin', JSON.stringify(false))
    signOut();
  };

  render() {
    return (
      <View>
        <ScrollView>
          <TouchableOpacity onPress={() => this.logout()}>
            <Text>Log out</Text>
          </TouchableOpacity>
          <PickImage />
          <PickLocation onLocationPick={this.locationPickedHandler} />
        </ScrollView>
      </View>
    );
  }
}
