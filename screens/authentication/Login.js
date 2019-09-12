import React, {Component} from 'react';
import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ToastAndroid,
  ActivityIndicator,
  Image,
} from 'react-native';
import BoxTextField from './BoxTextField';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import Axios from 'axios';
import AnimateLoadingButton from 'react-native-animate-loading-button';

import {GoogleSignin} from 'react-native-google-signin';
import {signOut, googleSignIn} from '../utils/AppUtils';
import {API} from '../utils/APIUtils';
import {storeUserInfor} from '../utils/AsyncUtil';
import {validateEmail, validatePassword} from '../utils/Validator';

export default class Login extends React.Component {
  state = {
    email: '',
    emailError: '',
    password: '',
    passErr: '',
    isLoading: false,
    isLogin: false,
  };

  async validateEmailPassword(email, password) {
    if (validateEmail(email)) {
      this.setState({email: email, emailError: ''});
      console.log('Email is Correct');
    } else if (!validateEmail(email)) {
      console.log('Email is Not Correct');
      this.setState({emailError: 'Email is not Valid', email: email});
      ToastAndroid.show('Email is not Valid', ToastAndroid.SHORT);
      return;
    }

    if (validatePassword(password)) {
      this.setState({passErr: '', password: password});
    } else if (!validatePassword(password)) {
      this.setState({passErr: 'Password is not valid', password: password});
      ToastAndroid.show('Password is not Valid', ToastAndroid.SHORT);
      return;
    }
    this.callLoginAPI(email, password);
  }

  callLoginAPI = async (email, password) => {
    this.loadingButton.showLoading(true);
    let response = await this.loginWithEmailPassword(email, password);
    this.loadingButton.showLoading(false);
    if (response.isSuccess) {
      storeUserInfor(response.user);
      this.props.navigation.replace('Dashboard');
    } else {
      ToastAndroid.show(response.message, ToastAndroid.SHORT);
    }
  };

  loginWithEmailPassword = async (email, password) => {
    try {
      const response = await Axios.post(API.Login, {
        email: email,
        password: password,
        loginType: 'email-password',
      });
      console.log(response);
      return response.data;
    } catch (e) {
      this.loadingButton.showLoading(false);
      console.log(e);
    }
  };

  loginWithGmail = async googleID => {
    try {
      const response = await Axios.post(API.Login, {
        googleID: googleID,
        loginType: 'google-signin',
      });
      return response.data;
    } catch (e) {
      signOut();
      this.loadingButton.showLoading(false);
      console.log(e);
      alert(e);
    }
  };

  googleSignIn = async () => {
    const userInfo = await googleSignIn();
    console.log(userInfo);
    if (userInfo != null) {
      this.loadingButton.showLoading(true);
      let response = await this.loginWithGmail(userInfo.user.id);

      this.loadingButton.showLoading(false);
      if (response != null) {
        if (response.isSuccess) {
          storeUserInfor(response.user);
          this.props.navigation.replace('Dashboard');
        } else {
          ToastAndroid.show(response.message, ToastAndroid.SHORT);
          signOut();
        }
      }
    }
  };

  render() {
    GoogleSignin.configure();
    return (
      <ScrollView>
        <View>
          <ImageBackground
            style={styles.container}
            imageStyle={{opacity: 0.4}}
            source={require('../../assets/bg_login.jpeg')}>
            <ActivityIndicator animating={this.state.isLoading} />

            <BoxTextField
              hint="Email"
              icon="email"
              keyboardType="email-address"
              onChangeText={text =>
                this.setState({email: text, emailError: ''})
              }
            />

            <BoxTextField
              hint="Password"
              icon="vpn-key"
              keyboardType="visible-password"
              secureTextEntry={true}
              onChangeText={text =>
                this.setState({password: text, passErr: ''})
              }
            />

            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                marginTop: 10,
                marginBottom: 20,
              }}>
              <Text style={{color: '#fff'}}>Don't have account??</Text>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text
                  style={{
                    color: '#fff',
                    textDecorationLine: 'underline',
                    marginLeft: 7,
                  }}>
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>

            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#172C4B', '#5F4B9B']}
              style={styles.linearGradient}>
              <AnimateLoadingButton
                ref={c => (this.loadingButton = c)}
                width={300}
                height={50}
                title="SIGN IN"
                backgroundColor="transparent"
                titleFontSize={16}
                titleColor="rgb(255,255,255)"
                borderRadius={4}
                onPress={() =>
                  this.validateEmailPassword(this.state.email, this.state.password)
                }
              />
            </LinearGradient>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={signOut}>
                <Image
                  style={{width: 40, height: 40, marginTop: 15}}
                  source={require('../../assets/facebook.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={this.googleSignIn}>
                <Image
                  style={{width: 40, height: 40, marginTop: 15, marginLeft: 30}}
                  source={require('../../assets/gmail.png')}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  linearGradient: {
    borderRadius: 5,
    width: 350,
    marginTop: 20,
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
