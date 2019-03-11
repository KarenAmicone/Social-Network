var mainApp = {};
const logOutButton = document.getElementById("logout");
const container= document.getElementById("container");
const create =  document.getElementById('create');
const update = document.getElementById('update');
const delate = document.getElementById('delete');
const read = document.getElementById('read');
const mantel = document.getElementById('mantel');

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

  

  function fnCreate (){
    var path = 'users/' + uid;
    var data = {
      name: 'Diana',
      age: 22,
      message: 'Hola chicas!!'      
    }
    app_fireBase.databaseApi.create(path, data, messageHandler);  
  }
  function fnRead (){
    var path = 'users/' + uid;
    app_fireBase.databaseApi.read(path, successFn, messageHandler);
    function successFn (snapShot){
      if (!!snapShot && !!snapShot.val()){
        mantel.innerHTML = `<p>${snapShot.val().name}</p>`;
        console.log(snapShot.val());
      }else{
        console.log('No data Found');
      }
    }
  }
  function fnUpdate (){
    var path = 'users/' + uid;
    var data = {
      age: 30,
      message: 'Hola de nuevo chicas!!'      
    }
    app_fireBase.databaseApi.update(path, data, messageHandler);
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
  
  logOutButton.addEventListener("click", logOut);
  create.addEventListener('click', mainApp.Create);
  update.addEventListener('click', mainApp.Update);
  delate.addEventListener('click', mainApp.Delete);
  read.addEventListener('click', mainApp.Read);

})()
