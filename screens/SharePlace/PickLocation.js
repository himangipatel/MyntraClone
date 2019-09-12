// import MapView from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';


export default class PickLocation extends React.Component {
    state = {
        focusedLocation: {
            latitude: 23.0120,
            longitude: 72.5108,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
        },
        locationChoosen: false
    }

    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude,
        })
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude,

                },
                locationChoosen: true
            }
        })
        this.props.onLocationPick({
            latitude: coords.latitude,
            longitude: coords.longitude
        })
    }

    getLocationHandler = () => {
        console.log('hi')
        Geolocation.getCurrentPosition(pos => {
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            };
            this.pickLocationHandler(coordsEvent);
        },
            error => {
                console.log(JSON.stringify(error));
                alert(error.message)
                alert('Fetching the position failed,please pick one manually!')
            })
    }

    render() {
        let marker = null;
        if (this.state.locationChoosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
        }
        return (
            <View style={styles.container}>
                {/* <MapView
                    style={styles.map}
                    initialRegion={this.state.focusedLocation}
                    // region={this.state.focusedLocation} //without animation
                    ref={ref => this.map = ref} //with animation
                    onPress={this.pickLocationHandler}>
                    {marker}
                </MapView> */}
                <View style={styles.placeHolder}>
                    <Text>Maps</Text>
                </View>
                <View style={styles.button}>
                    <Button
                        title='Locate me'
                        onPress={this.getLocationHandler} />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    button: {
        margin: 8
    },
    map: {
        // borderWidth:1,
        // borderColor:'black',
        // backgroundColor:'#ffffff',
        // width:'80%',
        // height:150
        width: '100%',
        height: 250
    }
})
//https://github.com/superapp/react-native-location-view

// npm install @react-native-community/geolocation --save


// react-native link @react-native-community/geolocation

// npm install react-native-maps --save-exact
// yarn add react-native-maps -E
// https://github.com/react-native-community/react-native-maps/blob/master/docs/installation.md