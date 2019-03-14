(function(window, document){
    'use strict';

    var main = function (params) {
        
        var element = null,
            frame = null, //Aquí se va a ir recargando la vista
            tack =  {},
            controllers = {},
            currentDriver,

            library = {
            
            getID: function (id) {
                element = document.getElementById(id);
                return this;
            },

            //Esta función va a ayudar para los formularios, ya que previene que los
            //formularios se esten enviando
            noSubmit: function () {
                element.addEventListener ('submit', function(e){
                    //El preventDefault es para que no se envie el formulario
                    e.preventDefault();
                }, false);
                return this;
            },

            //Permite asignar al marco el elemento que ha sido seleccionado
            redirect: function () {
                frame = element;
                return this;
            },

            //Almacena lo que va a contener la ruta que se va a enviar
            //root - es donde se guarda la ruta enviada
            //template - es donde se imprime
            //driver - es el controlador
            //fLoad - es la función de cargar
            road: function (root, template, driver, fLoad) {
                tack[root] = {
                    'template': template,
                    'driver': driver,
                    'load': fLoad,
                };
                return this;
            },

            //Escucha cada vez que cambia la url de una ruta 
            routerManager: function () {
                var hash = window.location.hash.substring(1) || '/',
                    getTack = tack[hash],
                    xhr = new XMLHttpRequest();

                    if(getTack && getTack.template){
                        xhr.addEventListener('load', function(){
                            frame.innerHTML = this.responseText;
                        }, false);

                        xhr.open('get', getTack.template, true);
                        xhr.send(null)
                    }else{
                        window.location.hash = '#/';
                    }
                
            }

        };
        return library; 
    }

    if(typeof window.library === 'undefined'){
        window.library = main(); 
        window.addEventListener('load', library.routerManager, false);
        window.addEventListener('hashchange', library.routerManager, false);
    }else{
        console.log('Se esta llamando la libreria nuevamente');
    }
})(window, document)