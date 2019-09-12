/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StatusBar,
  ToastAndroid,
  TouchableOpacity,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import {TextField} from 'react-native-material-textfield';
import Axios from 'axios';
import {signOut, googleSignIn} from '../utils/AppUtils';
import {API} from '../utils/APIUtils';
import {storeUserInfor} from '../utils/AsyncUtil';
import {
  validateEmail,
  validateMobileNumber,
  validatePassword,
} from '../utils/Validator';

export default class SignUp extends React.Component {
  static navigationOptions = {
    headerLeft: <View />,
    headerTitle: 'SIGN-UP',
    headerRight: <View></View>,
    headerTitleStyle: {
      color: '#54c79f',
      fontFamily: 'junegull',
      fontWeight: '500',
      justifyContent: 'space-between',
      textAlign: 'center',
      fontSize: 20,
    },
    // headerStyle:{
    //     backgroundColor:'red',
    //     }
  };

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
      isLogin: false,
    };
  }

  async validateFields(email, password, mobile, name) {
    
    if (validateEmail(email)) {
      this.setState({email: email, emailError: ''});
      console.log('Email is Correct');
    } else if (!validateEmail(password)) {
      console.log('Email is Not Correct');
      this.setState({emailError: 'Email is not Valid', email: email});
      return;
    }

    if (validatePassword(password)) {
      this.setState({passErr: '', password: password});
    } else if (!validatePassword(password)) {
      this.setState({passErr: 'Password is not valid', password: password});
      return;
    }

    if (validateMobileNumber(mobile)) {
      this.setState({mobileErr: '', mobile: mobile});
    } else if (!validateMobileNumber(mobile)) {
      this.setState({mobileErr: 'Mobile number is not valid', mobile: mobile});
      return;
    }

    if (name === '') {
      this.setState({nameErr: 'Name is Empty'});
    } else {
      this.callRegisterAPI(email, password, name);
    }
  }

  callRegisterAPI = async (email, password, name) => {
    this.loadingButton.showLoading(true);
    let response = await this.registerWithEmailPass(name, email, password); // with asysc function
    this.loadingButton.showLoading(false);
    if (response.isSuccess) {
      storeUserInfor(response);
      this.props.navigation.replace('Dashboard');
    } else {
      ToastAndroid.show(response.message, ToastAndroid.SHORT);
    }
  };

  registerWithEmailPass = async (name, email, password) => {
    try {
      console.log('api call');
      const response = await Axios.post(API.Registration, {
        name: name,
        email: email,
        deviceType: 'android',
        password: password,
        loginType: 'email-password',
      });
      return response.data;
    } catch (err) {
      this.loadingButton.showLoading(false);
      console.log(err);
    }
  };

  registerWithGoogle = async body => {
    try {
      console.log(body);
      const response = await Axios.post(API.Registration, body);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  googleSignin = async () => {
    try {
      const userInfo = await googleSignIn();

      var userJson = userInfo.user;
      userJson.googleID = userInfo.user.id;
      userJson.loginType = 'google-signin';
      userJson.deviceType = 'android';

      let response = await this.registerWithGoogle(userJson);
      if (response.isSuccess) {
        storeUserInfor(response);
        this.props.navigation.replace('Dashboard');
      } else {
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
        signOut();
      }
    } catch (error) {
      signOut();
      console.log(error);
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TextField
            style={styles.textInput}
            label="Email address*"
            onChangeText={email =>
              this.validateFields(
                email,
                this.state.password,
                this.state.mobile,
                this.state.name,
              )
            }
            error={this.state.emailError}
          />

          <TextField
            style={styles.textInput}
            label="Password*"
            error={this.state.passErr}
            onChangeText={password =>
              this.validateFields(
                this.state.email,
                password,
                this.state.mobile,
                this.state.name,
              )
            }
          />

          <TextField
            style={styles.textInput}
            label="Mobile number*"
            error={this.state.mobileErr}
            onChangeText={mobile =>
              this.validateFields(
                this.state.email,
                this.state.password,
                mobile,
                this.state.name,
              )
            }
          />

          <TextField
            style={styles.textInput}
            label="Full Name*"
            onChangeText={name => this.setState({name: name, nameErr: ''})}
            error={this.state.nameErr}
          />

          <View style={styles.alternativeLayoutButtonContainer}>
            <View style={[{width: '100%'}]}>
              <AnimateLoadingButton
                ref={c => (this.loadingButton = c)}
                width={350}
                height={45}
                title="CREATE ACCOUNT"
                backgroundColor="#54c79f"
                titleFontSize={16}
                titleColor="rgb(255,255,255)"
                borderRadius={4}
                onPress={() => {
                  this.validateFields(
                    this.state.email,
                    this.state.password,
                    this.state.mobile,
                    this.state.name,
                  );
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                alert('facebook');
              }}>
              <Image
                style={{width: 40, height: 40, marginTop: 15}}
                source={require('../../assets/facebook.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={this.googleSignin}>
              <Image
                style={{width: 40, height: 40, marginTop: 15, marginLeft: 30}}
                source={require('../../assets/gmail.png')}
              />
            </TouchableOpacity>
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
    alignItems: 'center',
  },
  buttonStyle: {
    borderColor: '#54c79f',
    backgroundColor: '#54c79f',
  },
});
