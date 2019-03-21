window.manejador = {
    firebase: firebase.initializeApp(config),

    login: () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) { 
            };
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
        const db = firebase.firestore();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                uid = user.uid;
                db.collection('posts').onSnapshot(snapshot => {
                    wall.innerHTML='';
                    printPost(snapshot.docs);
                });
                creatingPost(user);
            } else {
                uid = null;
                window.location.replace('./index.html');
            }
        })
        const logOutButton = document.getElementById('logout');
        logOutButton.addEventListener('click', () => {
            firebase.auth().signOut();
        });
        const wall = document.getElementById('wall');
        const createPost = document.getElementById('create-post');
        
        const printPost = (data) => {
            data.forEach(doc => {
                let post = doc.data();
                let toPrint = `
                <article class="post">
                <p>User: ${post.user}</p>
                <img src="${post.foto}">
                <p>Categoría: ${post.title}</p>
                <p>Post: ${post.content}</p>
                </article>
                `;
                wall.insertAdjacentHTML('beforeend', toPrint);
            });
        }
        
        const creatingPost = (user) => {
            createPost.addEventListener('submit', (e) => {
                e.preventDefault();
                db.collection('posts').add({
                    foto: user.photoURL,
                    user: user.displayName,
                    content: createPost['content'].value,
                    title: createPost['title'].value
                }).then(() => {
                    createPost.reset();
                }).catch(err => {
                    console.log(err.message);
                });
            })
        }
    }
}

