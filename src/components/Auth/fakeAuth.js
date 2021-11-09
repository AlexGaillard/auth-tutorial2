// This is where the authentication is processed

const loginAuthProvider = {
  isAuthenticated: false,
  signin(callback) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "username": "alex@radish.health",
      "password": "PUiE!8YfFX3yGrB"
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
          loginAuthProvider.isAuthenticated = true;
          console.log(JSON.parse(result))
          callback(loginInfo.firstName)
        }
      })
      .catch(error => console.log('error', error));
  },
  signout(callback) {
    loginAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  }
}


export { loginAuthProvider };