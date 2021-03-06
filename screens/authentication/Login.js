import Axios from 'axios';
import React from 'react';
import { ActivityIndicator, Dimensions, Image, ImageBackground, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import { ScrollView } from 'react-native-gesture-handler';
import { GoogleSignin } from 'react-native-google-signin';
import LinearGradient from 'react-native-linear-gradient';
import { API } from '../utils/APIUtils';
import { googleSignIn, signOut } from '../utils/AppUtils';
import { bg_login, logo_facebook, logo_gmail } from '../utils/Assets';
import { storeUserInfor } from '../utils/AsyncUtil';
import { color_black, color_purple_dark, color_purple_light, color_transparent, color_white } from '../utils/ColorUtils';
import { create_account, email, password, sign_in } from '../utils/StringUtils';
import { validateEmail, validatePassword } from '../utils/Validator';
import BoxTextField from './BoxTextField';


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
            source={bg_login}>
            <ActivityIndicator animating={this.state.isLoading} />

            <BoxTextField
              hint={email}
              icon="email"
              keyboardType="email-address"
              onChangeText={text =>
                this.setState({email: text, emailError: ''})
              }
            />

            <BoxTextField
              hint={password}
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
              <Text style={{color: color_white}}>Don't have account??</Text>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text style={styles.createAccountText}>{create_account}</Text>
              </TouchableOpacity>
            </View>

            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[color_purple_dark, color_purple_light]}
              style={styles.linearGradient}>
              <AnimateLoadingButton
                ref={c => (this.loadingButton = c)}
                width={300}
                height={50}
                title={sign_in}
                backgroundColor={color_transparent}
                titleFontSize={16}
                titleColor="rgb(255,255,255)"
                borderRadius={4}
                onPress={() =>
                  this.validateEmailPassword(
                    this.state.email,
                    this.state.password,
                  )
                }
              />
            </LinearGradient>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={signOut}>
                <Image
                  style={{width: 40, height: 40, marginTop: 15}}
                  source={logo_facebook}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={this.googleSignIn}>
                <Image
                  style={{width: 40, height: 40, marginTop: 15, marginLeft: 30}}
                  source={logo_gmail}
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
    backgroundColor: color_black,
  },
  linearGradient: {
    borderRadius: 5,
    width: 350,
    marginTop: 20,
  },
  createAccountText: {
    color: color_white,
    textDecorationLine: 'underline',
    marginLeft: 7,
  },
});
