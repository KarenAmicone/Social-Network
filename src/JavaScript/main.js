//Variables globales
var mainApp = {};
const logOutButton = document.getElementById('logout');
//const container= document.getElementById('container');
const usersName= document.getElementById('users-name');
const create =  document.getElementById('create');
const delate = document.getElementById('delete');
const read = document.getElementById('read');
const mantel = document.getElementById('mantel');
const inputProfile = document.getElementById('input-profile');
const outputProfile =document.getElementById('output-profile');
const favoriteFood =document.getElementById ('favorite-food');
const userDescription =document.getElementById ('user-description');
const birthday =document.getElementById ('birthday');
const socialNetwork =document.getElementById ('social');

//Display
inputProfile.style.display='block';
outputProfile.style.display='none';

(function () {
  //Autenticación
  var firebase = app_fireBase;
  var uid = null;
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      uid = user.uid;
      print(user);
    } else {
      uid = null;
      window.location.replace('index.html');
    }
  });
  
//Imprime el nombre del usuario en el header
  const print= (user)=>{
    const userName = `<div>
    <img src="${user.photoURL}">
    <p>${user.displayName}</p>
    
    
    
    </div>`
    usersName.innerHTML=userName;
  };

  //Imprime la información del perfil
  const printProfile= (data)=>{
    inputProfile.style.display='none';
    outputProfile.style.display='block';
   const profile = `<p>${data.favoriteFoods}</p> 
   <p>${data.userDescriptions}</p>
   <p>${data.birthdays}</p>
   <p>${data.socialNetworks}</p> `;
    outputProfile.insertAdjacentHTML('beforeend',profile);
  };
  
//Cerrar sesión
  function logOut() {
    firebase.auth().signOut();
  };
  
  //Función que consolea si hay un error o no
  function messageHandler (err){
    if (!!err){
      console.log(err)
    }else{
      console.log('success')
    }
  };
 
 //Función para crear publicación 
 function fnCreate (){
    var path = 'users/' + uid;
    var data = {
      favoriteFoods:favoriteFood.value,
      userDescriptions:userDescription.value,
      birthdays:birthday.value,
      socialNetworks:socialNetwork.value,     
    };
    console.log(data);
    app_fireBase.databaseApi.create(path, data, messageHandler);  
    printProfile(data);
  };

  //Función para leer y editar lo creado
  function fnRead (){
    inputProfile.style.display='block';
    outputProfile.style.display='none';
    var path = 'users/' + uid;
    app_fireBase.databaseApi.read(path, successFn, messageHandler);
    function successFn (snapShot){
      if (!!snapShot && !!snapShot.val()){
        favoriteFood.value=snapShot.val().favoriteFoods;
        userDescription.value=snapShot.val().userDescriptions;
        birthday.value=snapShot.val().birthdays;
        socialNetwork.value=snapShot.val().socialNetworks;
        console.log(snapShot.val());
        inputProfile.removeChild(create);
        const btn= document.createElement('BUTTON');
        const t = document.createTextNode('Save');
        btn.appendChild(t);
        inputProfile.appendChild(btn);
        btn.addEventListener('click', mainApp.Update); 
      }else{
        console.log('No data Found');
      }
    }
  };

  //Función para actualizar
  function fnUpdate (){
    var path = 'users/' + uid;
    var data = {
      favoriteFoods:favoriteFood.value,
      userDescriptions:userDescription.value,
      birthdays:birthday.value,
      socialNetworks:socialNetwork.value,    
    }
    app_fireBase.databaseApi.update(path, data, messageHandler);
    outputProfile.innerHTML="";
    printProfile(data);
  };

  //Función para eliminar publicaciones
  function fnDelete (){
    var path = 'users/' + uid;      
    app_fireBase.databaseApi.delete(path, messageHandler);
  }
  
  //Invocación de funciones
  mainApp.Create = fnCreate;
  mainApp.Read = fnRead;
  mainApp.Update = fnUpdate;
  mainApp.Delete = fnDelete;
  mainApp.logOut = logOut;
  
  //Eventos del DOM
  logOutButton.addEventListener('click', logOut);
  create.addEventListener('click', mainApp.Create);
  delate.addEventListener('click', mainApp.Delete);
  read.addEventListener('click', mainApp.Read);
})()