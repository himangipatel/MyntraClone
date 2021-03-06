import { Text, View } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { signOut } from '../utils/AppUtils';
import { saveAysncData } from '../utils/AsyncUtil';
import PickImage from './PickImage';
import PickLocation from './PickLocation';

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
