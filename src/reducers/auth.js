import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
  
    LOGOUT,
   
 
    PASSWORD_CHANGE_FAIL,
    PASSWORD_CHANGE_SUCCESS
  } from "../action/Types";
  
  const initialState = {
    access: localStorage.getItem("access"),
    refresh: localStorage.getItem("refresh"),
    isAuthenticated: null,
    user:null,
    role:0
  };
  const initialStateCourse ={
    course:null
  }
  
  export default function (state = initialState ,  action) {
    const { type, payload } = action;
  
    switch (type) {
      case AUTHENTICATED_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
        };
      case LOGIN_SUCCESS:
        console.log("From Auth payload", payload)
        localStorage.setItem("access", payload.token);
        localStorage.setItem("refresh", payload.refreshToken);
        localStorage.setItem("user", JSON.stringify(payload.user));
        return {
          ...state,
          isAuthenticated: true,
          access: payload.access,
          refresh: payload.refresh,
        };
      case SIGNUP_SUCCESS:
        return {
          ...state,
          isAuthenticated: false,
        };
      case USER_LOADED_SUCCESS:
        localStorage.setItem("rolees", payload.role);
        return {
          ...state,
          user: payload,
          role: payload.role,
        };
      case AUTHENTICATED_FAIL:
        return {
          ...state,
          isAuthenticated: false,
        };
      case USER_LOADED_FAIL:
        return {
          ...state,
          user: null,
        };
      case LOGIN_FAIL:
      case SIGNUP_FAIL:
      case LOGOUT:
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        return {
          ...state,
          access: null,
          refresh: null,
          isAuthenticated: false,
          user: null,
        };
      case PASSWORD_RESET_SUCCESS:
      case PASSWORD_RESET_FAIL:
      case PASSWORD_RESET_CONFIRM_SUCCESS:
  
      case PASSWORD_RESET_CONFIRM_FAIL:
        return {
          ...state,
        };
     
  
      case PASSWORD_CHANGE_FAIL:
        return  "ERROR IN CHANGING PASSWORD"
        
      case PASSWORD_CHANGE_SUCCESS: 
      return "CHANGED SUCCESFULLY"
  
      default:
        return state;
    }
  }
  