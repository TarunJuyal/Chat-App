import axios from "axios";
import { LOGIN_USER, AUTH_USER, LOGOUT_USER } from "./types";

export async function loginUser(dataToSubmit) {
  const request = await axios
    .post(`/api/users/login`, dataToSubmit)
    .then((response) => response.data);
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export async function auth() {
  const request = await axios
    .get(`/api/users/auth`)
    .then((response) => response.data);
  return {
    type: AUTH_USER,
    payload: request,
  };
}

export async function logoutUser() {
  const request = await axios
    .get(`/api/users/logout`)
    .then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}
