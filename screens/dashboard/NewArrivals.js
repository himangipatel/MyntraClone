import React from "react";
import { Image, Text, View } from "react-native";


export default class NewArrivals extends React.Component {
  render() {
    return (
      <View style={{ height: 450, width: 310, marginLeft: 5, borderWidth: 1, borderColor: '#dddddd', alignItems: 'center' }}>
        <Image source={this.props.imageURL}
          style={{ width: 310, height: 380, resizeMode: 'stretch' }} />
        <View style={{ backgroundColor: '#ffffff', width: 280, height: 150, marginLeft: 15, marginRight: 15, marginTop: -20,alignItems:'center' }}>
          <Image style={{ width: 50, height: 50, alignItems: 'center',justifyContent:'center',alignContent:'center' }}
          source={this.props.logo}/>
          <Text style={{ fontSize: 27, textAlign: 'center', fontFamily: 'stoner' }}>{this.props.offer}</Text>
        </View>
      </View>
    );
  }
}

// require('../../assets/new_arrives_kids.jpg')
// New Arrivals That Are Fit for a Queen!