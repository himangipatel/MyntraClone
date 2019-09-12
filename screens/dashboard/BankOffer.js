import React from "react";
import { Image, Text, View } from "react-native";


export default class BankOffer extends React.Component {
    render() {
        return (
            // <Card
            //     title={null}>
                <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#dddddd',padding:10,marginTop:10}}>
                    <Image source={this.props.imageURL}
                        style={{ flex: 1, width: 120, height: 40, resizeMode: 'cover', alignContent: 'center', justifyContent: 'center' }} />

                    <View
                        style={{ width: 1, height: 45, backgroundColor: '#dddddd', marginLeft: 10, alignContent: 'center', justifyContent: 'center' }} />

                    <Text style={{ width: 160, marginLeft: 10 }}>{this.props.discount}</Text>
                </View>
            // </Card>
        );
    }
}