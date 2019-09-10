import React, { Component } from 'react'
import { ImageBackground, Dimensions, StyleSheet, TouchableOpacity, View, Text, ToastAndroid, ActivityIndicator } from 'react-native';
import { Icon } from "react-native-elements";
import BoxTextField from './BoxTextField';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import Axios from 'axios';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import AsyncStorage from '@react-native-community/async-storage';



export default class Login extends React.Component {

    async componentWillMount() {
        const userToken = await AsyncStorage.getItem('@isLogin');

        if (JSON.parse(userToken)) {
            this.props.navigation.replace('Dashboard');
        }
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        //  this.props.navigation.replace(userToken ? 'Dashboard' : 'Login');
    }


    state = {
        email: '',
        emailError: '',
        password: '',
        passErr: '',
        isLoading: false,
        isLogin: false
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

    async login(email, password) {

        if (!this.validateEmail(email)) {
            ToastAndroid.show('Email is not Valid', ToastAndroid.SHORT)
        } else if (!this.validatePassword(password)) {
            ToastAndroid.show('Password is not Valid', ToastAndroid.SHORT)
        } else {
            this.loadingButton.showLoading(true);
            let isLogin = await this.callLoginAPI(email, password) // with asysc function
            this.loadingButton.showLoading(false);
            if (isLogin) {
                await AsyncStorage.setItem('@isLogin', JSON.stringify(true))
                this.props.navigation.replace('Dashboard');
            } else {
                ToastAndroid.show('Login unsuccessfully...please try again...!!', ToastAndroid.SHORT)
            }

            // with callback
            // this.callLoginApi(email, password, function (response) {
            //     if (response.isSuccess) {
            //         this.props.navigation.navigate('Dashboard');
            //         ToastAndroid.show('Login successfully', ToastAndroid.SHORT)
            //     } else {
            //         ToastAndroid.show('Login unsuccessfully...please try again...!!', ToastAndroid.SHORT)
            //     }
            // })

        }
    }

    callLoginAPI = async (email, password) => {
        try {
            const response = await Axios.post('http://192.168.11.86:8080/login', {
                email: email,
                password: password
            });
            if (response.data.isSuccess) {
                // this.props.navigation.navigate('Dashboard');
                // await AsyncStorage.setItem('isLogin', true);
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }


    }

    callLoginApi = (email, password, callback) => {
        Axios.post('http://192.168.11.86:8080/login', {
            email: email,
            password: password
        }).then(res => {
            this._storeData();
            console.log(res.data);
            callback(res.data)
        }).catch(error => {
            console.log(error);
        });
    }

    changeLoader(isVisible) {
        this.setState({
            isLoading: true
        })
    }

    render() {

        return (
            <ScrollView>
                <View>
                    <ImageBackground
                        style={styles.container}
                        imageStyle={{ opacity: 0.4 }}
                        source={require('../../assets/bg_login.jpeg')}>

                        <ActivityIndicator animating={this.state.isLoading} />


                        <BoxTextField
                            hint='Email'
                            icon="email"
                            keyboardType='email-address'
                            onChangeText={(text) => this.setState({ email: text, emailError: '' })} />

                        <BoxTextField
                            hint='Password'
                            icon="vpn-key"
                            keyboardType='visible-password'
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({ password: text, passErr: '' })} />

                        <View style={{ flexDirection: 'row', alignContent: 'center', marginTop: 10, marginBottom: 20 }}>
                            <Text style={{ color: '#fff' }}>Don't have account??</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                                <Text style={{ color: '#fff', textDecorationLine: 'underline', marginLeft: 7 }}>Create Account</Text>
                            </TouchableOpacity>
                        </View>

                        {/* <TouchableOpacity onPress={() => this.login(this.state.email, this.state.password)}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#172C4B', '#5F4B9B']} style={styles.linearGradient}>
                                <Text style={styles.buttonText}>SIGN IN </Text>
                            </LinearGradient>
                        </TouchableOpacity> */}
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#172C4B', '#5F4B9B']} style={styles.linearGradient}>
                            <AnimateLoadingButton
                                ref={c => (this.loadingButton = c)}
                                width={300}
                                height={50}
                                title="SIGN IN"
                                backgroundColor='transparent'
                                titleFontSize={16}
                                titleColor="rgb(255,255,255)"
                                borderRadius={4}
                                onPress={() => this.login(this.state.email, this.state.password)}
                            />
                        </LinearGradient>

                    </ImageBackground >
                </View>
            </ScrollView >

        )
    }
}

const styles = StyleSheet.create({

    container: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000'
    },
    linearGradient: {
        borderRadius: 5,
        // width: Dimensions.get('window').width,
        width: 350,
        marginTop: 20,
        // marginLeft:40,
        // marginRight:40
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});