import * as types from "./types";

export function logOut() {
  return { type: types.LOGGED_OUT, payload: { loggedIn: false } };
}

export function login() {
  return { type: types.LOGIN, payload: { loggedIn: tue } };
}
