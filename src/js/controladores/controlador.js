
(function(){
    _.controlador('firebase', {
        auth: firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                alert('funciono');
                // User is signed in.
                uid = user.uid;
                /*  print(user);
                 showProfile(); */
            } else {
                uid = null;
            window.location.replace('./index.html');
            }
        })
    })
})();
