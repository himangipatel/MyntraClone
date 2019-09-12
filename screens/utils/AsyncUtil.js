import AsyncStorage from '@react-native-community/async-storage';

export const storeUserInfor = async userInfo => {
    console.log(userInfo);
    saveAysncData('@userInfo', JSON.stringify(userInfo));
    saveAysncData('@isLogin', JSON.stringify(true));
  };
  
  export const saveAysncData = async (key, value) => {
    await AsyncStorage.setItem(key, value);
  };
  
  export const getAsyncData = async key => {
    return await AsyncStorage.getItem(key);
  };
  