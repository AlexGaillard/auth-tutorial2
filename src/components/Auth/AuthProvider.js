import { useState } from 'react';
import { loginAuthProvider } from './fakeAuth';
import AuthContext from './AuthContext';

function AuthProvider({ children }) {
  let [user, setUser] = useState(null);

  let signin = (newUser, callback) => {
    return loginAuthProvider.signin((userName) => {
      setUser(userName);
      callback();
    })
  }

  let signout = (callback) => {
    return loginAuthProvider.signout(() => {
      setUser(null);
      callback();
    })
  }

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider;
