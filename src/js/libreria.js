((window, document) => {
  'use strict';
  let initialize = () => {
    let element = null,
      frame = null,
      paths = {},
      drivers = {},
      driver,
      libraryMe = {
          enrutar: () => {
            frame = element;
            return this;
          },

          getID: (id) => {
          element = document.getElementById(id);
          //Retorna la librería como tal
          return this;
        },

        //Previene que los formularios se envíen
        noSubmit: () => {
          element.addEventListener('submit', (e) => {
            e.preventDefault();
          }, false);
          return this;
        },


        path: (route, template, controler, load) => {
          //Va a mandar a las rutas de cada html
          paths[route] = {
            'template': template,
            'controler': controler,
            'load': load
          }
        },

        routeManager: () => {
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
    window.libraryMe = window.$ = initialize();
    window.addEventListener('load', $.routeManager, false);
    window.addEventListener('hashchange', $.routeManager, false);
  } else {
    console.log('Se está llamando la librería de nuevo');
  }
})(window, document);
