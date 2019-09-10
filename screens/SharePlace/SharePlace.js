import React, { Component } from 'react'
import { View, Text } from 'native-base';
import PickImage from '../component/PickImage'
import { TouchableOpacity } from 'react-native';
import PickLocation from '../component/PickLocation';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';


export default class SharePlace extends React.Component {
    state = {
        location: {
            value: null,
            valid: false
        }
    }

    locationPickedHandler = location => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            }
        })
    }

    logout = async() => {
        await AsyncStorage.setItem('@isLogin', JSON.stringify(false))
       //this.props.navigation.replace('Login');
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <TouchableOpacity onPress={() =>this.logout()}>
                        <Text>Log out</Text>
                    </TouchableOpacity>
                    <PickImage />
                    <PickLocation onLocationPick={this.locationPickedHandler} />
                </ScrollView>
            </View>
        )
    }
}