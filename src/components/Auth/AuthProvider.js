import { useState } from 'react';
import AuthContext from './AuthContext';

const loginAuth = {
  isAuthenticated: false,
  signin(username, password, callback) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "username": username,
      "password": password
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://api-stage.radish.health/api/v1/identity/weblogin", requestOptions)
      .then(response => response.text())
      .then(result => {
        let loginInfo = JSON.parse(result)
        if (loginInfo.token && loginInfo.isAccountActive) {
          loginAuth.isAuthenticated = true;
          console.log(JSON.parse(result))
          callback(loginInfo.firstName)
        }
      })
      .catch(error => console.log('Login failed:', error));
  },
  signout(callback) {
    loginAuth.isAuthenticated = false;
    setTimeout(callback, 100);
  }
}

function AuthProvider({ children }) {
  let [user, setUser] = useState(null);

  let signin = (username, password, callback) => {
    return loginAuth.signin(username, password, (userName) => {
      setUser(userName);
      callback();
    })
  }

  let signout = (callback) => {
    return loginAuth.signout(() => {
      setUser(null);
      callback();
    })
  }

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider;
