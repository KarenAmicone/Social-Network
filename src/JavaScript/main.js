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
const pic = document.getElementById('pic');

//var data= app_fireBase.database().ref('users/').push()

//Display
inputProfile.style.display='none';
outputProfile.style.display='block';

var uid = null;
(function () {
  //Autenticación
  var firebase = app_fireBase;
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
    const userName = `<p>${user.displayName}</p>
    <p>${user.email}</p>`;
    usersName.innerHTML=userName;
    pic.innerHTML = `<img src="${user.photoURL}">`
  };
    
    
})();


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
  console.log(path);
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


//Función para actualizar
function fnUpdate (){
  inputProfile.style.display='block';
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
  const btnEdit= document.createElement('BUTTON');
  const t = document.createTextNode('Editar');
  btnEdit.appendChild(t);
  outputProfile.appendChild(btnEdit);
  btnEdit.addEventListener('click', mainApp.Read);

};

//Función para eliminar publicaciones
function fnDelete (){
  var path = 'users/' + uid;      
  app_fireBase.databaseApi.delete(path, messageHandler);
}

//Imprime la información del perfil
const printProfile= (data)=>{
  const profile = `<p>${data.favoriteFoods}</p> 
  <p>${data.userDescriptions}</p>
  <p>${data.birthdays}</p>
  <p>${data.socialNetworks}</p> `;
   outputProfile.insertAdjacentHTML('beforeend',profile);
 };

//Función para leer y editar lo creado
function fnRead (){
 var path = 'users/' + uid;
 app_fireBase.databaseApi.read(path, successFn, messageHandler);
 function successFn (snapShot){
   if (!!snapShot && !!snapShot.val()){
     let data={
     favoriteFoods:snapShot.val().favoriteFoods,
     userDescriptions:snapShot.val().userDescriptions,
     birthdays:snapShot.val().birthdays,
     socialNetworks: snapShot.val().socialNetworks
   }
     printProfile(data);
     /* inputProfile.removeChild(create);
     const btn= document.createElement('BUTTON');
     const t = document.createTextNode('Guardar');
     btn.appendChild(t);
     inputProfile.appendChild(btn);
     btn.addEventListener('click', mainApp.Update); */ 
   }else{
     console.log('No data Found');
   }
 }
};

//Invocación de funciones
mainApp.Create = fnCreate;
mainApp.Update = fnUpdate;
mainApp.Delete = fnDelete;
mainApp.logOut = logOut;

logOutButton.addEventListener('click', logOut);
create.addEventListener('click', fnUpdate );
//update.addEventListener('click', mainApp.Update);
delate.addEventListener('click', mainApp.Delete);
read.addEventListener('click', fnRead);