// Initialize Firebase
var app_fireBase = {};

  (function (){
    var config = {
        apiKey: "AIzaSyDtx_GXUXDalpCmPGu0-jiGCX36HhWC-pE",
        authDomain: "picfood-a0a5a.firebaseapp.com",
        databaseURL: "https://picfood-a0a5a.firebaseio.com",
        projectId: "picfood-a0a5a",
        storageBucket: "picfood-a0a5a.appspot.com",
        messagingSenderId: "735993043164"
      };
      firebase.initializeApp(config);
      app_fireBase = firebase;
      
      function submitToFirebase (path, body, callback){
        if(!path || !body) return;
        app_fireBase.database().ref(path).set(body, callback);
      }
      
      function fnRead (path, successFunction, errorFunction){
        if(!path || !successFunction || !errorFunction) return;
        app_fireBase.database().ref(path).once('value').then(successFunction, errorFunction);
      }
  
      function fnUpdate (path, body, callback){
        if(!path || !body) return;
        app_fireBase.database().ref(path).update(body, callback);
      }

      function fnDelete (path, callback){
        if(!path) return;
        app_fireBase.database().ref(path).remove(callback);
      }
      

      app_fireBase.databaseApi = {
        create: submitToFirebase,
        read: fnRead,
        update: fnUpdate,
        delete: fnDelete
      }

})()
