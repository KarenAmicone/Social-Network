// Initialize Firebase
window.controlador = {
    firebase: firebase.initializeApp(config),

    starting: () => {
        var ref = new firebase.auth.GoogleAuthProvider();
        var ref = new firebase.auth.FacebookAuthProvider();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                /* window.location.replace("./vistas/crear.html"); */
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
            signInSuccessUrl: './index.html',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
            tosUrl: './index.html'
        };
        ui.start('#firebaseui-auth-container', uiConfig);
    },
    
    auth: ()=>{
        var uid = null;
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                uid = user.uid;
                /*  print(user);
                 showProfile(); */
            } else {
                uid = null;
                window.location.replace('inicio.html');
            }
        });

    }
}

//Autenticación