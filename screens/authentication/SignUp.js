/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput, Button,
    StatusBar, TouchableNativeFeedback
} from 'react-native';



import AsyncStorage from '@react-native-community/async-storage';
import { TextField } from 'react-native-material-textfield';
import Axios from 'axios';



export default class SignUp extends React.Component {
    static navigationOptions = {
        headerLeft: (<View />),
        headerTitle: 'SIGN-UP',
        headerRight: (<View></View>),
        headerTitleStyle: {
            color: '#54c79f',
            fontFamily: 'junegull',
            fontWeight: '500',
            justifyContent: 'space-between',
            textAlign: 'center',
            fontSize: 20

        },
        // headerStyle:{
        //     backgroundColor:'red',
        //     }
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: '',
            password: '',
            passErr: '',
            mobile: '',
            mobileErr: '',
            name: '',
            nameErr: '',
            isLoading: false,
            isLogin: false

        };
    }

    validateEmail = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            this.setState({ emailError: 'Email is not Valid', email: text })
            return false;
        }
        else {
            this.setState({ email: text, emailError: '' })
            console.log("Email is Correct");
            return true;
        }

    }

    validatePassword = (text) => {
        var reg = /(?=.{8,})/;
        if (reg.test(text) === true) {
            this.setState({ passErr: '', password: text })
            return true;
        } else {
            this.setState({ passErr: 'Password is not valid', password: text })
            return false;
        }
    }


    validateMobileNumber = (text) => {
        var reg = /^([0]|\+91)?\d{10}/;
        var test = reg.test(text);
        if (test) {
            this.setState({ mobileErr: '', mobile: text })
            return true;
        } else {
            this.setState({ mobileErr: 'Mobile number is not valid', mobile: text })
            return false;
        }
    }

    async register(email, password, mobile, name) {
        this.props.navigation.navigate('Dashboard');

        // if (!this.validateEmail(email)) {

        // } else if (!this.validatePassword(password)) {

        // } else if (!this.validateMobileNumber(mobile)) {

        // } else if (name === '') {
        //     alert(name)
        //     this.setState({ nameErr: 'Name is Empty' })
        // } else {
        //     this.changeLoader(true)
        //     let isLogin =await this.callRegisterAPI(email, password, mobile, name)
        //     if(isLogin){
        //         this.props.navigation.navigate('Dashboard');
        //     }

        // }
    }

    async callRegisterAPI(email, password, mobile, name) {
        Axios.post('http://192.168.11.86:8080/register', {
            name: name,
            email: email,
            deviceType: 'android',
            password: password
        })
            .then(function (response) {
                this.changeLoader(false)
                console.log(response.data);
                if (response.data.isSuccess) {
                    // this.props.navigation.navigate('Dashboard');
                    this.setState({ isLogin: true })
                    // await AsyncStorage.setItem('isLogin', true);
                    return true;
                } else {
                    alert(response.message)
                }

            })
            .catch(function (error) {
                console.log(error);
                this.changeLoader(false)
            });
    }
    
    changeLoader(isVisible) {
        this.setState({
            isLoading: isVisible
        })
    }

    render() {
        let { phone } = this.state;

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            );

        }


        return (
            <ScrollView>
                <View style={styles.container}>

                    <TextField
                        style={styles.textInput}
                        label='Email address*'
                        onChangeText={(text) => this.validateEmail(text)}
                        error={this.state.emailError} />

                    <TextField
                        style={styles.textInput}
                        label='Password*'
                        error={this.state.passErr}
                        onChangeText={(text) => this.validatePassword(text)}

                    />


                    <TextField
                        style={styles.textInput}
                        label='Mobile number*'
                        error={this.state.mobileErr}
                        onChangeText={(text) => this.validateMobileNumber(text)}
                    />

                    <TextField
                        style={styles.textInput}
                        label='Full Name*'
                        onChangeText={(text) => this.setState({ name: text, nameErr: '' })}
                        error={this.state.nameErr} />

                    <View style={styles.alternativeLayoutButtonContainer}>

                        <View style={[{ width: "100%" }]}>
                            <Button
                                title="CREATE ACCOUNT"
                                color="#54c79f"
                                onPress={() => { this.register(this.state.email, this.state.password, this.state.mobile, this.state.name) }}
                                style={styles.buttonStyle}
                            />
                        </View>
                    </View>

                </View>
            </ScrollView>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    },
    textInput: {
        // alignSelf: 'stretch',
        // marginLeft: 10,
        // marginRight: 10,
        // marginTop: 10,
        // borderBottomColor: '#DCDCDC',
        // borderBottomWidth: 2     // Add this to specify bottom border thickness
    },
    textStyle: {
        color: 'white',
    },
    alternativeLayoutButtonContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 50,
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        borderColor: '#54c79f',
        backgroundColor: '#54c79f'
    },
})
