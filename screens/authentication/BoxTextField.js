import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Icon } from "react-native-elements";

export default class BoxTextField extends React.Component {
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.SectionStyle}>

                    {/* <Image source={require('./Images/ic_person.png')} style={styles.ImageStyle} /> */}
                    <Icon type='' name={this.props.icon} color='#808080' style={{ alignItems: 'center', justifyContent: 'center' }} />
                    <TextInput
                        style={{ flex: 1, marginStart: 20 }}
                        placeholder={this.props.hint}
                        
                        keyboardType={this.props.keyboardType}
                        onChangeText={this.props.onChangeText}
                    />

                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        width: '90%'
    },

    SectionStyle: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth: .5,
        borderColor: '#fff',
        height: 50,
        borderRadius: 5,
        margin: 5,
        padding: 5
    },

    ImageStyle: {
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

});