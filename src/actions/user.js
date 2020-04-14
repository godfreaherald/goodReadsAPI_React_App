import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../reduxActionTypes";
import api from "../api/user";

export const loginUser = user => {
  return { type: USER_LOGGED_IN, user };
};

const logoutUser = () => {
  return { type: USER_LOGGED_OUT };
};

export const login = credentials => dispatch => {
  console.log(credentials);
  return api.user.login(credentials).then(user => {
    if (user) {
      localStorage.eccomJwtToken = user.token;
      dispatch(loginUser(user));
    }
  });
};

export const logout = () => dispatch => {
  localStorage.removeItem("eccomJwtToken");
  dispatch(logoutUser());
};
//create user and auto.login.
export const signUp = user => dispatch => {
  console.log(user);
  return api.user.signup(user).then(userRecord => {
    if (userRecord) {
      localStorage.eccomJwtToken = userRecord.token;
      dispatch(loginUser(userRecord));
    }
  });
};

export const confirm = token => dispatch => {
  return api.user.confirm(token).then(userRecord => {
    if (userRecord) {
      localStorage.eccomJwtToken = userRecord.token;
      dispatch(loginUser(userRecord));
    }
  });
};

export const requestPasswordReset = email => () => {
  return api.user.requestPasswordReset(email);
};

export const resetPassword = data => () => {
  return api.user.resetPassword(data);
};
