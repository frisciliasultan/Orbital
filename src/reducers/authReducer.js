import {
    SET_CURRENT_USER,
    USER_LOADING,
    USER_REGISTERED
  } from "../actions/types";

  const isEmpty = require("is-empty");

  const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    firstTimeRegistered: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload,
          firstTimeRegistered: action.firstTimeRegistered,
          socialLogin: action.socialLogin
        };
      case USER_REGISTERED:
        return {
          ...state,
          firstTimeRegistered: true
        }
      case USER_LOADING:
        return {
          ...state,
          loading: action.payload
        };
      default:
        return state;
    }
  }