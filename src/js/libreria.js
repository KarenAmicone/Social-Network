((window, document) => {
  'use strict';
  let initialize = function () {
    let element = null,
      frame = null,
      paths = {},
      drivers = {},
      driver,
      libraryMe = {
        
        getID: function (id) {
          element = document.getElementById(id);
          //Retorna la librería como tal
          return this;
        },
        
        //Previene que los formularios se envíen
        noSubmit: function () {
          element.addEventListener('submit', function(e){
            e.preventDefault();
          }, false);
          return this;
        },
        
        enrutar: function () {
          frame = element;
          return this;
        },

        path: function (route, template, controler, load) {
          //Va a mandar a las rutas de cada html
          paths[route] = {
            'template': template,
            'controler': controler,
            'load': load
          };
          return this;
        },

        routeManager: function () {
          let hash = window.location.hash.substring(1) || '/',
            destiny = paths[hash],
            xhr = new XMLHttpRequest();
          if (destiny && destiny.template) {
            xhr.addEventListener('load', () => {
              frame.innerHTML = this.responseText;
            }, false);
            xhr.open('get', destiny.template, true);
            xhr.send(null);
          } else {
            window.location.hash = '#/';
          }
        }
      };
    return libraryMe;
  }
  if (typeof window.libraryMe === 'undefined') {
    window.libraryMe = window._ = initialize();
    window.addEventListener('load', _.routeManager, false);
    window.addEventListener('hashchange', _.routeManager, false);
  } else {
    console.log('Se está llamando la librería de nuevo');
  }
})(window, document);
