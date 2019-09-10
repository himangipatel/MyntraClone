import React from 'react';
import { View, Image,Text } from 'react-native';


export default class Category extends React.Component {
    render() {
        return (
            <View style={{ height: 100, width: 120, marginLeft: 20, borderWidth: 1, borderColor: '#dddddd' }}>
                {/* <View style={{ flex:2 }}> */}
                    <Image source={this.props.imageURL}
                        style={{ flex: 1, width: 120, height: 100, resizeMode: 'cover' }} />
                {/* </View> */}
                {/* <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}> */}
                    <Text style={{marginTop:2,marginBottom:2,alignItems:'center',justifyContent:'center',textAlign:'center'}}>{this.props.title}</Text>
                {/* </View> */}
            </View>
        )
    }
}

