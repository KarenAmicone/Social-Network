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
        const db = firebase.firestore();
        const createPost = document.getElementById('create-post');
        const contentInput = document.getElementById('content');
        const titleInput = document.getElementById('title');
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                uid = user.uid;
                db.collection('posts').orderBy('createTime', "desc").onSnapshot(
                    snapshot => {
                        printPost(snapshot.docs);
                    });

            createPost.addEventListener('submit', (e) => {
                e.preventDefault();
                if(titleInput.value && contentInput.value != null){
                    db.collection('posts').add({
                        uid: user.uid,
                        foto: user.photoURL,
                        user: user.displayName,
                        content: createPost['content'].value,
                        title: createPost['title'].value,
                        createTime: firebase.firestore.Timestamp.fromDate(new Date())
                    }).then(() => {
                        createPost.reset();
                    })
                    .catch(err => {
                        console.log(err.message);
                    }); 
                    } else {
                        alert('Para publicar necesitas escribir algo y elegir una categoría. Gracias :D')
                    }
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
            wall.innerHTML = '';
            data.forEach(doc => {
                let docData= doc.data();
                console.log(docData.createTime)
                let toPrint = `
                <article id="posting" class="post">
                <p>User: ${docData.user}</p>
                <img class= "profile-foto" src="${docData.foto}">
                <p>Categoría: ${docData.title}</p>
                <p>Post: ${docData.content}</p>
                </article>
                `;
                console.log(toPrint)
                wall.insertAdjacentHTML('beforeend', toPrint);
            });
        }
    },

    perfil: () => {
        var uid = null;
        const db = firebase.firestore();
        const createPost = document.getElementById('create-post');
        const wallProfile = document.getElementById('perfil-muro');
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                uid = user.uid;
                db.collection('posts').orderBy('createTime', "desc").onSnapshot(
                    snapshot => {
                        wallProfile.innerHTML = '';
                        snapshot.forEach(doc => {
                            console.log(doc)
                            let docData = doc.data();
                            if (uid === docData.uid) {
                                let perfil =
                                    `
                <article id="posting" class="post">
                <p>User: ${docData.user}</p>
                <img class= "profile-foto" src="${docData.foto}">
                <p>Categoría: ${docData.title}</p>
                <p id= "post-output">Post: ${docData.content}</p>
                <button onclick= "updatePost('${doc.id}', '${doc.data().content}', '${doc.data().title}')">Editar</button>
                <button onclick= "deletePost('${doc.id}')" class= "delete-btn">Borrar</button>
                </article>
                `;
                                wallProfile.insertAdjacentHTML('beforeend', perfil);
                            }
                        })
                    });
                
                deletePost = (id) => {
                    let option = confirm("¿Estás segura(o) de borrar este post?");
                    if(option == true){
                        db.collection('posts').doc(id).delete().then (()=>{
                            console.log('Este elemento está siendo eliminado');
                        }).catch((error)=>{
                            console.error('Error removing document: ', error);
                        });
                    } else {
                        console.log("Cancelado");
                    }  
                };
                const contentInput = document.getElementById('content');
                const titleInput = document.getElementById('title');
                const savebtn = document.getElementById('save');
                let UPDATE = 'Modificar';
                let CREATE = 'Publicar';
                let modo = CREATE;
                let idPost;

                createPost.addEventListener('submit', sendtoFirebase, false);
                
                updatePost = (id, content, title) =>{
                    idPost = id;
                    contentInput.value=content;
                    titleInput.value = title;
                    savebtn.value = UPDATE;
                    modo = UPDATE;
                };

                function sendtoFirebase (e) {
                    e.preventDefault();
                    switch(modo){
                        case CREATE:
                        if(titleInput.value && contentInput.value != null){
                        db.collection('posts').add({
                            uid: user.uid,
                            foto: user.photoURL,
                            user: user.displayName,
                            content: createPost['content'].value,
                            title: createPost['title'].value,
                            createTime: firebase.firestore.Timestamp.fromDate(new Date())
                        }).then(() => {
                            createPost.reset();
                        })
                        .catch(err => {
                            console.log(err.message);
                        }); 
                        } else {
                            alert('Para publicar necesitas escribir algo y elegir una categoría. Gracias :D')
                        }
                        break;
                        case UPDATE:
                        db.collection('posts').doc(idPost).update({
                        content: e.target.content.value,
                            title: e.target.title.value
                        });
                        modo=CREATE;
                        savebtn.value=CREATE;
                        break;
                    }
                    createPost.reset();
                }

            } else {
                uid = null;
                window.location.replace('./index.html');
            }
        })
    }
}