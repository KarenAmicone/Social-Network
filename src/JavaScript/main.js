//Variables globales
var mainApp = {};
const logOutButton = document.getElementById('logout');
//const container= document.getElementById('container');
const usersName = document.getElementById('users-name');
const create = document.getElementById('create');
const delate = document.getElementById('delete');
const read = document.getElementById('read');
const mantel = document.getElementById('mantel');
const inputProfile = document.getElementById('input-profile');
const outputProfile = document.getElementById('output-profile');
const favoriteFood = document.getElementById('favorite-food');
const userDescription = document.getElementById('user-description');
const birthday = document.getElementById('birthday');
const socialNetwork = document.getElementById('social');
const pic = document.getElementById('pic');

//var data= app_fireBase.database().ref('users/').push()

//Display
inputProfile.style.display = 'none';
outputProfile.style.display = 'block';

(function () {
  //Autenticación
  var uid = null;
  var firebase = app_fireBase;
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      uid = user.uid;
      print(user);
      showProfile();
    } else {
      uid = null;
      window.location.replace('index.html');
    }
  });

  //Imprime el nombre del usuario en el header
  const print = (user) => {
    const userName = `<p>${user.displayName}</p>`;
    usersName.innerHTML = userName;
    pic.innerHTML = `<img src="${user.photoURL}">`
  };

  const showProfile = () =>{ 
    var path = 'users/' + uid;
    app_fireBase.databaseApi.read(path, successFn, messageHandler);
    function successFn(snapShot) {
      if (!!snapShot && !!snapShot.val()) {
        printProfile(snapShot.val());
      } else {
        console.log('No data Found');
      }
    }
  };

  //Función para leer y editar lo creado
  function fnRead() {  
  outputProfile.style.display = 'none';
  inputProfile.style.display = 'block';
    var path = 'users/' + uid;
    app_fireBase.databaseApi.read(path, successFn, messageHandler);
    function successFn(snapShot) {
      if (!!snapShot && !!snapShot.val()) {
        favoriteFood.value=snapShot.val().favoriteFoods;
        userDescription.value=snapShot.val().userDescriptions;
        birthday.value=snapShot.val().birthdays;
        socialNetwork.value=snapShot.val().socialNetworks;
        const btnEdit = document.createElement('BUTTON');
        const t = document.createTextNode('Guardar');
        btnEdit.appendChild(t);
        inputProfile.appendChild(btnEdit);
        btnEdit.addEventListener('click', mainApp.Update);
      } else {
        const btnEdit = document.createElement('BUTTON');
        const t = document.createTextNode('Guardar');
        btnEdit.appendChild(t);
        inputProfile.appendChild(btnEdit);
        btnEdit.addEventListener('click', mainApp.Update);
      }
    }
  };

  //Función para actualizar
  function fnUpdate() {
    var path = 'users/' + uid;
    var data = {
      favoriteFoods: favoriteFood.value,
      userDescriptions: userDescription.value,
      birthdays: birthday.value,
      socialNetworks: socialNetwork.value,
    }
    app_fireBase.databaseApi.update(path, data, messageHandler);
    inputProfile.style.display = 'none';
    outputProfile.style.display = 'block';
    outputProfile.innerHTML = "";
    showProfile();
  };

 
  //Imprime la información del perfil
  const printProfile = (data) => {
    const profile = `<p>Comida favorita: ${data.favoriteFoods}</p> 
    <p>Acerca de mí: ${data.userDescriptions}</p>
    <p>Nacimiento: ${data.birthdays}</p>
    <p>Redes sociales: ${data.socialNetworks}</p> `;
    outputProfile.insertAdjacentHTML('beforeend', profile);
  };
  
  //Función para eliminar publicaciones
  function fnDelete() {
    var path = 'users/' + uid;
    var data = {
      favoriteFoods: favoriteFood.value,
      userDescriptions: userDescription.value,
      birthdays: birthday.value,
      socialNetworks: socialNetwork.value,
    }
    printProfile(data);
    app_fireBase.databaseApi.delete(path, messageHandler);
  };

  //Invocación de funciones
  mainApp.Read = fnRead;
  mainApp.Update = fnUpdate;
  mainApp.Delete = fnDelete;
  mainApp.logOut = logOut;
  mainApp.printProfile= printProfile;
  mainApp.showProfile= showProfile;

})();


//Cerrar sesión
function logOut() {
  firebase.auth().signOut();
};


//Función que consolea si hay un error o no
function messageHandler(err) {
  if (!!err) {
    console.log(err)
  } else {
    console.log('success')
  }
};


logOutButton.addEventListener('click', logOut);
create.addEventListener('click', mainApp.Read);
//update.addEventListener('click', mainApp.Update);
delate.addEventListener('click', mainApp.Delete);
