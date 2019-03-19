// Initialize Firebase

var ref = new firebase.auth.GoogleAuthProvider();
var ref = new firebase.auth.FacebookAuthProvider();
var uid = null;
const logOutButton = document.getElementById('logout');

(function(){
    var config = {
        apiKey: "AIzaSyDtx_GXUXDalpCmPGu0-jiGCX36HhWC-pE",
        authDomain: "picfood-a0a5a.firebaseapp.com",
        databaseURL: "https://picfood-a0a5a.firebaseio.com",
        projectId: "picfood-a0a5a",
        storageBucket: "picfood-a0a5a.appspot.com",
        messagingSenderId: "735993043164"
        };
    firebase.initializeApp(config);
    
    firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                if(location.href.match(/index.html$/gm)){
                    location.replace('./login.html')
                } 
            }
        });
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    return true;
                },
                uiShown: function () {
                    document.getElementById('loader').style.display = 'none';
                }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: './login.html',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
            tosUrl: './login.html'
        };
        ui.start('#firebaseui-auth-container', uiConfig);
        
        function signOut (){
        firebase.auth().signOut();
        };

        logOutButton.addEventListener('click', signOut);
    
})();