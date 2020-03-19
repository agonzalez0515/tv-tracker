const CHECK_TOKEN_URL = "/checkToken";
const LOGIN_URL = "/users/login";
const REGISTER_USER_URL = "/users/register";
const LOGOUT_URL = "/logout";

export function checkToken() {
  return new Promise((resolve, reject) => {
    fetch(CHECK_TOKEN_URL, {
      credentials: "include"
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          reject(new Error("Unauthorized"));
        }
      })
      .then(body => resolve(body))
      .catch(error => console.error("Error:", error));
  });
}

export function registerUser(newUser) {
  return new Promise((resolve, reject) => {
    fetch(REGISTER_USER_URL, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => parseJSON(response))
      .then(response => {
        if (response.ok) {
          return resolve(response.json);
        }
        return reject(response.json);
      })
      .catch(e => reject(e));
  });
}

export function loginUser(userData) {
  return new Promise((resolve, reject) => {
    fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(response => parseJSON(response))
      .then(response => {
        if (response.ok) {
          return resolve(response.json);
        }
        return reject(response.json);
      })
      .catch(e => reject(e));
  });
}

export function logoutUser() {
  return new Promise((resolve, reject) => {
    fetch(LOGOUT_URL, {
      credentials: "include"
    })
      .then(response => parseJSON(response))
      .then(response => {
        if (response.ok) {
          return resolve(response.json);
        }
        return reject(response.json);
      })
      .catch(e => reject(e));
  });
}

function parseJSON(response) {
  return new Promise(resolve =>
    response.json().then(json => {
      resolve({
        status: response.status,
        ok: response.ok,
        json
      });
    })
  );
}
