import {
  LOGIN_USER,
  LOGOUT_USER,
  AUTH_USER,
} from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state, logoutSuccess: action.payload };
    default:
      return state;
  }
}
