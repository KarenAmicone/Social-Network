var mainApp = {};
const logOutButton = document.getElementById("logout");
const container= document.getElementById("container");

(function () {
  var firebase = app_fireBase;
  var uid = null;
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      uid = user.uid;
      print(user);
    } else {
      uid = null;
      window.location.replace("index.html");
    }
  });
  
  const print= (user)=>{
    const userName = `<p>${user.displayName}</p>`;
    container.insertAdjacentHTML("beforeend", userName);
  }

  function logOut() {
    firebase.auth().signOut();
  }
  mainApp.logOut = logOut;

  logOutButton.addEventListener("click", logOut);
})()
