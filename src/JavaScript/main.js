var mainApp = {};
const logOutButton = document.getElementById("logout");
const container= document.getElementById("container");
const create =  document.getElementById('create');
const update = document.getElementById('update');
const delate = document.getElementById('delete');
const read = document.getElementById('read');
const mantel = document.getElementById('mantel');
const inputProfile = document.getElementById('input-profile');
const outputProfile =document.getElementById('output-profile');


(function () {
  var firebase = app_fireBase;
  var uid = null;
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      uid = user.uid;
      print(user);
    } else {
      uid = null;
      window.location.replace("index.html");
    }
  });
  
  const print= (user)=>{
    const userName = `<p>${user.displayName}</p>`;
    container.insertAdjacentHTML("beforeend", userName);
  }
  const printProfile= (data)=>{
   const profile = `<p>${data.favoriteFoods}</p> 
   <p>${data.userDescriptions}</p>
   <p>${data.birthdays}</p>
   <p>${data.socialNetworks}</p> `;
    outputProfile.insertAdjacentHTML("beforeend",profile);
 
  }
  

  function logOut() {
    firebase.auth().signOut();
  }
  
  function messageHandler (err){
    if (!!err){
      console.log(err)
    }else{
      console.log("success")
    }
  }
  const favoriteFood =document.getElementById ("favorite-food")
  const userDescription =document.getElementById ("user-description")
  const birthday =document.getElementById ("birthday")
  const socialNetwork =document.getElementById ("social")
  

 function fnCreate (){
    var path = 'users/' + uid;
    var data = {
      favoriteFoods:favoriteFood.value,
      userDescriptions:userDescription.value,
      birthdays:birthday.value,
      socialNetworks:socialNetwork.value,
      message: 'Hola chicas!!'      
    }
    console.log(data);
    app_fireBase.databaseApi.create(path, data, messageHandler);
    
    printProfile(data);
    inputProfile.style.display="none";
    outputProfile.style.display="block";
   
  }
  function fnRead (){
    var path = 'users/' + uid;
    app_fireBase.databaseApi.read(path, successFn, messageHandler);
    function successFn (snapShot){
      if (!!snapShot && !!snapShot.val()){
        favoriteFood.value=snapShot.val().favoriteFoods
        userDescription.value=snapShot.val().userDescriptions;
        birthday.value=snapShot.val().birthdays;
        socialNetwork.value=snapShot.val().socialNetworks; 
        
        console.log(snapShot.val());
      }else{
        console.log('No data Found');
      }
    }
  }
  function fnUpdate (){
    var path = 'users/' + uid;
    var data = {
      favoriteFoods:favoriteFood.value,
      userDescriptions:userDescription.value,
      birthdays:birthday.value,
      socialNetworks:socialNetwork.value,
      message: 'adios chicas!!'     
    }
    app_fireBase.databaseApi.update(path, data, messageHandler);
    printProfile(data);
  }
  function fnDelete (){
    var path = 'users/' + uid;      
    app_fireBase.databaseApi.delete(path, messageHandler);
  }
  
  
  mainApp.Create = fnCreate;
  mainApp.Read = fnRead;
  mainApp.Update = fnUpdate;
  mainApp.Delete = fnDelete;
  mainApp.logOut = logOut;
  
  logOutButton.addEventListener('click', logOut);
  create.addEventListener('click', mainApp.Create );
  update.addEventListener('click', mainApp.Update);
  delate.addEventListener('click', mainApp.Delete);
  read.addEventListener('click', mainApp.Read);

})()
