export const validateEmail = text => {
  console.log(text);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(text) === false) {
    return false;
  } else {
    return true;
  }
};

export const validatePassword = text => {
  var reg = /(?=.{8,})/;
  if (reg.test(text) === true) {
    return true;
  } else {
    return false;
  }
};

export const validateMobileNumber = text => {
  var reg = /^([0]|\+91)?\d{10}/;
  var test = reg.test(text);
  if (test) {
    return true;
  } else {
    return false;
  }
};
