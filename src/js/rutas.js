(function (window, document) {
        libreria.getID('vista').enrutar()
                .ruta('/', './index.html', null, null)
                //Este es el muro
                .ruta('/', './vistas/inicio.html', null, null)
                //Este es el perfil
                .ruta('/crear-contacto', './vistas/crear.html', 'firebase', function () {
                        _.getID('crearContacto').noSubmit();
                })


})(window, document);

