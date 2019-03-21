(function (window, document) {
        libreria.getID('vista').enrutar()
                .ruta('/', './vistas/login.html', 'controlador', window.manejador.login)
                //Este es el muro
                .ruta('/muro', './vistas/muro.html', 'controlador', window.manejador.logOut)
                //Este es el perfil
                .ruta('/crear-contacto', './vistas/crear.html', 'firebase', function () {
                        _.getID('crearContacto').noSubmit();
                })


})(window, document);

