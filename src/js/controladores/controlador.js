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
            signInSuccessUrl: 'index.html#/perfil',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
            /* tosUrl: './index.html' */
        };
        ui.start('#firebaseui-auth-container', uiConfig);

    },

    wall: () => {
        //Variables globales
        var uid = null;
        const db = firebase.firestore();

        //DOM
        const createPost = document.getElementById('create-post');
        const contentInput = document.getElementById('content');
        const titleInput = document.getElementById('title');
        const logOutButton = document.getElementById('logout');
        const wall = document.getElementById('wall');

        //Autenticación
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                uid = user.uid;
                db.collection('posts').orderBy('createTime', "desc").onSnapshot(
                    snapshot => {
                        printPost(snapshot.docs);
                    });

                //Función para crear publicaciones
                createPost.addEventListener('submit', (e) => {
                    e.preventDefault();
                    if (titleInput.value && contentInput.value != null) {
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

        //Función que pinta en HTML
        const printPost = (data) => {
            wall.innerHTML = '';
            data.forEach(doc => {
                let docData = doc.data();
                let toPrint = `
                <article id="posting" class="post">
                <p>${docData.user}</p>
                <img class= "profile-foto" src="${docData.foto}">
                <p>Categoría: ${docData.title}</p>
                <p>${docData.content}</p>
                </article>
                `;
                wall.insertAdjacentHTML('beforeend', toPrint);
            });
        };

        //Función para cerrar sesión
        logOutButton.addEventListener('click', () => {
            firebase.auth().signOut();
        });
    },

    profile: () => {
        //Variables globales
        var uid = null;
        const db = firebase.firestore();
        let UPDATE = 'Modificar';
        let CREATE = 'Publicar';
        let modo = CREATE;
        let idPost;

        //DOM
        const createPost = document.getElementById('create-post');
        const wallProfile = document.getElementById('perfil-muro');
        const contentInput = document.getElementById('content');
        const titleInput = document.getElementById('title');
        const savebtn = document.getElementById('save');
        const profileInfo = document.getElementById('profile-info');
        const logOutButton = document.getElementById('logout');

        //Autenticación
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                uid = user.uid;

                print = () => {
                    const profile =
                    `
                    <div class="card">
                    <img id="user-foto" src="${user.photoURL}" class="card-img-top" alt="Picfood">
                    <div class="card-body">
                    <p class="card-text" id="user-name">${user.displayName}</p>
                    </div>
                    </div>
                    `;
                    profileInfo.innerHTML=profile;
                  };
                  print(user);

                db.collection('posts').orderBy('createTime', "desc").onSnapshot(
                    snapshot => {
                        wallProfile.innerHTML = '';
                        snapshot.forEach(doc => {
                            let docData = doc.data();
                            if (uid === docData.uid) {
                                let perfil =
                                    `
                <article id="posting" class="post">
                <p>${docData.user}</p>
                <img class= "profile-foto" src="${docData.foto}">
                <p>Categoría: ${docData.title}</p>
                <p id= "post-output">${docData.content}</p>
                <button onclick= "updatePost('${doc.id}', '${doc.data().content}', '${doc.data().title}')">Editar</button>
                <button onclick= "deletePost('${doc.id}')" class= "delete-btn">Borrar</button>
                </article>
                `;
                                wallProfile.insertAdjacentHTML('beforeend', perfil);
                            }
                        })
                    });

                //Función que elimina publicaciones
                deletePost = (id) => {
                    let option = confirm("¿Estás segura(o) que deseas borrar esta publicación?");
                    if (option == true) {
                        db.collection('posts').doc(id).delete().then(() => {
                            console.log('Deleting');
                        }).catch((error) => {
                            console.error('Error removing document: ', error);
                        });
                    } else {
                        console.log("Canceled");
                    }
                };


                //Función que edita publicaciones 
                updatePost = (id, content, title) => {
                    idPost = id;
                    contentInput.value = content;
                    titleInput.value = title;
                    savebtn.value = UPDATE;
                    modo = UPDATE;
                };

                //Función que envía lo agregado y actualizado a firebase
                createPost.addEventListener('submit', sendtoFirebase, false);

                function sendtoFirebase(e) {
                    e.preventDefault();
                    switch (modo) {
                        case CREATE:
                            if (titleInput.value && contentInput.value != null) {
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
                            modo = CREATE;
                            savebtn.value = CREATE;
                            break;
                    }
                    createPost.reset();
                }

                logOutButton.addEventListener('click', () => {
                    firebase.auth().signOut();
                });

            } else {
                uid = null;
                window.location.replace('./index.html');
            }
        })
    }
}