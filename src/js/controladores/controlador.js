window.manejador = {
    firebase: firebase.initializeApp(config),

    login: () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {};
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
            signInSuccessUrl: 'index.html#/muro',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
            /* tosUrl: './index.html' */
        };
        ui.start('#firebaseui-auth-container', uiConfig);

    },

    logOut: () => {
        var uid = null;
        let snapshotArray = [];
        const db = firebase.firestore();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                uid = user.uid;
                db.collection('posts').onSnapshot(
                    snapshot => { 
                        let snapshotT = snapshot;
                        printPost(snapshotT.docs);
                        console.log(snapshot.docs);

                    });
                } else {
                    uid = null;
                    window.location.replace('./index.html');
                }
            });
    
            
        const logOutButton = document.getElementById('logout');
        logOutButton.addEventListener('click', () => {
            firebase.auth().signOut();
        });
            
        const wall = document.getElementById('wall');

        const printPost = (data) => {
            snapshotArray=[];
            for (let i = 0; i < data.length; i++) {
                snapshotDocument = data[i]._document.proto;
                snapshotArray.push(snapshotDocument);
            }
            snapshotArray.sort((a, b) => {
                if (a.createTime < b.createTime) {
                    return -1;
                }
            }).reverse();
            wall.innerHTML='';
            snapshotArray.forEach(doc => {
                let toPrint = `
                <article class="post">
                <p>Fecha: ${doc.createTime}</p>
                <p>User: ${doc.fields.user.stringValue}</p>
                <img class= "profile-foto" src="${doc.fields.foto.stringValue}">
                <p>Categoría: ${doc.fields.title.stringValue}</p>
                <p>Post: ${doc.fields.content.stringValue}</p>
                </article>
                `;
                wall.insertAdjacentHTML('beforeend', toPrint);
            });
        }
    },
    
    perfil: ()=>{
        const db = firebase.firestore();
        const createPost = document.getElementById('create-post');
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                uid = user.uid;
                    createPost.addEventListener('submit', (e) => {
                        e.preventDefault();
                        db.collection('posts').add({
                            id: createPost['idCreated'].value,
                            foto: user.photoURL,
                            user: user.displayName,
                            content: createPost['content'].value,
                            title: createPost['title'].value
                        }).then(() => {
                            createPost.reset();
                        })
                        .catch(err => {
                            console.log(err.message);
                        });
                    })
                
                } else {
                    uid = null;
                    window.location.replace('./index.html');
                }
            })
    }
}  