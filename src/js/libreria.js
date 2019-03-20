(function(window, document){
    
    var inicio = function(){
            var elemento = null,
            marco = null,
            rutas = {},
            controladores = {},
            ctrlActual = null,
            libreria = {
                getID: function(id){
                    elemento = document.getElementById(id);
                    return this;
                },
   
                controlador: function(nombre, ctrl){
                   controladores[nombre] = {'controlador':ctrl};
                },

                enrutar: function(){
                    marco = elemento;
                    return this;
   
                },
                ruta: function(ruta, plantilla, controlador, carga){
                    rutas[ruta] = {
                                   'plantilla': plantilla,
                                   'controlador': controlador,
                                   'carga':carga
                                   };
   
                                return this;   
                },
                manejadorRutas:function(){
                    var hash = window.location.hash.substring(1) || '/',
                       destino = rutas[hash],
                       xhr = new XMLHttpRequest();
   
                   if (destino && destino.plantilla) {
                       if (destino.controlador) {
                           ctrlActual = controladores[destino.controlador];   
                       }
                       
                      xhr.addEventListener('load',function(){
                          marco.innerHTML = this.responseText;
                          setTimeout(function(){
                              if(typeof(destino.carga)==='function'){
                              destino.carga();
                          }
                       },500);  
                      }, false) ;
                      xhr.open('get', destino.plantilla, true);
                      xhr.send(null);
                   }else{
                       window.location.hash = '#/'
                   }
                       
                }
   
            };  
            return libreria;
    }
    if (typeof window.libreria === 'undefined') {
        window.libreria = window._ = inicio ();
        window.addEventListener('load', _.manejadorRutas, false);
        window.addEventListener('hashchange', _.manejadorRutas, false)
   
    }else{
        console.log("Se llama nuevamente la librería ");
        
    }
   })(window, document);
