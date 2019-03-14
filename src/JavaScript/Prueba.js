//Necesita esperar a que se carge la página, para poder lamar a inicializar
window.onload = inicializar;
let formInputs;
var refProfile;
let tabBody;
let CREATE= 'Guardar';
let UPDATE= 'Modificar';
let modo= CREATE;
let refChild;


function inicializar (){
formInputs= document.getElementById('form-inputs');
formInputs.addEventListener('submit', sendToFirebase, false);
tabBody=document.getElementById('tab-body');
//Hace una referencia al nodo raíz de la base de datos
refProfile =firebase.database().ref(path);
showInputs();
}

function showInputs(){
    refProfile.on('value').then(function(snap){
    var snapChild= snap.child('profile');    
    let dataValues=(Object.values(snapChild.val())).reverse();
    console.log(dataValues);
    let dataKeys=(Object.keys(snapChild.val())).reverse();
    console.log(dataKeys);
    let showRow = '';
    dataValues.forEach((element, index) => {
        showRow += `<tr> 
        <td>  ${element.name} </td>
        <td>  ${element.email}  </td>
        <td> <button class= "delete-post" data-info="${dataKeys[index]}">Borrar</button> </td>
        <td> <button class= "update-post" data-info="${dataKeys[index]}">Editar</button> </td>
        </tr>`;    
    });
    /* for(let key in data){
    showRow += '<tr>'+ '<td>' + data[key].name + '</td>'+
    '<td>' + data[key].email + '</td>'+
    `<td> <button class= 'delete-post' data-info='`+key+`'>Borrar</button> </td>`+
    `<td> <button class= 'update-post' data-info='`+key+`'>Editar</button> </td>`
    '</tr>';
    }  */ 
    /* tabBody.insertAdjacentHTML('afterbegin', showRow); */
    tabBody.innerHTML=showRow;
    if(showRow!=''){
    var elementsUpdated=document.getElementsByClassName('update-post');
    for(let i= 0; i<elementsUpdated.length; i++){
    elementsUpdated[i].addEventListener('click', updateInfo, false);    
    }
    var elementsDeleted=document.getElementsByClassName('delete-post');
    for(let i= 0; i<elementsDeleted.length; i++){
    elementsDeleted[i].addEventListener('click', deleteInfo, false);    
    }
    } 
    });
}

function deleteInfo(){
const keyInfo= this.getAttribute('data-info');
const refChild= refProfile.child(keyInfo);
refChild.remove();
}

function updateInfo(){
const keyInfo= this.getAttribute('data-info');
refChild= refProfile.child(keyInfo);
refChild.once('value', function(snap){
const dataInfo= snap.val();    
document.getElementById('name').value = dataInfo.name;
document.getElementById('email').value = dataInfo.email;
});
document.getElementById('save').value = UPDATE;
modo=UPDATE;
}

function sendToFirebase (event){
//Evita que se vuelva a cargar
event.preventDefault();
switch(modo){
    case CREATE: 
        refProfile.push({
        name: event.target.name.value,
        email: event.target.email.value
        });
        break;
    case UPDATE: 
        refChild.update({
        name: event.target.name.value,
        email: event.target.email.value  
        });
        modo=CREATE;
        document.getElementById('save').value = CREATE;
        break;
}
formInputs.reset();
}

